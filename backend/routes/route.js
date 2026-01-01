import express from "express";
import { signup } from "../controllers/userController.js";
import { handletick } from "../controllers/userController.js";
import { login } from "../controllers/userController.js";
import auth_jwt from "../middleware/auth.js";
// import { dashboard } from "../controllers/userController.js";
import  getquestions from "../controllers/controller.js";
// import { listing } from "../controllers/userController.js";
import { gethomeinfo } from "../controllers/userController.js";
import { handle_done } from "../utils/queueFlow.js";

const router = express.Router();


// router.get('/dashboard', dashboard);

// router.get('/listing', listing);
router.get("/gethomeinfo", auth_jwt, gethomeinfo);

router.get("/questions",auth_jwt, getquestions);

router.post("/queuedone",auth_jwt, handle_done);

router.post("/signup",signup);  

router.post("/login",login);  

router.post("/tick",auth_jwt, handletick)

export default router;  