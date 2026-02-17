import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import router from "../routes/route.js";
dotenv.config();
import cookieparser from "cookie-parser";
import cors from "cors";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(cookieparser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.get("/", (_req, res) => {
  return res.json({ msg: "done bai" });
});

app.use("/api", router);
app.listen(port, () => {
  connectDB();
  console.log("running");
});
