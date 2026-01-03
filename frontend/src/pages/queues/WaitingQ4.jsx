export default function WaitingQ4({data}) {
  const safeData = Array.isArray(data) ? data : [];
  const queue_count = safeData.reduce(
    (acc, curr) => {
      if (curr.queue === "Q4") acc.q4++;
      return acc;
    },
    { q4: 0 }
  );
  return (
    <div
      className="
        relative
        bg-[#121212]
        rounded-3xl
        border border-[#1f1f1f]
        p-6
        overflow-hidden
        transition-all duration-300
        hover:shadow-[0_0_30px_rgba(250,204,21,0.12)]
      "
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-yellow-500/70" />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white tracking-wide">
          Almost done
        </h2>

        <span
          className="
            text-xs font-semibold
            text-yellow-400
            bg-yellow-500/10
            px-3 py-1 rounded-full
          "
        >
          Pending Queue
        </span>
      </div>

      <div className="flex items-center gap-2 mb-4 mt-5 flex text-xs text-gray-400">
        <span className="px-2 py-1 bg-[#1f1f1f]  font-semibold rounded-full border border-gray-700/30">
          Buffer 1
        </span>

        <span className="text-purple-400">→</span>

        <span className="px-2 py-1 bg-[#1f1f1f] rounded-full border border-gray-700/30">
          Warm
        </span>

        <span className="text-purple-400">→</span>

        <span className="px-2 py-1 bg-[#1f1f1f] rounded-full border border-gray-700/30">
          Buffer 2
        </span>

        <span className="text-purple-400">→</span>

        <span className="px-2 py-1 bg-yellow-500/40 font-semibold rounded-full text-white border border-yellow-700/40">
          Stable
        </span>
      </div>

      <div className="mb-5">
        <div className="text-4xl font-bold text-yellow-500 leading-tight">
          {queue_count.q4}
        </div>
        <p className="text-gray-400 text-sm">
          questions pending
        </p>
      </div>
      


      <div className="h-px rounded-full w-full bg-gray-700/40 mb-4" />
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {safeData
          .filter((data) => {
            return data.queue === "Q4";
          })
          .map((data) => {
            return (
              <div key={data._id}
                className="
              bg-[#1f1f1f]
              px-4 py-2 rounded-xl
              border border-gray-700/30
              text-lg font-semibold text-white
            "
              >
                {data.question.title}
                {data.question.difficulty}
              </div>
            );
          })}
        {safeData.filter((item) => item.queue === "Q4").length === 0 && (
          <p className="text-gray-500 italic">Not scheduled yet</p>
        )}
      </div>
    </div>
  );
}
