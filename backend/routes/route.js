import express from "express";
import  getquestions from "../controllers/controller.js";
const router = express.Router();

router.get("/questions", getquestions);

export default router;