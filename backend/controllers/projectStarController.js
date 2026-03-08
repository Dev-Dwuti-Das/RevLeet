import ProjectStar from "../models/project_star.js";

const PROJECT_KEY = "revleet";
const STAR_CLIENT_COOKIE = "revleet_star_id";

function normalizeClientId(rawClientId) {
  return String(rawClientId || "").trim().slice(0, 128);
}

function generateClientId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 14)}`;
}

function getOrSetStarClientId(req, res) {
  const existing = normalizeClientId(req.cookies?.[STAR_CLIENT_COOKIE]);
  if (existing) {
    return existing;
  }

  const newClientId = generateClientId();
  res.cookie(STAR_CLIENT_COOKIE, newClientId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 365,
    path: "/",
  });
  return newClientId;
}

async function getOrCreateStarDoc() {
  return ProjectStar.findOneAndUpdate(
    { projectKey: PROJECT_KEY },
    {
      $setOnInsert: {
        projectKey: PROJECT_KEY,
        count: 0,
        starredClientIds: [],
      },
    },
    { new: true, upsert: true }
  ).lean();
}

export async function getProjectStars(req, res) {
  try {
    const clientId = getOrSetStarClientId(req, res);
    const starDoc = await getOrCreateStarDoc();

    const count = starDoc?.count || 0;
    const starred = clientId
      ? (starDoc?.starredClientIds || []).includes(clientId)
      : false;

    return res.status(200).json({ count, starred });
  } catch (error) {
    console.error("getProjectStars error:", error);
    return res.status(500).json({ error: "Unable to fetch project stars" });
  }
}

export async function addProjectStar(req, res) {
  try {
    const clientId = getOrSetStarClientId(req, res);
    const current = await getOrCreateStarDoc();

    if ((current?.starredClientIds || []).includes(clientId)) {
      return res.status(200).json({
        count: current?.count || 0,
        starred: true,
      });
    }

    const updated = await ProjectStar.findOneAndUpdate(
      {
        projectKey: PROJECT_KEY,
        starredClientIds: { $ne: clientId },
      },
      {
        $addToSet: { starredClientIds: clientId },
        $inc: { count: 1 },
      },
      { new: true }
    ).lean();

    const finalDoc = updated || (await ProjectStar.findOne({ projectKey: PROJECT_KEY }).lean());

    return res.status(200).json({
      count: finalDoc?.count || 0,
      starred: true,
    });
  } catch (error) {
    if (error?.code === 11000) {
      const existing = await ProjectStar.findOne({ projectKey: PROJECT_KEY }).lean();
      return res.status(200).json({
        count: existing?.count || 0,
        starred: true,
      });
    }

    console.error("addProjectStar error:", error);
    return res.status(500).json({ error: "Unable to add project star" });
  }
}
