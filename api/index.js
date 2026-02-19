import express from "express";
import dotenv from "dotenv";
import { connectDB } from "../backend/db.js"; // adjust path correctly
import router from "../backend/routes/route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: true,
  credentials: true
}));


connectDB();

app.get("/", (_req, res) => {
  return res.json({ msg: "done bai 🚀" });
});

app.use("/api", router);

// 👇 THIS is required for Vercel
export default app;
