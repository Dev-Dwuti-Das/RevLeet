export default function VagueCardQ() {
  return (
    <div
      className="
        bg-[#121212]
        rounded-2xl
        border border-[#1d1d1d]
        p-6
        shadow-[0_0_20px_rgba(255,255,255,0.05)]
        transition-all duration-300
        hover:shadow-[0_0_25px_rgba(255,255,255,0.08)]
      "
    >
      <h2 className="text-2xl font-semibold mb-2">Vague</h2>

      <div className="text-3xl font-bold text-orange-500 mb-1">1 question</div>
      <p className="text-gray-400 text-sm mb-6">time remaining</p>

      <div className="space-y-3">
        <div className="bg-[#262626] py-2 px-4 rounded-xl border border-gray-700/40">
          Binary Search
        </div>
      </div>
    </div>
  );
}
