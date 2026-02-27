// import express from "express";
// import {
//   createTopic,
//   getTopics,
//   getTopic,
//   updateTopicName,
//   addQuestion,
//   updateQuestion,
//   deleteQuestion,
//   deleteTopic,
// } from "../controllers/topicController.js";
// import { getAllScores, getUserScores, saveInterviewScore } from "../controllers/interviewController.js";

// const topicrouter = express.Router();
// topicrouter.get("/getallscores", getAllScores);
// // Topics
// topicrouter.get("/interviewscore/:username", getUserScores);
// topicrouter.post("/", createTopic);
// topicrouter.get("/", getTopics);
// topicrouter.post("/interview/score", saveInterviewScore);
// topicrouter.get("/:id", getTopic);
// topicrouter.put("/:id", updateTopicName);
// topicrouter.delete("/:id", deleteTopic);


// // Admin - all scores

// // Questions
// topicrouter.post("/:id/questions", addQuestion);
// topicrouter.put("/:id/questions/:qid", updateQuestion);   
// topicrouter.delete("/:id/questions/:qid", deleteQuestion);

// export default topicrouter;



import express from "express";
import {
  createTopic,
  getTopics,
  getTopic,
  updateTopicName,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  deleteTopic,
} from "../controllers/topicController.js";
import { 
  getAllScores, 
  getUserScores, 
  saveInterviewScore 
} from "../controllers/interviewController.js";
import { auth } from "../middleware/auth.js";
import adminOnly from "../middleware/adminOnly.js";

const topicrouter = express.Router();

// ---------------------------------------------
// INTERVIEW SCORE ROUTES (must be BEFORE :id)
// ---------------------------------------------
topicrouter.get("/interviewscore/:username",auth, getUserScores);
topicrouter.post("/interview/score",auth, saveInterviewScore);
topicrouter.get("/getallscores",auth, getAllScores);

// ---------------------------------------------
// TOPIC ROUTES
// ---------------------------------------------
topicrouter.post("/",auth, adminOnly, createTopic);
topicrouter.get("/",auth, getTopics);

// ---------------------------------------------
// QUESTION ROUTES (must be BEFORE :id)
// ---------------------------------------------
topicrouter.post("/:id/questions",auth, adminOnly, addQuestion);
topicrouter.put("/:id/questions/:qid",auth, adminOnly, updateQuestion);
topicrouter.delete("/:id/questions/:qid",auth, adminOnly, deleteQuestion);

// ---------------------------------------------
// DYNAMIC ROUTE — MUST BE LAST
// ---------------------------------------------
topicrouter.get("/:id",auth, getTopic);
topicrouter.put("/:id",auth, adminOnly, updateTopicName);
topicrouter.delete("/:id",auth, adminOnly, deleteTopic);

export default topicrouter;
