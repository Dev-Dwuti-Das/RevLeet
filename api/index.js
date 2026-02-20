import express from "express";
import dotenv from "dotenv";
import { connectDB } from "../backend/src/db.js";
import router from "../backend/routes/route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

connectDB();

app.get("/", (_req, res) => {
  return res.json({ msg: "done bai 🚀" });
});

app.get("/api", (_req, res) => {
  return res.json({ msg: "api alive" });
});

// Keep both mounts so routes work whether /api is stripped or preserved by the runtime.
app.use("/", router);
app.use("/api", router);

export default app;
