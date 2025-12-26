import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { autoMoveUserQueues } from "../utils/queue_flow.js";

async function auth_jwt(req, res, next) {
  let token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ msg: "No token found" });
  }
  try {
    const decodeduser = jwt.verify(token, process.env.SECRET_CODE);
    req.user = decodeduser.user;
    console.log(req.user);
    try {
      await autoMoveUserQueues(req.user);
    } catch (e) {
      console.error("Auto-move failed:", e);
    }
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
}

export default auth_jwt;
