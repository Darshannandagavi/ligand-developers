
import express from "express";
import {
  addHomework,
  getAllHomeworks,
  getHomeworkById,
  updateHomework,
  deleteHomework,
} from "../controllers/homeworkController.js";

const homeworkRoutes = express.Router();

// Add new homework
homeworkRoutes.post("/", addHomework);

// Get all homeworks
homeworkRoutes.get("/gethomework", getAllHomeworks);

// Get single homework (optional but useful)
homeworkRoutes.get("/:id", getHomeworkById);

// Update homework
homeworkRoutes.put("/:id", updateHomework);

// Delete homework
homeworkRoutes.delete("/:id", deleteHomework);

export default homeworkRoutes;
