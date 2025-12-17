import express from "express"
import { signup } from "../controllers/userController";
const userrouter =  express.Router();

userrouter.post("/signup", signup);