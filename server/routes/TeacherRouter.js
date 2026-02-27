import express from "express";
import {
  registerTeacher,
  loginTeacher,
  updateTeacher,
  deleteTeacher,
  toggleActiveStatus,
  forgotPassword,
  changePassword,
  getAllTeachers,
} from "../controllers/TeacherController.js";
import { auth, protectTeacher } from "../middleware/auth.js";
import adminOnly from "../middleware/adminOnly.js";

const TeacherRouter = express.Router();

TeacherRouter.get("/",auth, adminOnly, getAllTeachers);
TeacherRouter.post("/register",auth, adminOnly, registerTeacher);
TeacherRouter.post("/login", loginTeacher);
TeacherRouter.put("/update/:id",auth,  updateTeacher);
TeacherRouter.delete("/delete/:id",auth, adminOnly, deleteTeacher);
TeacherRouter.post("/toggle-status/:id",auth, adminOnly,toggleActiveStatus);
TeacherRouter.post("/forgot-password", forgotPassword);
TeacherRouter.post("/change-password", auth, changePassword);


export default TeacherRouter;
