import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import { autoMoveUserQueues } from "../utils/queueFlow.js";

async function auth_jwt(req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ msg: "No token found" });
  }

  if (token === "demo_session") {
    req.user = null;
    req.isDemo = true;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_CODE);
    req.user = decoded.user || null;
    req.isDemo = Boolean(decoded.demo);

    if (!req.isDemo && req.user) {
      await autoMoveUserQueues(req.user);
    }

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
}

export default auth_jwt;
