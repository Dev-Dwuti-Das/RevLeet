export default function WaitingQueueQ() {
  return (
    <div
      className="
        relative
        bg-[#121212]
        rounded-2xl
        border border-[#1f1f1f]
        p-6
        overflow-hidden
        transition-all duration-300
        hover:shadow-[0_0_30px_rgba(168,85,247,0.12)]
      "
    >
      {/* Left Accent */}
      <div className="absolute left-0 top-0 h-full w-1 bg-purple-500/70" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
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

      {/* Stats */}
      <div className="mb-5">
        <div className="text-4xl font-bold text-purple-500 leading-tight">
          4
        </div>
        <p className="text-gray-400 text-sm">
          questions queued
        </p>
      </div>

      {/* Divider */}
      <div className="h-px rounded-full w-full bg-gray-700/40 mb-4" />

      {/* Empty / Preview */}
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
