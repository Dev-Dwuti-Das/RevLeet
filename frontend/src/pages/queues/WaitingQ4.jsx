export default function WaitingQ4({data}) {
  const safeData = Array.isArray(data) ? data : [];
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
          Medium Priority
        </span>
      </div>

      <div className="mb-5">
        <div className="text-4xl font-bold text-yellow-500 leading-tight">
          2
        </div>
        <p className="text-gray-400 text-sm">
          questions pending
        </p>
      </div>


      <div className="h-px rounded-full w-full bg-gray-700/40 mb-4" />
      <div className="space-y-2">
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
