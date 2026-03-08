import ProjectStar from "../models/project_star.js";
import { randomUUID } from "crypto";

const PROJECT_KEY = "revleet";
const STAR_CLIENT_COOKIE = "revleet_star_id";

function normalizeClientId(rawClientId) {
  return String(rawClientId || "").trim().slice(0, 128);
}

function getOrSetStarClientId(req, res) {
  const existing = normalizeClientId(req.cookies?.[STAR_CLIENT_COOKIE]);
  if (existing) {
    return existing;
  }

  const newClientId = randomUUID();
  res.cookie(STAR_CLIENT_COOKIE, newClientId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  return newClientId;
}

export async function getProjectStars(req, res) {
  try {
    const clientId = getOrSetStarClientId(req, res);
    const starDoc = await ProjectStar.findOne({ projectKey: PROJECT_KEY }).lean();

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

    if (!clientId) {
      return res.status(400).json({ error: "clientId is required" });
    }

    let starDoc = await ProjectStar.findOneAndUpdate(
      {
        projectKey: PROJECT_KEY,
        starredClientIds: { $ne: clientId },
      },
      {
        $setOnInsert: { projectKey: PROJECT_KEY, count: 0 },
        $addToSet: { starredClientIds: clientId },
        $inc: { count: 1 },
      },
      {
        new: true,
        upsert: true,
      }
    ).lean();

    if (!starDoc) {
      starDoc = await ProjectStar.findOne({ projectKey: PROJECT_KEY }).lean();
    }

    return res.status(200).json({
      count: starDoc?.count || 0,
      starred: true,
    });
  } catch (error) {
    console.error("addProjectStar error:", error);
    return res.status(500).json({ error: "Unable to add project star" });
  }
}
