import express from "express"
import { MongoClient } from 'mongodb';
const app = express();
const port = 3000;




async function runGetStarted() {
  // Replace the uri string with your connection string
  const uri = process.env.MONGO_KEY;
  const client = new MongoClient(uri);
  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    // Queries for a movie that has a title value of 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    await client.close();
  }
}
runGetStarted().catch(console.dir);

app.get("/" , (req,res) => {
    return res.json({msg : "done bai"}) 
} )


app.get("/dashboard", (req,res)=>{
    return res.json({msg : "dashboard h vai"}) 
})


app.listen(port , (req,res)=> {
    console.log("chal rha bhai");
})