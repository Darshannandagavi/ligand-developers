import express from "express";
import { register, login, getAllUsers, getUserById, updateUser, deleteUser, changePassword, forgotPassword, makeBatchPassout, toggleApproval, approveByDate, getStudentProfile, updateStudentProfile } from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const userrouter = express.Router();
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access only" });
  }
  next();
};

// Multer config
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, "uploads/"),
//     filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
// });


// Public routes
userrouter.get("/profile", auth, getStudentProfile);
userrouter.put("/profile", auth,upload.single("profilePic"), updateStudentProfile);
userrouter.post("/register", upload.single("profilePic"), register);
userrouter.post("/login", login);
userrouter.post("/forgotpassword", forgotPassword);
// Protected routes
userrouter.get("/", getAllUsers);
userrouter.put("/change-password", auth, changePassword);

// ADMIN: Approve / Unapprove a student
userrouter.put("/approve/:id", auth, toggleApproval);
userrouter.put("/approve-by-date", auth, approveByDate);
userrouter.get("/:id", auth, getUserById);
userrouter.put("/:id", auth, upload.single("profilePic"), updateUser);
userrouter.delete("/:id", auth, deleteUser);
// Admin route to mark batch as passout
userrouter.post("/make-passout", auth, makeBatchPassout);

export default userrouter;
