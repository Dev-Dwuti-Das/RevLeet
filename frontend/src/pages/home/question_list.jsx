import { useEffect, useState } from "react";
import axios from "axios";

function Question_list() {
  const [question, setquestion] = useState([]);
  const u_id = "6933f00267ebd858ae1963d3";

  async function handletick(q_id) {
    try {
      const res = await axios.post("http://localhost:3000/api/tick", {
        user: u_id,
        question_id: q_id,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/questions", {
          params: { userId: u_id },
        });
        setquestion(res.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div
      className="
        h-173 w-auto overflow-y-auto 
        bg-[#121212]
        rounded-2xl       
        border border-[#1d1d1d]
        p-6 flex flex-col
        shadow-[0_0_25px_rgba(255,255,255,0.04)]
        hover:shadow-[0_0_35px_rgba(255,255,255,0.06)]
        transition-all duration-300
      "
    >
      <h1 className="text-2xl font-semibold text-white mb-4">Question List</h1>

      {question.map((q) => (
        <div
          key={q._id}
          className={`
            p-4 mt-4 rounded-xl 
            border transition-all duration-300
            bg-[#181818]
            ${
              q.isDone
                ? "border-green-500/60 shadow-[0_0_15px_rgba(0,255,0,0.10)]"
                : "border-[#2a2a2a] hover:border-gray-500/40"
            }
          `}
        >
         
          <div className="flex justify-between items-center">
            <div className="text-lg font-bold text-white">{q.title}</div>

            <div
              className={`font-semibold ${
                q.difficulty === "Hard"
                  ? "text-red-400"
                  : q.difficulty === "Medium"
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}
            >
              {q.difficulty}
            </div>
          </div>

          
          <label className="flex items-center gap-3 mt-3 cursor-pointer select-none">
            <input
              type="checkbox"
              defaultChecked={q.isDone}  
              onChange={() => handletick(q._id)} 
              className="
                appearance-none h-5 w-5 rounded-md 
                border border-gray-600 bg-[#1f1f1f]
                checked:bg-green-500 checked:border-green-500
                transition-all duration-200
              "
            />
            <span className="text-gray-300">Mark as done</span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default Question_list;
