export default function WaitingQueueQ() {
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
        hover:shadow-[0_0_30px_rgba(168,85,247,0.12)]
      "
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-purple-500/70" />

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-white tracking-wide">
          Waiting
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
        <p className="text-gray-400 text-sm">
          questions queued
        </p>
      </div>

      <div className="h-px rounded-full w-full bg-gray-700/40 mb-4" />

      <div className="space-y-2">
        <div
          className="
            bg-[#1f1f1f]
            px-4 py-2 rounded-xl
            border border-gray-700/30
            text-sm text-gray-400 italic
          "
        >
          Not scheduled yet
        </div>
      </div>
    </div>
  );
}
