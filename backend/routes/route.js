import express from "express";
import { signup } from "../controllers/userController.js";
import { handletick } from "../controllers/userController.js";
import { login } from "../controllers/userController.js";
import auth_jwt from "../middleware/auth.js";
// import { dashboard } from "../controllers/userController.js";
import  getquestions from "../controllers/controller.js";
// import { listing } from "../controllers/userController.js";
import { gethomeinfo } from "../controllers/userController.js";
const router = express.Router();


// router.get('/dashboard', dashboard);

// router.get('/listing', listing);
router.get("/gethomeinfo", auth_jwt, gethomeinfo);

router.get("/questions",auth_jwt, getquestions);

router.post("/signup",signup);  

router.post("/login",login);  

router.post("/tick",auth_jwt, handletick)

export default router;  