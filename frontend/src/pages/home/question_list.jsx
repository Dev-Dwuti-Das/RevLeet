import { useEffect, useState } from "react";

function Question_list() {
  const [question, setquestion] = useState([]);
  const [greenbox, setgreenbox] = useState(false);
  const [checked, setchecked] = useState(false);

  async function handletick(id){



  }

  useEffect(() => {
    fetch("http://localhost:3000/api/questions").then((data) =>
      data
        .json()
        .then((data) => setquestion(data))
        .catch((err) => {
          msg: "error in fetching the data";
        })
    );
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
          className="p-3 border border-gray-300/30 rounded-2xl mt-3"
          key={q._id}
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
              onChange={() => {handletick(q._id)}}
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
