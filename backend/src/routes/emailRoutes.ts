import express from "express";
import { getEmails } from "../controllers/emailController";

const router = express.Router();

router.get("/", getEmails);

export default router;
