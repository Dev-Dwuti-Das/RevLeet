import progress from "../models/progress.js";
import Account from "../models/Account.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import axios from "axios";
import { automoveat, getBufferSettings, getQueueFlow } from "../utils/queueFlow.js";
import { demoHomeData } from "../utils/demoData.js";
import { z } from "zod";

const isProd = process.env.NODE_ENV === "production";

const signupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const queueSettingsSchema = z.object({
  Q1Seconds: z.coerce.number().int().min(5).max(30 * 24 * 60 * 60),
  Q3Seconds: z.coerce.number().int().min(5).max(60 * 24 * 60 * 60),
});

function getCookieOptions() {
  return {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
}

function getOAuthStateCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    path: "/",
    maxAge: 10 * 60 * 1000,
  };
}

function issueAuthCookie(res, userId) {
  const token = jwt.sign({ user: userId }, process.env.SECRET_CODE, {
    expiresIn: "15d",
  });
  res.cookie("token", token, getCookieOptions());
}

function frontendBaseUrl() {
  return process.env.FRONTEND_URL || "http://localhost:5173";
}

function withoutTrailingSlash(url) {
  return String(url || "").replace(/\/+$/, "");
}

function requestOrigin(req) {
  const forwardedProto = req.get("x-forwarded-proto");
  const proto = forwardedProto ? forwardedProto.split(",")[0].trim() : req.protocol;
  const host = req.get("x-forwarded-host") || req.get("host");
  return `${proto}://${host}`;
}

function oauthCallbackUrl(req, provider) {
  const envValue =
    provider === "google"
      ? process.env.GOOGLE_CALLBACK_URL
      : process.env.GITHUB_CALLBACK_URL;
  if (envValue) return envValue;

  // In local dev, OAuth often starts on frontend origin (/api via Vite proxy).
  // Using frontend origin keeps oauth_state cookie and callback host aligned.
  if (!isProd) {
    return `${withoutTrailingSlash(frontendBaseUrl())}/api/auth/${provider}/callback`;
  }

  return `${requestOrigin(req)}/api/auth/${provider}/callback`;
}

function oauthRedirectSuccess(res) {
  return res.redirect(`${frontendBaseUrl()}/home`);
}

function oauthRedirectError(res, message = "OAuth failed") {
  return res.redirect(
    `${frontendBaseUrl()}/login?oauthError=${encodeURIComponent(message)}`
  );
}

async function findOrCreateOAuthUser({ provider, providerId, email, name }) {
  let user = await Account.findOne({ email });
  if (user) {
    let dirty = false;
    if (!user.authProvider || user.authProvider === "local") {
      user.authProvider = provider;
      dirty = true;
    }
    if (!user.authProviderId && providerId) {
      user.authProviderId = providerId;
      dirty = true;
    }
    if (!user.name && name) {
      user.name = name;
      dirty = true;
    }
    if (dirty) await user.save();
    return user;
  }

  const randomPassword = crypto.randomBytes(24).toString("hex");
  const passwordHash = await bcrypt.hash(randomPassword, 10);

  return Account.create({
    name: name || email.split("@")[0],
    email,
    password: passwordHash,
    authProvider: provider,
    authProviderId: providerId || null,
  });
}

export async function googleAuthStart(req, res) {
  const missingGoogleVars = ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"].filter(
    (key) => !process.env[key]
  );
  if (missingGoogleVars.length) {
    return res.status(500).json({
      msg: "Google OAuth is not configured",
      missing: missingGoogleVars,
    });
  }

  const state = crypto.randomBytes(24).toString("hex");
  res.cookie("oauth_google_state", state, getOAuthStateCookieOptions());

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: oauthCallbackUrl(req, "google"),
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  });

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  );
}

export async function googleAuthCallback(req, res) {
  try {
    const { code, state, error } = req.query;
    if (error) return oauthRedirectError(res, "Google login was cancelled");
    if (!code || !state) return oauthRedirectError(res, "Missing OAuth params");

    const expectedState = req.cookies?.oauth_google_state;
    res.clearCookie("oauth_google_state", {
      path: "/",
      sameSite: "lax",
      secure: isProd,
    });

    if (!expectedState || expectedState !== state) {
      return oauthRedirectError(res, "Invalid OAuth state");
    }

    const tokenBody = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code: String(code),
      grant_type: "authorization_code",
      redirect_uri: oauthCallbackUrl(req, "google"),
    });

    const tokenRes = await axios.post(
      "https://oauth2.googleapis.com/token",
      tokenBody.toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const accessToken = tokenRes.data?.access_token;
    if (!accessToken) return oauthRedirectError(res, "Google token exchange failed");

    const profileRes = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const email = profileRes.data?.email?.toLowerCase();
    if (!email) return oauthRedirectError(res, "Google account email missing");

    const user = await findOrCreateOAuthUser({
      provider: "google",
      providerId: profileRes.data?.sub || null,
      email,
      name: profileRes.data?.name || null,
    });

    issueAuthCookie(res, user._id);
    return oauthRedirectSuccess(res);
  } catch (err) {
    console.error("Google OAuth callback error:", err?.response?.data || err);
    return oauthRedirectError(res, "Google login failed");
  }
}

export async function githubAuthStart(req, res) {
  const missingGithubVars = ["GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET"].filter(
    (key) => !process.env[key]
  );
  if (missingGithubVars.length) {
    return res.status(500).json({
      msg: "GitHub OAuth is not configured",
      missing: missingGithubVars,
    });
  }

  const state = crypto.randomBytes(24).toString("hex");
  res.cookie("oauth_github_state", state, getOAuthStateCookieOptions());

  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: oauthCallbackUrl(req, "github"),
    scope: "read:user user:email",
    state,
  });

  return res.redirect(
    `https://github.com/login/oauth/authorize?${params.toString()}`
  );
}

export async function githubAuthCallback(req, res) {
  try {
    const { code, state, error } = req.query;
    if (error) return oauthRedirectError(res, "GitHub login was cancelled");
    if (!code || !state) return oauthRedirectError(res, "Missing OAuth params");

    const expectedState = req.cookies?.oauth_github_state;
    res.clearCookie("oauth_github_state", {
      path: "/",
      sameSite: "lax",
      secure: isProd,
    });

    if (!expectedState || expectedState !== state) {
      return oauthRedirectError(res, "Invalid OAuth state");
    }

    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: String(code),
        redirect_uri: oauthCallbackUrl(req, "github"),
      },
      {
        headers: { Accept: "application/json" },
      }
    );

    const accessToken = tokenRes.data?.access_token;
    if (!accessToken) return oauthRedirectError(res, "GitHub token exchange failed");

    const userRes = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
    });

    let email = userRes.data?.email?.toLowerCase() || null;
    if (!email) {
      const emailsRes = await axios.get("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
        },
      });
      const primaryEmail =
        emailsRes.data?.find((item) => item.primary && item.verified) ||
        emailsRes.data?.find((item) => item.verified) ||
        emailsRes.data?.[0];
      email = primaryEmail?.email?.toLowerCase() || null;
    }

    if (!email) return oauthRedirectError(res, "GitHub account email missing");

    const user = await findOrCreateOAuthUser({
      provider: "github",
      providerId: userRes.data?.id ? String(userRes.data.id) : null,
      email,
      name: userRes.data?.name || userRes.data?.login || null,
    });

    issueAuthCookie(res, user._id);
    return oauthRedirectSuccess(res);
  } catch (err) {
    console.error("GitHub OAuth callback error:", err?.response?.data || err);
    return oauthRedirectError(res, "GitHub login failed");
  }
}

export async function handletick(req, res) {
  try {
    if (req.isDemo) {
      return res.status(403).json({ msg: "Demo mode is read-only" });
    }

    const { question_id } = req.body;
    const user = req.user;
    const account = await Account.findById(user);
    const flowMap = getQueueFlow(account);

    let record = await progress.findOne({ user, question: question_id });

    if (record && record.isDone) {
      return res.json({ msg: "Already solved", progress: record });
    }

    let solvedQueue = "Q1";

    if (record) {
      record.isDone = true;
      record.queueEnteredAt = new Date();
      if (flowMap[record.queue]?.type === "waiting") {
        record.autoMoveAt = automoveat(record.queue, account);
      } else {
        record.autoMoveAt = null;
      }
      await record.save();
      solvedQueue = record.queue;
    } else {
      record = await progress.create({
        user,
        question: question_id,
        queue: "Q1",
        isDone: true,
        queueEnteredAt: new Date(),
        autoMoveAt: automoveat("Q1", account),
      });
    }

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
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ msg: parsed.error.issues[0].message });
    }
    const { name, email, password } = parsed.data;
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
    res.cookie("token", token, getCookieOptions());

    return res.status(201).json({
      msg: "Sign up successfull",
      flag: "success",
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({
      msg: "ISR",
    });
  }
}

export const logoutController = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
      path: "/",
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

export async function demoLogin(req, res) {
  try {
    res.cookie("token", "demo_session", {
      httpOnly: true,
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ msg: "Demo session started", flag: "success" });
  } catch (err) {
    return res.status(500).json({ msg: "Could not start demo", flag: "error" });
  }
}


export async function gethomeinfo(req, res) {
  if (req.isDemo) {
    return res.status(200).json(demoHomeData);
  }

  const userid = req.user;
  if (!userid) return res.status(401).json({ msg: "id not matched" });

  try {
    const user_data = await progress
      .find({ user: userid })
      .populate("question");

    const account = await Account.findById(userid).select(
      "dailySolved streak queueCounts totalSolved bufferSettings"
    );
    res.status(200).json({
      user_data,
      stats: account
    });
  } catch (err) {
    res.status(500).json({ msg: "error" });
  }
}

export async function getQueueSettings(req, res) {
  try {
    if (req.isDemo) {
      return res.status(200).json({
        settings: getBufferSettings(),
        readOnly: true,
      });
    }

    const account = await Account.findById(req.user).select("bufferSettings");
    return res.status(200).json({
      settings: getBufferSettings(account),
      readOnly: false,
    });
  } catch (err) {
    console.error("Queue settings fetch error:", err);
    return res.status(500).json({ msg: "Could not fetch queue settings" });
  }
}

export async function updateQueueSettings(req, res) {
  try {
    if (req.isDemo) {
      return res.status(403).json({ msg: "Demo mode is read-only" });
    }

    const parsed = queueSettingsSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ msg: parsed.error.issues[0].message });
    }

    const account = await Account.findById(req.user);
    if (!account) {
      return res.status(404).json({ msg: "User not found" });
    }

    account.bufferSettings = parsed.data;
    await account.save();

    const flowMap = getQueueFlow(account);
    const waitingItems = await progress.find({
      user: req.user,
      queue: { $in: ["Q1", "Q3"] },
    });

    for (const item of waitingItems) {
      if (!item.queueEnteredAt || flowMap[item.queue]?.type !== "waiting") continue;
      item.autoMoveAt = new Date(
        new Date(item.queueEnteredAt).getTime() + flowMap[item.queue].delay
      );
      await item.save();
    }

    return res.status(200).json({
      msg: "Queue settings updated",
      settings: getBufferSettings(account),
    });
  } catch (err) {
    console.error("Queue settings update error:", err);
    return res.status(500).json({ msg: "Could not update queue settings" });
  }
}


export async function login(req, res) {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ msg: parsed.error.issues[0].message, flag: "error" });
    }
    const { email, password } = parsed.data;

    const user = await Account.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ msg: "User not found try sigining in", flag: "error" });
    }
    if (!user.password) {
      return res.status(400).json({
        msg: "This account uses social login. Continue with Google or GitHub.",
        flag: "error",
      });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.json({ msg: "Incorrect password or email", flag: "error" });
    }

    const token = jwt.sign({ user: user._id }, process.env.SECRET_CODE, {
      expiresIn: "15d",
    });
    res.cookie("token", token, getCookieOptions());

    return res.status(200).json({ msg: "Login successful", flag: "success" });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ msg: "Server error", flag: "error" });
  }
}
