export default function AlmostDoneQ() {
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
      <h2 className="text-2xl font-semibold mb-2">Almost done</h2>

      <div className="text-3xl font-bold text-yellow-500 mb-1">No questions</div>
      <p className="text-gray-400 text-sm mb-6">time remaining</p>

      <div className="text-gray-500 text-sm italic">
        empty queue
      </div>
    </div>
  );
}
