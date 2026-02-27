import express from "express";
import { createFeePayments, listFeePayments, updateFeeStatus } from "../controllers/feePaymentController.js";
import { auth } from "../middleware/auth.js";
import adminOnly from "../middleware/adminOnly.js";

const router = express.Router();

router.post("/", auth,adminOnly, createFeePayments);
router.get("/", auth, listFeePayments);
router.put("/:id/status", auth,adminOnly, updateFeeStatus);

export default router;
