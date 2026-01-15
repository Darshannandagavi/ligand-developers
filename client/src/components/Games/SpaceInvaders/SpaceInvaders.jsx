import React, { useEffect, useRef, useState } from "react";
import "./SpaceInvaders.css";

// --- IMAGE CONFIGURATION ---
// Replace these with your actual filenames or URLs
const ENEMY_IMAGES = [
  "./gamesimages/enemy.avif",
  "./gamesimages/enemy1.jpg",
  "./gamesimages/enemy2.jpg",
  "./gamesimages/enemy3.jpg",
];
const PLAYER_IMAGE = "./gamesimages/player.jpg";
const BOSS_IMAGE = "./gamesimages/enemy.avif";
const BG_IMAGE = "./gamesimages/background.jpg";
const PLAYER_Y_OFFSET = 140; // distance from bottom

const rand = (min, max) => Math.random() * (max - min) + min;

export default function SpaceInvaders() {
  const canvasRef = useRef(null);
  const raf = useRef(null);
  const keys = useRef({});
  const sounds = useRef({});
  const assets = useRef({ images: { enemies: [] }, loaded: false });
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  const [state, setState] = useState("menu"); // menu | difficulty | play | gameover
  const [difficulty, setDifficulty] = useState("medium");
  const [level, setLevel] = useState(1);
  const [levelCleared, setLevelCleared] = useState(false);
  const [score, setScore] = useState(0);
  const [hp, setHp] = useState(100);
  const [dims, setDims] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });

  const player = useRef({ x: window.innerWidth / 2 });
  const bullets = useRef([]);
  const enemyBullets = useRef([]);
  const enemies = useRef([]);
  const boss = useRef(null);
  const particles = useRef([]);
  const HUD_OFFSET = 60; // space below navbar

  /* ================= ASSETS & RESIZE ================= */
  useEffect(() => {
    const handleResize = () =>
      setDims({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handleResize);

    const loadImage = (src, isEnemy = false) =>
      new Promise((res) => {
        const img = new Image();
        img.src = src;
        img.onload = () => res(img);
        img.onerror = () => {
          // Create a fallback colored square if image path is wrong
          const canvas = document.createElement("canvas");
          canvas.width = 40;
          canvas.height = 40;
          const ctx = canvas.getContext("2d");
          ctx.fillStyle = isEnemy ? "red" : "green";
          ctx.fillRect(0, 0, 40, 40);
          res(canvas);
        };
      });

    Promise.all([
      loadImage(PLAYER_IMAGE),
      loadImage(BOSS_IMAGE),
      loadImage(BG_IMAGE),
      ...ENEMY_IMAGES.map((src) => loadImage(src, true)),
    ]).then((imgs) => {
      assets.current.images = {
        player: imgs[0],
        boss: imgs[1],
        bg: imgs[2],
        enemies: imgs.slice(3),
      };
      setAssetsLoaded(true);

    });

    sounds.current = {
      shoot: new Audio("/sounds/shoot.wav"),
      hit: new Audio("/sounds/hit.mp3"),
      explode: new Audio("/sounds/explode.mp3"),
      boss: new Audio("/sounds/boss.mp3"),
    };

    // DO NOT block UI on audio
    Object.values(sounds.current).forEach((a) => {
      a.preload = "auto";
    });

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const unlockAudio = () => {
    Object.values(sounds.current).forEach((a) => {
      a.play()
        .then(() => {
          a.pause();
          a.currentTime = 0;
        })
        .catch(() => {});
    });
  };

  const drawRoundImage = (ctx, img, x, y, size) => {
    const r = size / 2;

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(img, x - r, y - r, size, size);

    ctx.restore();
  };

  const playSound = (n) => {
    if (!sounds.current[n]) return;
    sounds.current[n].currentTime = 0;
    sounds.current[n].play().catch(() => {});
  };

  /* ================= GAMEPLAY LOGIC ================= */
  const startGame = (mode) => {
    setDifficulty(mode);
    setScore(0);
    setHp(100);
    setLevel(1);
    setLevelCleared(false);
    player.current.x = dims.w / 2;
    bullets.current = [];
    enemyBullets.current = [];
    particles.current = [];
    boss.current = null;
    spawnEnemies(1, mode);
    setState("play");
  };

  const spawnEnemies = (lvl, diff) => {
    const count = diff === "hard" ? 15 + lvl * 5 : 8 + lvl * 3;
    const enemyPool = assets.current.images.enemies;

    enemies.current = Array.from({ length: count }).map(() => ({
      x: rand(50, dims.w - 50),
      y: rand(40, 250),
      dx: rand(-1, 1) * (diff === "hard" ? 1.8 : 1.2),
      dy: (0.05 + lvl * 0.01) * (diff === "hard" ? 1.3 : 1),
      img: enemyPool[Math.floor(rand(0, enemyPool.length))],
      shootCooldown:
        diff === "hard"
          ? Math.max(35, 110 - lvl * 10) // HARD → fast
          : Math.max(60, 160 - lvl * 10), // MEDIUM → moderate

      alive: true,
    }));
  };

  const spawnBoss = () => {
    const isHard = difficulty === "hard";

    boss.current = {
      x: dims.w / 2,
      y: dims.h * 0.27,

      dx: 0, // controlled by tracking
      followStrength: difficulty === "hard" ? 0.12 : 0.07,
      maxSpeed: difficulty === "hard" ? 9 : 6,

      hp: 50 + level * 30,
      maxHp: 50 + level * 30,
      shootCooldown:
        difficulty === "hard"
          ? Math.max(6, 28 - level * 4) // HARD → aggressive
          : Math.max(14, 45 - level * 5), // MEDIUM → controlled
    };

    playSound("boss");
  };

  const endGame = () => setState("gameover");

  const explode = (x, y, color) => {
    playSound("explode");
    for (let i = 0; i < 15; i++) {
      particles.current.push({
        x,
        y,
        dx: rand(-4, 4),
        dy: rand(-4, 4),
        life: 25,
        color,
      });
    }
  };

  /* ================= UPDATE LOOP ================= */
  useEffect(() => {
    const update = () => {
      if (levelCleared || state !== "play") return;

      // Player Movement
      if (keys.current["ArrowLeft"]) player.current.x -= 10;
      if (keys.current["ArrowRight"]) player.current.x += 10;
      player.current.x = Math.max(40, Math.min(dims.w - 40, player.current.x));

      // Shooting (Space)
      if (
        keys.current[" "] &&
        bullets.current.length < (difficulty === "hard" ? 3 : 6)
      ) {
        keys.current[" "] = false;
        bullets.current.push({
          x: player.current.x,
          y: dims.h - PLAYER_Y_OFFSET - 40,
        });

        playSound("shoot");
      }

      bullets.current.forEach((b) => (b.y -= 12));
      bullets.current = bullets.current.filter((b) => b.y > 0);

      // Enemies
      enemies.current.forEach((e) => {
        e.x += e.dx;
        e.y += e.dy;
        if (e.x < 40 || e.x > dims.w - 40) e.dx *= -1;
        if (--e.shootCooldown <= 0) {
          enemyBullets.current.push({ x: e.x, y: e.y });
          e.shootCooldown =
            difficulty === "hard"
              ? Math.max(35, 110 - level * 10)
              : Math.max(60, 160 - level * 10);
        }
        if (e.y > dims.h - 100) endGame();
      });

      // Boss
      if (boss.current) {
        // Horizontal movement
        // 🎯 X-axis tracking (FOLLOW PLAYER)
        // Predict where player will be shortly
        const predictedX =
          player.current.x +
          (keys.current["ArrowRight"] ? 40 : 0) -
          (keys.current["ArrowLeft"] ? 40 : 0);

        const diffX = predictedX - boss.current.x;

        // Apply acceleration toward player
        boss.current.dx += diffX * boss.current.followStrength;

        // Clamp speed
        boss.current.dx = Math.max(
          -boss.current.maxSpeed,
          Math.min(boss.current.maxSpeed, boss.current.dx)
        );
        boss.current.shootCooldown--;
        if (boss.current.shootCooldown <= 0) {
          enemyBullets.current.push({
            x: boss.current.x,
            y: boss.current.y,
          });

          boss.current.shootCooldown =
            difficulty === "hard"
              ? Math.max(6, 28 - level * 4)
              : Math.max(14, 45 - level * 5);
        }
        // Move boss
        boss.current.x += boss.current.dx;

        // Keep boss inside screen
        boss.current.x = Math.max(80, Math.min(dims.w - 80, boss.current.x));
        const hpRatio = boss.current.hp / boss.current.maxHp;
        if (hpRatio < 0.4) {
          boss.current.followStrength = 0.1;
          boss.current.maxSpeed = 8;
        }

        // 🎯 Y-axis tracking (FOLLOW PLAYER)
      }

      // Hit Detection
      bullets.current.forEach((b) => {
        enemies.current.forEach((e) => {
          if (e.alive && Math.abs(b.x - e.x) < 30 && Math.abs(b.y - e.y) < 30) {
            e.alive = false;
            b.y = -100;
            setScore((s) => s + 20);
            explode(e.x, e.y, "#ff6b6b");
          }
        });
      });

      // BULLET → BOSS COLLISION
      // BULLET → BOSS COLLISION (SAFE VERSION)
      const bossRef = boss.current;

      if (bossRef) {
        bullets.current.forEach((b) => {
          if (
            Math.abs(b.x - bossRef.x) < 80 &&
            Math.abs(b.y - bossRef.y) < 80
          ) {
            b.y = -100;
            bossRef.hp -= 2;
            playSound("hit");

            if (bossRef.hp <= 0) {
              explode(bossRef.x, bossRef.y, "#ff0000");

              boss.current = null; // ✅ SAFE now
              setLevelCleared(true);

              setTimeout(() => {
                setLevel((l) => l + 1);
                setLevelCleared(false);
                spawnEnemies(level + 1, difficulty);
              }, 2000);
            }
          }
        });
      }

      enemies.current = enemies.current.filter((e) => e.alive);
      if (enemies.current.length === 0 && !boss.current && !levelCleared)
        spawnBoss();

      enemyBullets.current.forEach((b) => {
        b.y += difficulty === "hard" ? 9 : 6;
        if (
          Math.abs(b.x - player.current.x) < 35 &&
          Math.abs(b.y - (dims.h - PLAYER_Y_OFFSET)) < 35
        ) {
          setHp((h) => {
            const next = h - (difficulty === "hard" ? 25 : 10);
            if (next <= 0) endGame();
            return next;
          });
          b.y = dims.h + 100;
        }
      });
      enemyBullets.current = enemyBullets.current.filter((b) => b.y < dims.h);

      particles.current.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        p.life--;
      });
      particles.current = particles.current.filter((p) => p.life > 0);
    };

    const draw = () => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      const imgs = assets.current.images;

      // Background
      if (imgs.bg) ctx.drawImage(imgs.bg, 0, 0, dims.w, dims.h);
      else {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, dims.w, dims.h);
      }

      // Player
      if (imgs.player) {
        const playerY = dims.h - PLAYER_Y_OFFSET;
        drawRoundImage(ctx, imgs.player, player.current.x, playerY, 80);
      }

      // Entities
      enemies.current.forEach((e) => {
        drawRoundImage(ctx, e.img, e.x, e.y, 50);
      });

      if (boss.current && imgs.boss) {
        drawRoundImage(ctx, imgs.boss, boss.current.x, boss.current.y, 160);

        ctx.fillStyle = "rgba(255,0,0,0.3)";
        ctx.fillRect(boss.current.x - 50, boss.current.y - 100, 100, 6);
        ctx.fillStyle = "red";
        ctx.fillRect(
          boss.current.x - 50,
          boss.current.y - 140,
          (boss.current.hp / boss.current.maxHp) * 100,
          6
        );
      }

      // FX
      ctx.fillStyle = "#fff";
      bullets.current.forEach((b) => ctx.fillRect(b.x - 2, b.y, 4, 20));
      ctx.fillStyle = "#ff0";
      enemyBullets.current.forEach((b) => ctx.fillRect(b.x - 2, b.y, 4, 20));
      particles.current.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 3, 3);
      });

      if (levelCleared) {
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(0, 0, dims.w, dims.h);
        ctx.fillStyle = "#4ecdc4";
        ctx.font = "bold 40px roboto";
        ctx.textAlign = "center";
        ctx.fillText(`LEVEL ${level} CLEARED`, dims.w / 2, dims.h / 2);
      }
    };

    const loop = () => {
      update();
      draw();
      raf.current = requestAnimationFrame(loop);
    };

    if (state === "play") {
      const down = (e) => {
        if (
          state === "play" &&
          (e.key === " " || e.key === "ArrowLeft" || e.key === "ArrowRight")
        ) {
          e.preventDefault(); // ⛔ stop page scroll
        }
        keys.current[e.key] = true;
      };

      const up = (e) => {
        if (
          state === "play" &&
          (e.key === " " || e.key === "ArrowLeft" || e.key === "ArrowRight")
        ) {
          e.preventDefault();
        }
        keys.current[e.key] = false;
      };

      window.addEventListener("keydown", down);
      window.addEventListener("keyup", up);
      raf.current = requestAnimationFrame(loop);
      return () => {
        window.removeEventListener("keydown", down);
        window.removeEventListener("keyup", up);
        cancelAnimationFrame(raf.current);
      };
    }
  }, [state, dims, difficulty, levelCleared, level]);

  return (
    <div className="invaders-root">
      <canvas ref={canvasRef} width={dims.w} height={dims.h} />

      {state !== "play" && (
        <div className="overlay">
          <div className="overlay-box">
            <h1>404 INVADERS</h1>
            <div className="controls-info">
              <div>
                <span>← / →</span> Move
              </div>
              <div>
                <span>SPACE</span> Shoot
              </div>
            </div>

            {state === "menu" && (
              <button
                disabled={!assetsLoaded}
                onClick={() => {
                  unlockAudio();
                  setState("difficulty");
                }}
              >
                {assetsLoaded ? "START MISSION" : "LOADING ASSETS..."}

              </button>
            )}
            {state === "difficulty" && (
              <div className="diff-grid">
                <button className="easy" onClick={() => startGame("easy")}>
                  EASY
                </button>
                <button className="medium" onClick={() => startGame("medium")}>
                  MEDIUM
                </button>
                <button className="hard" onClick={() => startGame("hard")}>
                  HARDCORE
                </button>
              </div>
            )}
            {state === "gameover" && (
              <>
                <p>SCORE: {score}</p>
                <button onClick={() => setState("difficulty")}>RETRY</button>
              </>
            )}
          </div>
        </div>
      )}

      {state === "play" && (
        <div className="hud" style={{ top: HUD_OFFSET }}>
          <div className="hud-item">SCORE: {score}</div>
          <div className="hud-item center">
            <div className="hp-label">HP</div>
            <div className="hp-bar">
              <div
                className="hp-fill"
                style={{ width: `${Math.max(0, hp)}%` }}
              />
            </div>
          </div>
          <div className="hud-item">LVL: {level}</div>
        </div>
      )}
    </div>
  );
}
