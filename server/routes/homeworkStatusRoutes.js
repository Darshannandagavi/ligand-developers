import express from "express";
import { getStudentHomeworkStatus, updateHomeworkStatus } from "../controllers/homeworkstatuscontroller.js";



const homeworkstatusRouter = express.Router();

homeworkstatusRouter.post("/", updateHomeworkStatus);
homeworkstatusRouter.get("/:studentId", getStudentHomeworkStatus);

// ✅ Add this new route
// homeworkstatusRouter.get("/unlocked-exams/:studentId", async (req, res) => {
//   try {
//     const { studentId } = req.params;
//     const result = await getUnlockedExams(studentId);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

export default homeworkstatusRouter;
