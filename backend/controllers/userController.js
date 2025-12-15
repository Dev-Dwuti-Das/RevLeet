import progress from "../models/progress.js";
import Account from "../models/Account.js";

export const dashboard = (req, res) => {
  return res.json({ msg: "dashboard h vai" });
};

export const listing = (req, res) => {
  return res.json({ msg: "listing" });
};

export async function handletick(req, res) {
  try {
    const { user, question_id } = req.body;

    let record = await progress.findOne({ user, question: question_id });

    if (record) {
      if (record.isDone) {
        return res.json({ msg: "Already solved", progress: record });
      }

      record.isDone = true;
      await record.save();

      return res.json({ msg: "Marked as solved", progress: record });
    }


    const autoMoveAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const newRecord = await progress.create({
      user,
      question: question_id,
      queue: "Q1",
      isDone: true,
      queueEnteredAt: new Date(),
      autoMoveAt,
    });

    const account = await Account.findById(user);
    if (account) {
      const now = new Date();
      const today = now.toDateString();
      const last = account.lastActive?.toDateString();

      account.totalSolved += 1;
      account.queueCounts.Q1 += 1;

      const entry = account.dailySolved.find((d) => d.date === today);
      if (entry) entry.solved += 1;
      else account.dailySolved.push({ date: today, solved: 1 });

      if (!last) account.streak = 1;
      else if (last !== today) {
        const y = new Date(now);
        y.setDate(now.getDate() - 1);

        if (last === y.toDateString()) account.streak += 1;
        else account.streak = 1;
      }

      account.lastActive = now;
      await account.save();
    }

    return res.json({
      msg: "Solved for the first time",
      progress: newRecord,
    });

  } catch (err) {
    console.error("Tick error:", err);
    res.status(500).json({ error: err.message });
  }
}