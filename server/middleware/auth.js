// import jwt from "jsonwebtoken";

// export const auth = (req, res, next) => {
//     const token = req.header("Authorization")?.split(" ")[1];
//     if (!token) return res.status(401).json({ error: "Access denied" });

//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(400).json({ error: "Invalid token" });
//     }
// };



import jwt from "jsonwebtoken";
import Teacher from "../models/Teacher.js";


export const auth = (req, res, next) => {
  try {
    // ONLY read from HTTP-only cookie (most secure)
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded)
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};



export const protectTeacher = async (req, res, next) => {
  try {
    const token = req.cookies?.teacherToken;
    console.log(req.cookies);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Teacher.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
