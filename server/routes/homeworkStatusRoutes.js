import express from "express";
import { getStudentHomeworkStatus, updateHomeworkStatus } from "../controllers/homeworktatuscontroller.js";




const homeworkstatusRouter = express.Router();

homeworkstatusRouter.post("/", updateHomeworkStatus);
homeworkstatusRouter.get("/:studentId", getStudentHomeworkStatus);

export default homeworkstatusRouter;
