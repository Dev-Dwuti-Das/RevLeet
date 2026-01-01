import axios from "axios";
export default function VagueCardQ({ data }) {
  const safeData = Array.isArray(data) ? data : [];

  async function handledone(id) {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/queuedone",
        { question_id: id },
        { withCredentials: true }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const queue_count = safeData.reduce(
    (acc, curr) => {
      if (curr.queue === "Q2") acc.q2++;
      return acc;
    },
    { q2: 0 }
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
        hover:shadow-[0_0_30px_rgba(249,115,22,0.12)]
      "
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-orange-500/70" />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white tracking-wide">
          Vague
        </h2>

        <span
          className="
            text-xs font-semibold
            text-orange-400
            bg-orange-500/10
            px-3 py-1 rounded-full
          "
        >
          Medium Priority
        </span>
      </div>

      <div className="mb-5">
        <div className="text-4xl font-bold text-orange-500 leading-tight">
          {queue_count.q2}
        </div>
        <p className="text-gray-400 text-sm">questions pending</p>
      </div>
      <div className="space-y-2">
        {safeData
          .filter((data) => {
            return data.queue === "Q2";
          })
          .map((data) => {
            return (
              <div
                key={data._id}
                className="
              bg-[#1f1f1f]
              px-4 py-2 rounded-xl
              border border-gray-700/30
              text-lg font-semibold text-white
            "
              >
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                 ${
                   data.question.difficulty === "Hard"
                     ? "bg-red-500/10 text-red-400"
                     : data.question.difficulty === "Medium"
                     ? " bg-yellow-500/10 text-yellow-400"
                     : "bg-green-500/10 text-green-400"
                 }`}
                >
                  <div>{data.question.difficulty}</div>
                </div>

                {data.question.title}
                {data.question.difficulty}
                <input
                  type="checkbox"
                  checked={data.queue !== "Q2"}
                  disabled={data.queue !== "Q2"}
                  onChange={() => handledone(data.question._id)}
                  className="
                appearance-none h-5 w-5 rounded-md 
                border border-gray-500 bg-[#1f1f1f]
                checked:bg-green-500/80 checked:border-green-500
                transition-all duration-200
              "
                />
              </div>
            );
          })}
        {safeData.filter((item) => item.queue === "Q2").length === 0 && (
          <p className="text-gray-500 italic">Not scheduled yet</p>
        )}
      </div>

      <div className="h-px rounded-full w-full bg-gray-700/40 mb-4" />
    </div>
  );
}
