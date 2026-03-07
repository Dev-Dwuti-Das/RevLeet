import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "../backend/src/db.js";
import router from "../backend/routes/route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load backend env file when running from project root (e.g. `node api/index.js`).
dotenv.config({ path: path.resolve(__dirname, "../backend/.env") });

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


app.use("/", router);
app.use("/api", router);

export default app;
