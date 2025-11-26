import default_questions from "../models/default_questions.js";

async function getquestions(req, res) {
  try {
    const questions_data = await default_questions.find({});
    return res.status(200).json(questions_data);
  } catch (err) {
    return res.status(500).json({ error: "something bad happend" });
  }
}

export default getquestions;