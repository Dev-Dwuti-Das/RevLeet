import Account from "../models/Account.js";
import Progress from "../models/progress.js";

export const QUEUE_FLOW = {
  Q1: { type: "waiting", next: "Q2", delay: 12 * 60 * 60 * 1000 },
  Q2: { type: "pending", next: "Q3" },
  Q3: { type: "waiting", next: "Q4", delay: 12 * 60 * 60 * 1000 },
  Q4: { type: "pending", next: "Q5" },
  Q5: { type: "done" },
};

export function automoveat(queue) {
  const flow = QUEUE_FLOW[queue];
  if (!flow || flow.type !== "waiting") return null;
  return new Date(Date.now() + flow.delay);
}

export async function autoMoveUserQueues(userId) {
  const now = new Date();

  const expired = await Progress.find({
    user: userId,
    queue: { $in: ["Q1", "Q3"] },
    autoMoveAt: { $lte: now },
  });

  for (const item of expired) {
    const flow = QUEUE_FLOW[item.queue];
    if (!flow || !flow.next) continue;

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
    const { question_id } = req.body;
    const user = req.user;
    const record = await Progress.findOne({
      user,
      question: question_id,
    });

    if (!record) {
      return res.status(404).json({ msg: "Progress not found" });
    }

    const flow = QUEUE_FLOW[record.queue];

    if (!flow || flow.type !== "pending") {
      return res.status(400).json({
        msg: "This question cannot be marked done in this queue",
      });
    }

    const prevQueue = record.queue;
    const nextQueue = flow.next;

    record.queue = nextQueue;
    record.queueEnteredAt = new Date();

    if (QUEUE_FLOW[nextQueue]?.type === "waiting") {
      record.autoMoveAt = automoveat(nextQueue);
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
