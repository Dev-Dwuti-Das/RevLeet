import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "../../context";

export default function WaitingQ4({ data, ondone }) {
  const { isDemo } = useAuth();
  const safeData = Array.isArray(data) ? data : [];
  const q4Items = safeData.filter((item) => item.queue === "Q4");

  async function handledone(id) {
    if (isDemo) {
      toast.warning("Demo mode is read-only");
      return;
    }
    try {
      await axios.post(
        "/api/queuedone",
        { question_id: id },
        { withCredentials: true }
      );
      toast.success("Well done");
      ondone();
    } catch (err) {
      console.log(err);
      toast.error("Could not update question");
    }
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-[#231f12] via-[#121212] to-[#101010] p-4 sm:p-6">
      <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-yellow-500/15 blur-3xl" />

      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-wide">Almost done</h2>
          <p className="text-xs text-zinc-400 mt-1">Final review queue</p>
        </div>
        <span className="text-xs font-semibold text-yellow-200 bg-yellow-500/15 border border-yellow-400/25 px-3 py-1 rounded-full">
          Pending Queue
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
        <span className="px-2 py-1 rounded-full border border-white/10 bg-white/5">Buffer 1</span>
        <span>→</span>
        <span className="px-2 py-1 rounded-full border border-white/10 bg-white/5">Warm</span>
        <span>→</span>
        <span className="px-2 py-1 rounded-full border border-white/10 bg-white/5">Buffer 2</span>
        <span>→</span>
        <span className="px-2 py-1 rounded-full border border-yellow-400/30 bg-yellow-500/20 text-yellow-200 font-semibold">Stable</span>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
        <div>
          <p className="text-3xl font-bold text-yellow-300 leading-none">{q4Items.length}</p>
          <p className="text-xs text-zinc-400 mt-1">questions pending</p>
        </div>
        <p className="text-xs font-semibold px-3 py-1 rounded-full border border-yellow-400/25 bg-yellow-500/10 text-yellow-200">
          Final checkpoint
        </p>
      </div>

      <div className="mt-4 space-y-3 max-h-[360px] overflow-y-auto pr-1">
        {q4Items.map((item, idx) => (
          <article
            key={item._id}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 hover:border-yellow-400/35 transition-colors"
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

            <input
              type="checkbox"
              checked={item.queue !== "Q4"}
              disabled={item.queue !== "Q4"}
              onChange={() => handledone(item.question._id)}
              className="appearance-none h-5 w-5 rounded-md border border-gray-500 bg-[#1f1f1f] checked:bg-green-500/80 checked:border-green-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </article>
        ))}

        {q4Items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/15 bg-black/20 p-4 text-sm text-zinc-400">
            No questions are currently in Almost done queue.
          </div>
        )}
      </div>
    </section>
  );
}
