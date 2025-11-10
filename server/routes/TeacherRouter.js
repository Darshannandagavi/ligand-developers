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
import { protectTeacher } from "../middleware/auth.js";

const TeacherRouter = express.Router();

TeacherRouter.get("/", getAllTeachers);
TeacherRouter.post("/register", registerTeacher);
TeacherRouter.post("/login", loginTeacher);
TeacherRouter.put("/update/:id",  updateTeacher);
TeacherRouter.delete("/delete/:id", deleteTeacher);
TeacherRouter.patch("/toggle-status/:id",toggleActiveStatus);
TeacherRouter.post("/forgot-password", forgotPassword);
TeacherRouter.post("/change-password", protectTeacher, changePassword);

export default TeacherRouter;
