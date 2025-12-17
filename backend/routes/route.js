import express from "express";
import { signup } from "../controllers/userController.js";
import { handletick } from "../controllers/userController.js";
// import { dashboard } from "../controllers/userController.js";
import  getquestions from "../controllers/controller.js";
// import { listing } from "../controllers/userController.js";
const router = express.Router();

// router.get('/dashboard', dashboard);

// router.get('/listing', listing);

router.get("/questions", getquestions);

router.get("/signup",signup);

router.post("/tick", handletick)

export default router;