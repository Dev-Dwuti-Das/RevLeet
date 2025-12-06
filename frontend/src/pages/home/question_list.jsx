import { useEffect, useState } from "react";
import axios from "axios";

function Question_list() {
  const [question, setquestion] = useState([]);
  const [greenbox, setgreenbox] = useState(false);
  const [checked, setchecked] = useState(false);
   const u_id = "6933f00267ebd858ae1963d3"

  async function handletick(q_id) {
    try {
      const u_id = "6933f00267ebd858ae1963d3";
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
        const res = await axios.get("http://localhost:3000/api/questions", { params: {userId: u_id}});
        setquestion(res.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div
      className="h-160 w-128 overflow-y-auto bg-[#1b1b1b] rounded-2xl border border-gray-300/30
                p-4 flex flex-col 
                shadow-lg shadow-black/30
                hover:shadow-xl hover:shadow-black/50 
                transition-all duration-300"
    >
      <h1 className="text-4xl font-bold text-white-500/75">Quesiton list</h1>
      {question.map((q) => (
        <div
          key={q._id}
          className={`
            p-3 rounded-2xl mt-3 transition-all duration-300
            ${q.isDone ? "border border-2 border-green-500/60" : "border border-gray-300/30"}
          `}
        >
          <div className="text-xl font-bold">{q.title}</div>
          <div
            className={`font-semibold ${
              q.difficulty === "Hard"
                ? "text-red-500"
                : q.difficulty === "Medium"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            {q.difficulty}
          </div>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              onChange={() => {
                handletick(q._id);
              }}
              type="checkbox"
              className="
              appearance-none h-5 w-5 rounded-md 
              border border-gray-600 bg-[#1f1f1f]
              checked:bg-green-500 checked:border-green-500
              transition-all duration-200"
            />

            <span className="text-gray-200">Done</span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default Question_list;
