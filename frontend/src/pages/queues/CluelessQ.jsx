export default function CluelessQ() {
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
        hover:shadow-[0_0_30px_rgba(239,68,68,0.12)]
      "
    >
      {/* Left Accent */}
      <div className="absolute left-0 top-0 h-full w-1 bg-red-500/70" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white tracking-wide">
          Clueless
        </h2>

        <span className="
          text-xs font-semibold
          text-red-400
          bg-red-500/10
          px-3 py-1 rounded-full
        ">
          High Priority
        </span>
      </div>

      {/* Stats */}
      <div className="mb-5">
        <div className="text-4xl font-bold text-red-500 leading-tight">
          2
        </div>
        <p className="text-gray-400 text-sm">
          questions pending
        </p>
      </div>

      {/* Divider */}
      <div className="h-px rounded-full w-full bg-gray-700/40 mb-4"/>

      {/* Question Preview */}
      <div className="space-y-2">
        <div
          className="
            flex items-center justify-between
            bg-[#1f1f1f]
            px-4 py-2 rounded-xl
            border border-gray-700/30
            text-sm text-gray-200
          "
        >
          Two Sum
          <span className="text-xs text-gray-500">Easy</span>
        </div>

        <div
          className="
            flex items-center justify-between
            bg-[#1f1f1f]
            px-4 py-2 rounded-xl
            border border-gray-700/30
            text-sm text-gray-200
          "
        >
          Reverse Linked List
          <span className="text-xs text-gray-500">Medium</span>
        </div>
      </div>
    </div>
  );
}
