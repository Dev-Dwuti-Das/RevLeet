export default function WaitingQueueQ1({ data }) {
  const safeData = Array.isArray(data) ? data : [];

  const queue_count = safeData.reduce(
    (acc, curr) => {
      if (curr.queue === "Q3") acc.q3++;
      return acc;
    },
    { q3: 0 }
  );

  const q3Items = safeData.filter((item) => item.queue === "Q3");

  return (
    <section className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-[#121625] via-[#121212] to-[#101010] p-4 sm:p-6">
      <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-indigo-500/15 blur-3xl" />

      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-wide">Buffer 2</h2>
          <p className="text-xs text-zinc-400 mt-1">Second waiting checkpoint</p>
        </div>
        <span className="text-xs font-semibold text-indigo-200 bg-indigo-500/15 border border-indigo-400/25 px-3 py-1 rounded-full">
          Waiting Queue
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
        <span className="px-2 py-1 rounded-full border border-white/10 bg-white/5">Buffer 1</span>
        <span>→</span>
        <span className="px-2 py-1 rounded-full border border-white/10 bg-white/5">Warm</span>
        <span>→</span>
        <span className="px-2 py-1 rounded-full border border-indigo-400/30 bg-indigo-500/20 text-indigo-200 font-semibold">Buffer 2</span>
        <span>→</span>
        <span className="px-2 py-1 rounded-full border border-white/10 bg-white/5">Stable</span>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
        <div>
          <p className="text-3xl font-bold text-indigo-300 leading-none">{queue_count.q3}</p>
          <p className="text-xs text-zinc-400 mt-1">questions waiting</p>
        </div>
        <p className="text-xs font-semibold px-3 py-1 rounded-full border border-indigo-400/25 bg-indigo-500/10 text-indigo-200">
          15 days delay
        </p>
      </div>

      <div className="mt-4 space-y-3 max-h-[360px] overflow-y-auto pr-1">
        {q3Items.map((item, idx) => (
          <article
            key={item._id}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 hover:border-indigo-400/35 transition-colors"
          >
            <span className="text-xs text-zinc-500 w-5">{idx + 1}</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-zinc-100 truncate">{item.question.title}</p>
              <div className="mt-1">
                <span
                  className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                    item.question.difficulty === "Hard"
                      ? "bg-red-500/10 text-red-400"
                      : item.question.difficulty === "Medium"
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-green-500/10 text-green-400"
                  }`}
                >
                  {item.question.difficulty}
                </span>
              </div>
            </div>
          </article>
        ))}

        {q3Items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/15 bg-black/20 p-4 text-sm text-zinc-400">
            No questions are currently waiting in Buffer 2.
          </div>
        )}
      </div>
    </section>
  );
}
