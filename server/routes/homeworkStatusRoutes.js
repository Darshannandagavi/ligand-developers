import express from "express";

const homeworkstatusRouter = express.Router();

homeworkstatusRouter.post("/", updateHomeworkStatus);
homeworkstatusRouter.get("/:studentId", getStudentHomeworkStatus);

export default homeworkstatusRouter;
