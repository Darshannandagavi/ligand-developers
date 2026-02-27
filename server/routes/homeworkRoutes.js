
import express from "express";
import {
  addHomework,
  getAllHomeworks,
  getHomeworkById,
  updateHomework,
  deleteHomework,
} from "../controllers/homeworkController.js";
import { auth } from "../middleware/auth.js";
import adminOnly from "../middleware/adminOnly.js";

const homeworkRoutes = express.Router();

// Add new homework
homeworkRoutes.post("/",auth, adminOnly, addHomework);

// Get all homeworks
homeworkRoutes.get("/gethomework",auth, adminOnly, getAllHomeworks);

// Get single homework (optional but useful)
homeworkRoutes.get("/:id",auth, getHomeworkById);

// Update homework
homeworkRoutes.put("/:id",auth, adminOnly, updateHomework);

// Delete homework
homeworkRoutes.delete("/:id",auth, adminOnly, deleteHomework);

export default homeworkRoutes;
