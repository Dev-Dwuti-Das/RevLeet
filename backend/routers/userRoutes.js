import express from "express"
import { dashboard } from "../controllers/userController.js";
import { listing } from "../controllers/userController.js";
const router = express.Router();

router.get('/dashboard', dashboard);

router.get('/listing', listing);

// router.get('/dashboard', dashboard);

export default router;