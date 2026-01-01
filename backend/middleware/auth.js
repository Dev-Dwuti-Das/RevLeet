import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import { autoMoveUserQueues } from "../utils/queueFlow.js";

async function auth_jwt(req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ msg: "No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_CODE);
    req.user = decoded.user;

    // IMPORTANT: awaited
    await autoMoveUserQueues(req.user);

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
}

export default auth_jwt;
