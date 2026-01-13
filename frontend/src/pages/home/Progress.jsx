export default function ProgressSummary({ data }) {
  const safeData = Array.isArray(data) ? data : [];

  const queue_count = safeData.reduce(
    (acc, curr) => {
      if (curr.queue === "Q1") acc.q1++;
      if (curr.queue === "Q2") acc.q2++;
      if (curr.queue === "Q3") acc.q3++;
      if (curr.queue === "Q4") acc.q4++;
      if (curr.queue === "Q5") acc.q5++;
      return acc;
    },
    { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0 }
  );

  const total =
    queue_count.q1 +
    queue_count.q2 +
    queue_count.q3 +
    queue_count.q4 +
    queue_count.q5;

  const inProgress = total - queue_count.q5;

  // streak (if passed as object later)
  const streak = data?.streak ?? 0;

  return (
    <div
      className="
        bg-gradient-to-br from-[#0f0f0f] to-[#181818]
        border border-white/5
        rounded-3xl
        p-6
        shadow-[0_20px_50px_rgba(0,0,0,0.6)]
        backdrop-blur-xl
        h-full
      "
    >
      <h3 className="text-white font-semibold text-lg mb-4">
        Progress Summary
      </h3>

      <div className="grid grid-cols-3 gap-4 text-center mb-6">
        <div className="bg-white/3 rounded-3xl p-4">
          <p className="text-3xl font-bold text-white">{total}</p>
          <p className="text-xs font-semibold text-orange-400/75 mt-1">Solved</p>
        </div>

        <div className="bg-white/3 rounded-3xl p-4">
          <p className="text-3xl font-bold text-white">{inProgress}</p>
          <p className="text-xs font-semibold text-yellow-400/75 mt-1">In Progress</p>
        </div>

        <div className="bg-white/3 rounded-3xl p-4">
          <p className="text-3xl font-bold text-white">{queue_count.q5}</p>
          <p className="text-xs font-semibold text-green-400/75 mt-1">Mastered</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 rounded-3xl py-3 px-4 bg-white/3">
  <span className="text-lg leading-none">🔥</span>

  <span
    className={`text-sm font-medium ${
      streak > 0 ? "text-orange-400" : "text-gray-400"
    }`}
  >
    {streak > 0 ? `${streak} day streak` : "No streak yet"}
  </span>
</div>

    </div>
  );
}
