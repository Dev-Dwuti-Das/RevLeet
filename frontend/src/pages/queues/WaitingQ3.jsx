
export default function WaitingQueueQ2({ data }) {
  const safeData = Array.isArray(data) ? data : [];
  return (
    <div
      className="
        relative
        bg-[#121212]
        rounded-3xl
        border border-[#1f1f1f]
        p-6
        h-100
        
        transition-all duration-300
        hover:shadow-[0_0_30px_rgba(168,85,247,0.12)]
        overflow-y-auto 
        overflow-x-hidden
      "
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-purple-500/70" />

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-white tracking-wide">
          Waiting(3)
        </h2>

        <span
          className="
            text-xs font-semibold
            text-purple-400
            bg-purple-500/10
            px-3 py-1 rounded-full
          "
        >
          Low Priority
        </span>
      </div>

      {/* FLOW INDICATOR */}
      <div className="flex items-center gap-2 mb-4 text-xs text-gray-400">
        <span className="px-2 py-1 bg-[#1f1f1f] rounded-full border border-gray-700/30">
          Question List
        </span>

        <span className="text-purple-400">→</span>

        <span className="px-2 py-1 bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20">
          Waiting
        </span>

        <span className="text-purple-400">→</span>

        <span className="px-2 py-1 bg-[#1f1f1f] rounded-full border border-gray-700/30">
          Vague
        </span>
      </div>

      <div className="mb-5">
        <div className="text-4xl font-bold text-purple-500 leading-tight">
          4
        </div>
      </div>

      <div className="h-px rounded-full w-full bg-gray-700/40 mb-4" />

      <div className="space-y-2">
        {safeData
          .filter((data) => {
            return data.queue === "Q3";
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
        {safeData.filter((item) => item.queue === "Q3").length === 0 && (
          <p className="text-gray-500 italic">Not scheduled yet</p>
        )}
      </div>
    </div>
  );
}
