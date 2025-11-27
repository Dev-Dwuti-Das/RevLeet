import React from "react";
import { useEffect, useState } from "react";

function Question_list() {
  const [question, setquestion] = useState([]);

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
    <div className="h-140 flex-row overflow-y-auto border rounded-lg p-4
    [scrollbar-width:thin]
    [scrollbar-color:#555_#111]">
  {question.map((q) => (
    <div 
      key={q._id}
      className="p-3 border-b transition flex flex-col gap-1"
    >
      {/* Question Number + Title */}
      <div className="flex items-center gap-2">
        <span className="text-white-600 font-semibold">
          Q{q.questionNumber}
        </span>
        <span className="font-medium text-white-400">
          {q.title}
        </span>
      </div>

      {/* Difficulty */}
      <span
        className={
          q.difficulty === "Hard"
            ? "text-red-500 font-semibold"
            : q.difficulty === "Medium"
            ? "text-yellow-500 font-semibold"
            : "text-green-500 font-semibold"
        }
      >
        {q.difficulty}
      </span>
    </div>
  ))}
</div>
  );
}

export default Question_list;
