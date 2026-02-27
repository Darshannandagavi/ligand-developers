import express from "express";
import {
  submitExam,
  getStudentHistory,
  getExamAttemptsnew,
  getExamAttempts,
} from "../controllers/examAttemptController.js";
import { auth } from "../middleware/auth.js";
import exam from "../models/exam.js";

const examAttemptRouter = express.Router();

// Student submits exam
examAttemptRouter.post("/submit",auth, submitExam);



// Student’s own history
examAttemptRouter.get("/my",auth, getStudentHistory);

// Admin: get all attempts for a specific exam
examAttemptRouter.get("/exam/:examId",auth, getExamAttempts);

export default examAttemptRouter;
