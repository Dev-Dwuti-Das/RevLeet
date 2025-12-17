import express from "express"
import dotenv from 'dotenv';
import {connectDB, mockQuestions} from "./db.js";
import Accounts from '../models/Account.js';
// import Questions from "../models/questions.js";
import default_questions from "../models/default_questions.js";
import router from "../routes/route.js";
dotenv.config();
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json())

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.get("/" , (req,res) => {
    return res.json({msg : "done bai"}) 
} )

app.use("/api", router);

app.use("/user", router);



// app.get("/sample_data", async (req, res) => {
//   try {
//     // 2. Insert new mock questions
//     const result = await default_questions.insertMany(mockQuestions);
//     console.log("New data inserted");

//     res.json({
//       msg: "Database refreshed successfully",
//       data: result
//     });
//   } catch (err) {
//     res.json({ msg: err.message });
//   }
// });



// app.get("/dashboard", (req,res)=>{
//     return res.json({msg : "dashboard h vai"}) 
// })


app.listen(port , (req,res)=> {
    console.log("running")
    connectDB();
})