import default_questions from "../models/default_questions.js";
import DefaultQuestion from "../models/default_questions.js";
import Progress from "../models/progress.js";


async function getquestions(req, res) {
  try {
    console.log("REQ.USER =", req.user); // 🔥 ADD THIS

  const user_data = await Progress.find({ user: req.user });
  console.log("FOUND =", user_data.length); // 🔥 ADD THIS
    const userId = req.user;

    if (!userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const questions = await DefaultQuestion.find({}).lean();
    const progressList = await Progress.find({ user: userId }).lean();

    const progressMap = {};
    progressList.forEach(p => {
      if (p.question) {
        progressMap[p.question.toString()] = p.isDone;
      }
    });

    const merged = questions.map(q => ({
      ...q,
      isDone: progressMap[q._id.toString()] ?? false,
    }));

    return res.status(200).json(merged);
  } catch (err) {
    console.error("getquestions error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}


export default getquestions;
