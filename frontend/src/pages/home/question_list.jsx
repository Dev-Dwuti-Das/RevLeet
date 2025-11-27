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


  return(
     <div className="h-140 w-128 overflow-y-auto border rounded-lg p-2">
      {question.map((q) => (
        <div className="p-2 border-b" key={q._id}>
          <div>{q.title}</div>
          <div
            className={
              q.difficulty === "Hard"
                ? "text-red-500 font-semibold"
                : q.difficulty === "Medium"
                ? "text-yellow-500"
                : "text-green-500"
            }
          >
            {q.difficulty}
          </div>
        </div>
      ))}
    </div>
  )}

export default Question_list;