import Account from "../models/Account.js";
import Progress from "../models/progress.js";

export const DEFAULT_BUFFER_SETTINGS = {
  Q1Days: 1,
  Q3Days: 15,
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function clampDays(value, fallback) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(150, Math.max(1, Math.round(numeric)));
}

function legacySecondsToDays(value, fallback) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return fallback;
  return clampDays(Math.ceil(numeric / (24 * 60 * 60)), fallback);
}

export function getBufferSettings(account) {
  const raw = account?.bufferSettings || {};
  return {
    Q1Days: raw.Q1Days != null
      ? clampDays(raw.Q1Days, DEFAULT_BUFFER_SETTINGS.Q1Days)
      : legacySecondsToDays(raw.Q1Seconds, DEFAULT_BUFFER_SETTINGS.Q1Days),
    Q3Days: raw.Q3Days != null
      ? clampDays(raw.Q3Days, DEFAULT_BUFFER_SETTINGS.Q3Days)
      : legacySecondsToDays(raw.Q3Seconds, DEFAULT_BUFFER_SETTINGS.Q3Days),
  };
}

export function getQueueFlow(account) {
  const settings = getBufferSettings(account);
  return {
    Q1: { type: "waiting", next: "Q2", delay: settings.Q1Days * MS_PER_DAY },
    Q2: { type: "pending", next: "Q3" },
    Q3: { type: "waiting", next: "Q4", delay: settings.Q3Days * MS_PER_DAY },
    Q4: { type: "pending", next: "Q5" },
    Q5: { type: "done" },
  };
}

export const QUEUE_FLOW = getQueueFlow();

export function automoveat(queue, account = null) {
  const flow = getQueueFlow(account)[queue];
  if (!flow || flow.type !== "waiting") return null;
  return new Date(Date.now() + flow.delay);
}

function getDueAtFromEnteredAt(item, account = null) {
  const flow = getQueueFlow(account)[item.queue];
  if (!flow || flow.type !== "waiting") return null;
  if (!item.queueEnteredAt) return null;
  return new Date(new Date(item.queueEnteredAt).getTime() + flow.delay);
}

export async function autoMoveUserQueues(userId) {
  const now = new Date();
  const account = await Account.findById(userId).select("bufferSettings");
  const flowMap = getQueueFlow(account);

  const waitingItems = await Progress.find({
    user: userId,
    queue: { $in: ["Q1", "Q3"] },
  });

  for (const item of waitingItems) {
    const flow = flowMap[item.queue];
    if (!flow || !flow.next) continue;

    const expectedDueAt = getDueAtFromEnteredAt(item, account);
    const currentDueAt = item.autoMoveAt ? new Date(item.autoMoveAt) : null;
    const dueAt = expectedDueAt || currentDueAt;
    if (!dueAt) {
      item.queueEnteredAt = item.queueEnteredAt || now;
      item.autoMoveAt = automoveat(item.queue, account);
      await item.save();
      continue;
    }

    // Keep stored due time in sync when old/stale values exist.
    if (
      expectedDueAt &&
      (!currentDueAt || Math.abs(currentDueAt.getTime() - expectedDueAt.getTime()) > 1000)
    ) {
      item.autoMoveAt = expectedDueAt;
      await item.save();
    }

    if (dueAt > now) continue;

    const prevQueue = item.queue;
    const nextQueue = flow.next;

    item.queue = nextQueue;
    item.queueEnteredAt = now;
    item.autoMoveAt = null;

    await item.save();

    await Account.findByIdAndUpdate(userId, {
      $inc: {
        [`queueCounts.${prevQueue}`]: -1,
        [`queueCounts.${nextQueue}`]: 1,
      },
    });
  }
}

export async function handle_done(req, res) {
  try {
    if (req.isDemo) {
      return res.status(403).json({ msg: "Demo mode is read-only" });
    }

    const { question_id } = req.body;
    const user = req.user;
    const record = await Progress.findOne({
      user,
      question: question_id,
    });

    if (!record) {
      return res.status(404).json({ msg: "Progress not found" });
    }

    const account = await Account.findById(user).select("bufferSettings");
    const flowMap = getQueueFlow(account);
    const flow = flowMap[record.queue];

    if (!flow || flow.type !== "pending") {
      return res.status(400).json({
        msg: "This question cannot be marked done in this queue",
      });
    }

    const prevQueue = record.queue;
    const nextQueue = flow.next;

    record.queue = nextQueue;
    record.queueEnteredAt = new Date();

    if (flowMap[nextQueue]?.type === "waiting") {
      record.autoMoveAt = automoveat(nextQueue, account);
    } else {
      record.autoMoveAt = null;
    }

    await record.save();

    await Account.findByIdAndUpdate(user, {
      $inc: {
        [`queueCounts.${prevQueue}`]: -1,
        [`queueCounts.${nextQueue}`]: 1,
        totalSolved: 1,
      },
    });

    return res.json({
      msg: "Question moved forward",
      progress: record,
    });
  } catch (err) {
    console.error("handleDone error:", err);
    return res.status(500).json({ error: err.message });
  }
}
