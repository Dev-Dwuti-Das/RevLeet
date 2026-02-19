import express from "express";
import { signup } from "../controllers/userController.js";
import { handletick } from "../controllers/userController.js";
import { login } from "../controllers/userController.js";
import { demoLogin } from "../controllers/userController.js";
import auth_jwt from "../middleware/auth.js";
import  getquestions from "../controllers/controller.js";
import { gethomeinfo } from "../controllers/userController.js";
import { handle_done } from "../utils/queueFlow.js";
import { logoutController } from "../controllers/userController.js";

const router = express.Router();


// router.get('/dashboard', dashboard);

// router.get('/listing', listing);
router.get("/gethomeinfo", auth_jwt, gethomeinfo);

router.get("/questions",auth_jwt, getquestions);

router.post("/queuedone",auth_jwt, handle_done);

router.post("/signup",signup);  

router.post("/login",login);  

router.post("/demo-login", demoLogin);

router.post("/tick",auth_jwt, handletick);

router.post("/logout", logoutController);

router.get("/me", auth_jwt, (req, res) => {
  res.json({
    user: req.user,
    demo: Boolean(req.isDemo),
  });
});


export default router;  
