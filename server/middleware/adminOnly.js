const adminOnly = (req, res, next) => {
  // auth middleware MUST run before this
  if (!req.user || req.user.role !== "admin") {
    console.log("admin only",req.user);
    return res.status(403).json({ error: "Admin access only" });
  }
  next();
};

export default adminOnly;
