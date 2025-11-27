import express from "express"
import dotenv from 'dotenv';
import {connectDB, mockQuestions} from "./db.js";
import Accounts from '../models/Account.js';
import Questions from "../models/questions.js";
import default_questions from "../models/default_questions.js";
import router from "../routes/route.js";
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json())

app.get("/" , (req,res) => {
    return res.json({msg : "done bai"}) 
} )

<<<<<<< HEAD
app.use("/api/", router);

=======
app.use('/api/revleet',userRouter);
>>>>>>> 6c41057c3657902714bcd651e7e151738fd48d80


app.get("/sample_data", async (req, res) => {
  try {
    let inserted = [];
    let skipped = [];

    for (const q of mockQuestions) {
      const exists = await default_questions.findOne({
        $or: [
          { title: q.title },
          { slug: q.slug },
          { questionNumber: q.questionNumber }
        ]
      });

      if (exists) {
        skipped.push(q.title);
        continue; 
      }

      const newQ = await default_questions.create(q);
      inserted.push(newQ);
    }

    res.json({
      message: "Database updated successfully",
      insertedCount: inserted.length,
      skippedCount: skipped.length,
      inserted,
      skipped,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


<<<<<<< HEAD

// app.get("/dashboard", (req,res)=>{
//     return res.json({msg : "dashboard h vai"}) 
// })


=======
>>>>>>> 6c41057c3657902714bcd651e7e151738fd48d80
app.listen(port , (req,res)=> {
    console.log("running")
    connectDB();
})