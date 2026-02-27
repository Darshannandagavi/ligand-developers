import express from "express";
import {updateHomeworkStatus,getStudentHomeworkStatus} from "../controllers/homeworkStatusController.js"
import { auth } from "../middleware/auth.js";
const homeworkstatusRouter = express.Router();

homeworkstatusRouter.post("/",auth, updateHomeworkStatus);
homeworkstatusRouter.get("/:studentId",auth, getStudentHomeworkStatus);

export default homeworkstatusRouter;
