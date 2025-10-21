import express from "express"
const app = express();

const port = 3000;

app.get("/" , (req,res) => {
    return res.json({msg : "done bai"}) 
} )


app.get("/dashboard", (req,res)=>{
    return res.json({msg : "dashboard h vai"}) 
})



app.listen(port , (req,res)=> {
    console.log("chal rha bhai");
})