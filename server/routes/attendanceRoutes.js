import express from "express";
import { getStudentsByProgramTech, markAttendance, getAttendanceRecords, getBatchesByCollege, getProgramsByCollegeBatch, getTechnologiesByCollegeBatchProgram, getStudentsforTeacher } from "../controllers/attendanceController.js";

const router = express.Router();

// options for chained selects
router.get("/students/forteacher", getStudentsforTeacher);
router.get("/options/batches",  getBatchesByCollege); // ?collegeName=
router.get("/options/programs",  getProgramsByCollegeBatch); // ?collegeName=&batch=
router.get("/options/technologies",  getTechnologiesByCollegeBatchProgram); // ?collegeName=&batch=&programName=

// existing endpoints
router.get("/students", getStudentsByProgramTech); // ?collegeName=&batch=&programName=&technology=

router.post("/",  markAttendance);
router.get("/", getAttendanceRecords);

export default router;
