import express from "express";
import { email } from "../controllers/email.controller";

const router = express.Router();
router.post("/emailSend/:email", email);

export default router;
