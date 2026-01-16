import progress from "../models/progress.js";
import Account from "../models/Account.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { automoveat } from "../utils/queueFlow.js";

export async function handletick(req, res) {
  try {
    const { question_id } = req.body;
    const user = req.user;

    let record = await progress.findOne({ user, question: question_id });

    if (record && record.isDone) {
      return res.json({ msg: "Already solved", progress: record });
    }

    let solvedQueue = "Q1";

    if (record) {
      record.isDone = true;
      await record.save();
      solvedQueue = record.queue;
    } else {
      record = await progress.create({
        user,
        question: question_id,
        queue: "Q1",
        isDone: true,
        queueEnteredAt: new Date(),
        autoMoveAt: automoveat("Q1"),
      });
    }


    const account = await Account.findById(user);

    if (account) {
      const now = new Date();
      const today = now.toISOString().slice(0, 10); // YYYY-MM-DD
      const last = account.lastActive
        ? account.lastActive.toISOString().slice(0, 10)
        : null;

    
      account.totalSolved += 1;
      account.queueCounts[solvedQueue] += 1;

      
      const entry = account.dailySolved.find(d => d.date === today);
      if (entry) entry.solved += 1;
      else account.dailySolved.push({ date: today, solved: 1 });

   
      if (!last) {
        account.streak = 1;
      } else if (last !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const y = yesterday.toISOString().slice(0, 10);

        if (last === y) account.streak += 1;
        else account.streak = 1;
      }

      account.lastActive = now;
      await account.save();
    }

    return res.json({
      msg: "Marked as solved",
      progress: record,
    });

  } catch (err) {
    console.error("Tick error:", err);
    return res.status(500).json({ error: err.message });
  }
}

export async function signup(req, res) {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        msg: "All fields are required",
      });
    }
    email = email.toLowerCase().trim();
    let user = await Account.findOne({ email: email });
    if (user) {
      return res
        .status(409)
        .json({ msg: "Email already exists. Try logging in", flag: "error" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);
    const newuser = await Account.create({
      name,
      email,
      password: hash,
    });

    const token = jwt.sign({ user: newuser._id }, process.env.SECRET_CODE, {
      expiresIn: "15d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true in production
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      msg: "Sign up successfull",
      flag: "success",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "ISR",
    });
  }
}

export const logoutController = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/"
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });

  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Logout failed"
    });
  }
};


export async function gethomeinfo(req, res) {
  const userid = req.user;
  if (!userid) return res.status(401).json({ msg: "id not matched" });

  try {
    const user_data = await progress
      .find({ user: userid })
      .populate("question");

    const account = await Account.findById(userid).select(
      "dailySolved streak queueCounts totalSolved"
    );
    console.log(user_data);
    res.status(200).json({
      user_data,
      stats: account
    });
  } catch (err) {
    res.status(500).json({ msg: "error" });
  }
}


export async function login(req, res) {
  try {
    const email = String(req.body.email);
    const password = String(req.body.password);

    const user = await Account.findOne({ email });
    if (!user) {
      return res
        .status(201)
        .json({ msg: "User not found try sigining in", flag: "error" });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.json({ msg: "Incorrect password or email", flag: "error" });
    }

    const token = jwt.sign({ user: user._id }, process.env.SECRET_CODE, {
      expiresIn: "15d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true in production
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ msg: "Login successful", flag: "success" });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ msg: "Server error", flag: "error" });
  }
}
