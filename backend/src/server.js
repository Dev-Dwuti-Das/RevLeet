import express from "express"
import dotenv from 'dotenv';
import {connectDB , sample_user_data, mockQuestions} from "./db.js";
import Accounts from '../models/Account.js';
import Questions from "../models/questions.js";


dotenv.config();


const app = express();
const port = 3000;


app.get("/" , (req,res) => {
    return res.json({msg : "done bai"}) 
} )


app.get("/sample_data" , async(req,res) => {
  try{
    const result = await Questions.create(mockQuestions);
    console.log("data inserted");
    res.json({msg:"data inserted", data:result});
  }
  catch(err){
    res.json({msg:err.message});
  }
  })


app.get("/dashboard", (req,res)=>{
    return res.json({msg : "dashboard h vai"}) 
})


app.listen(port , (req,res)=> {
    console.log("running")
    connectDB();
})