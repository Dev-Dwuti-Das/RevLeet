import progress from "../models/progress.js";
import Account from "../models/Account.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";




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

export async function signup(req, res) {
  try {
    let { name, email, password } = req.body;
    email = email.toLowerCase().trim();
    let user = await Account.findOne({ email: email });
    if (user) {
      return res.status(200).json({ msg: "Email already exists. Try logging in" , flag:"error"});
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);
    const newuser = await Account.create({
      name,
      email,
      password: hash,
    });
    console.log(newuser);

    return res.status(201).json({
      msg: "Sign up successfull",
      flag : "success"
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "working",
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await Account.findOne({ email })
    if (!user) {
      res.status(201).json({ msg: "User not found try sigining in", flag:"error" });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) res.json({ msg: "Incorrect password or email" ,  flag:"error"});

    const token = jwt.sign({ user: user._id }, process.env.SECRET_CODE, {
      expiresIn: "15d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false, // true in production
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ msg: "Login successful" , flag:"success"});
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ msg: "Server error" , flag:"server error"});
  }
}
