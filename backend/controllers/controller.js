import default_questions from "../models/default_questions.js";

import DefaultQuestion from "../models/default_questions.js";
import Progress from "../models/progress.js";

  async function getquestions(req, res) {
    try {
      const userId = req.query.userId;

      const questions = await DefaultQuestion.find({});

      if (!userId) {
        return res.status(200).json(
          questions.map(q => ({
            ...q.toObject(),
            isDone: false
          }))
        );
      }

    const progress = await Progress.find({ user: userId });

    const merged = questions.map(q => {
      const match = progress.find(p => p.question.toString() === q._id.toString());
      return {
        ...q.toObject(),
        isDone: match ? match.isDone : false
      };
    });

    return res.status(200).json(merged);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}

export default getquestions;


