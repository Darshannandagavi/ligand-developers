// routes/examRoutes.js
import { Router } from "express";
const router = Router();
import { createExam, getExams, getExamById, updateExam, deleteExam, getExamsforadmin, toggleCollegeAccess, getExamsForUser, toggleShowResult } from "../controllers/examController.js";
import { auth } from "../middleware/auth.js";
import adminOnly from "../middleware/adminOnly.js";

router.post("/", auth,adminOnly,createExam);
router.get("/",auth, getExams);
router.get("/examsforadmin",auth,adminOnly,getExamsforadmin);
router.get("/:id",auth, getExamById);
router.put("/:id",auth,adminOnly, updateExam);
router.delete("/:id",auth,adminOnly, deleteExam);
router.put("/exams/:id/college",auth,adminOnly, toggleCollegeAccess);
router.put("/:id/show-result",auth,adminOnly, toggleShowResult);
router.get("/foruser/forcollege",auth, getExamsForUser);


export default router;