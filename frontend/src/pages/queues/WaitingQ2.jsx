import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "../../context";

export default function VagueCardQ({ data, ondone }) {
  const { isDemo } = useAuth();
  const safeData = Array.isArray(data) ? data : [];
  const q2Items = safeData.filter((item) => item.queue === "Q2");

  async function handledone(id) {
    if (isDemo) {
      toast.info("Demo mode is read-only");
      return;
    }
    try {
      await axios.post(
        "/api/queuedone",
        { question_id: id },
        { withCredentials: true }
      );
      toast.success("Completed");
      ondone();
    } catch (err) {
      console.log(err);
      toast.error("Could not update question");
    }
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-[#21160f] via-[#121212] to-[#101010] p-6">
      <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-orange-500/15 blur-3xl" />

      <div className="relative flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-wide">Warm</h2>
          <p className="text-xs text-zinc-400 mt-1">Active practice queue</p>
        </div>
        <span className="text-xs font-semibold text-orange-200 bg-orange-500/15 border border-orange-400/25 px-3 py-1 rounded-full">
          Pending Queue
        </span>
      </div>

      <div className="mt-5 flex items-center gap-2 text-xs text-zinc-400">
        <span className="px-2 py-1 rounded-full border border-white/10 bg-white/5">Buffer 1</span>
        <span>→</span>
        <span className="px-2 py-1 rounded-full border border-orange-400/30 bg-orange-500/20 text-orange-200 font-semibold">Warm</span>
        <span>→</span>
        <span className="px-2 py-1 rounded-full border border-white/10 bg-white/5">Buffer 2</span>
        <span>→</span>
        <span className="px-2 py-1 rounded-full border border-white/10 bg-white/5">Stable</span>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
        <div>
          <p className="text-3xl font-bold text-orange-300 leading-none">{q2Items.length}</p>
          <p className="text-xs text-zinc-400 mt-1">questions pending</p>
        </div>
        <p className="text-xs font-semibold px-3 py-1 rounded-full border border-orange-400/25 bg-orange-500/10 text-orange-200">
          Mark done to move
        </p>
      </div>

      <div className="mt-4 space-y-3 max-h-[360px] overflow-y-auto pr-1">
        {q2Items.map((item, idx) => (
          <article
            key={item._id}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 hover:border-orange-400/35 transition-colors"
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
              checked={item.queue !== "Q2"}
              disabled={item.queue !== "Q2" || isDemo}
              onChange={() => handledone(item.question._id)}
              className="appearance-none h-5 w-5 rounded-md border border-gray-500 bg-[#1f1f1f] checked:bg-green-500/80 checked:border-green-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </article>
        ))}

        {q2Items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/15 bg-black/20 p-4 text-sm text-zinc-400">
            No questions are currently in Warm queue.
          </div>
        )}
      </div>
    </section>
  );
}
