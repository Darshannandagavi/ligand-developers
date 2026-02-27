// backend/routes/notesRoutes.js
import express from "express";
import { getActiveNotes, getNotesForUser } from "../controllers/notesController.js";
import { addNote, updateNote, toggleNoteStatus, deleteNote, getAllnotes, toggleNoteCollegeAccess } from "../controllers/adminNotesController.js";
import { auth } from "../middleware/auth.js";
import adminOnly from "../middleware/adminOnly.js";

const notesrouter = express.Router();


// frontend routes
notesrouter.get("/active",auth, getActiveNotes);
notesrouter.get("/foruser/:collegeName", getNotesForUser);

// admin routes
notesrouter.post("/",auth, adminOnly, addNote);

notesrouter.put("/:id",auth, adminOnly,  updateNote);
notesrouter.put("/:id/college",auth, adminOnly,  toggleNoteCollegeAccess);
notesrouter.patch("/:id/toggle",auth, adminOnly,  toggleNoteStatus);
notesrouter.delete("/:id",auth, adminOnly,  deleteNote);
notesrouter.get("/admin",auth, adminOnly,  getAllnotes);

export default notesrouter;
