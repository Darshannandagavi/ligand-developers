import express from "express";
import { getStudentsByProgramTech, markAttendance, getAttendanceRecords, getBatchesByCollege, getProgramsByCollegeBatch, getTechnologiesByCollegeBatchProgram, getStudentsforTeacher } from "../controllers/attendanceController.js";
import { auth } from "../middleware/auth.js";
import adminOnly from "../middleware/adminOnly.js";

const router = express.Router();

// options for chained selects
router.get("/students/forteacher",auth, getStudentsforTeacher);
router.get("/options/batches", getBatchesByCollege); // ?collegeName=
router.get("/options/programs", getProgramsByCollegeBatch); // ?collegeName=&batch=
router.get("/options/technologies",auth,  getTechnologiesByCollegeBatchProgram); // ?collegeName=&batch=&programName=

// existing endpoints
router.get("/students",auth, adminOnly, getStudentsByProgramTech); // ?collegeName=&batch=&programName=&technology=

router.post("/",auth, adminOnly,  markAttendance);
router.get("/",auth, getAttendanceRecords);

export default router;
