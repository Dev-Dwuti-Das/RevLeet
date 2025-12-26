import Account from "../models/Account.js";
import Progress from "../models/progress.js";

export const QUEUE_FLOW = {
  Q1: { next: "Q2", nextdays: 1 * 60 * 1000},
  Q2: { next: "Q3", nextdays: 1 * 60 * 1000},
  Q3: { next: "Q4", nextdays: 1 * 60 * 1000},
  Q4: { next: "Q5", nextdays: 1 * 60 * 1000},
  Q5: { next: null, nextdays: 1 * 60 * 1000}, 
};


export function automoveat(queue) {
    const Q = QUEUE_FLOW[queue];
    if(!Q || !Q.next) return null;
    return new Date(Date.now() + Q.nextdays);
}

export async function autoMoveUserQueues(userId) {
  const now = new Date();

  const items = await Progress.find({
    user: userId,
    isDone: true,
    autoMoveAt: { $lte: now },
  });

  for (const item of items) {
    let moved = false;

    while (true) {
      const flow = QUEUE_FLOW[item.queue];
      if (!flow || !flow.next) break;

      if (item.autoMoveAt > now) break;

      const prevQueue = item.queue;
      const nextQueue = flow.next;

      item.queue = nextQueue;
      item.queueEnteredAt = new Date(item.autoMoveAt);
      item.autoMoveAt = automoveat(nextQueue);

      await Account.findByIdAndUpdate(userId, {
        $inc: {
          [`queueCounts.${prevQueue}`]: -1,
          [`queueCounts.${nextQueue}`]: 1,
        },
      });

      moved = true;
    }

    if (moved) {
      await item.save();
    }
  }
}
