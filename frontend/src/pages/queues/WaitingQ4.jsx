import axios from "axios";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export default function WaitingQ4({ data, ondone }) {
  const safeData = Array.isArray(data) ? data : [];
  const [tick, settick] = useState(false);

  useEffect(() => {}, [tick]);

  async function handledone(id) {
    try {
      await axios.post(
        "http://localhost:3000/api/queuedone",
        { question_id: id },
        { withCredentials: true }
      );
      toast.success("well done");
      ondone();
      settick((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

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

      
      <div className="flex items-center gap-2 mb-4 mt-5 text-xs text-gray-400">
        <span className="px-2 py-1 bg-[#1f1f1f] font-semibold rounded-full border border-gray-700/30">
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
        <p className="text-gray-400 text-sm">questions pending</p>
      </div>

    
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {safeData
          .filter((item) => item.queue === "Q4")
          .map((item) => (
            <div
              key={item._id}
              className="
                group
                flex items-center justify-between
                gap-4
                bg-[#161616]
                px-4 py-3
                rounded-2xl
                border border-gray-700/30
                text-white
                transition-all duration-200
                hover:border-yellow-500/40
                hover:bg-[#1b1b1b]
              "
            >
        
              <div className="flex flex-col gap-1 min-w-0">
                <span
                  className={`w-fit px-2.5 py-0.5 rounded-full text-[11px] font-semibold
                    ${
                      item.question.difficulty === "Hard"
                        ? "bg-red-500/10 text-red-400"
                        : item.question.difficulty === "Medium"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-green-500/10 text-green-400"
                    }`}
                >
                  {item.question.difficulty}
                </span>

                <p className="text-sm font-medium text-gray-200 truncate">
                  {item.question.title}
                </p>
              </div>


              <input
                type="checkbox"
                checked={item.queue !== "Q4"}
                disabled={item.queue !== "Q4"}
                onChange={() => handledone(item.question._id)}
                className="
                  appearance-none h-5 w-5 rounded-md
                  border border-gray-500 bg-[#1f1f1f]
                  checked:bg-green-500/80 checked:border-green-500
                  transition-all duration-200
                "
              />
            </div>
          ))}

        {safeData.filter((item) => item.queue === "Q4").length === 0 && (
          <p className="text-gray-500 italic text-sm">
            Not scheduled yet
          </p>
        )}
      </div>
    </div>
  );
}
