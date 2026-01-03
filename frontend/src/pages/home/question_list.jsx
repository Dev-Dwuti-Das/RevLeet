import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./Search";
import FilterMenu from "./filter";

function Question_list() {
  const [question, setquestion] = useState([]);
  const [filtered, setFiltered] = useState([]); //
  const [searchTerm, setSearchTerm] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [tick, settick] = useState(false);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/questions", {
        withCredentials: true,
      });

      setquestion(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  async function handletick(q_id) {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/tick",
        { question_id: q_id },
        { withCredentials: true }
      );
     
      settick((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, [tick]);

  const applyFilters = (search = searchTerm, diff = difficulty) => {
    let updated = [...question];

    if (["Easy", "Medium", "Hard"].includes(diff)) {
      updated = updated.filter((q) => {
        return q.difficulty === diff;
      });
    }

    if (diff === "isdone") {
      updated = updated.filter((q) => q.isDone === true);
    }

    if (diff === "isnotdone") {
      updated = updated.filter((q) => q.isDone === false);
    }

    if (search.trim() !== "") {
      updated = updated.filter((q) =>
        q.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(updated);
  };

  // when search changes
  const handleSearch = (value) => {
    setSearchTerm(value);
    applyFilters(value, difficulty);
  };

  const handleDifficulty = (value) => {
    setDifficulty(value);
    applyFilters(searchTerm, value);
  };

  return (
    <div
      className="
        h-173 w-auto overflow-y-auto 
        bg-[#121212]
        rounded-3xl       
        border border-[#1d1d1d]
        p-6 flex flex-col
        shadow-[0_0_25px_rgba(255,255,255,0.04)]
        hover:shadow-[0_0_35px_rgba(255,255,255,0.06)]
        transition-all duration-300
        overflow-hidden
        z-50
      "
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
        <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-3">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="md:w-auto w-full flex justify-start md:justify-end">
          <FilterMenu onFilterSelect={handleDifficulty} />
        </div>
      </div>
      {/* isdone */}

      {/* No results message */}
      {filtered.length === 0 && (
        <div
          className="
            mt-6 p-6 text-center 
            text-gray-400 
            bg-[#181818] 
            border border-[#2a2a2a] 
            rounded-xl
            text-sm
          "
        >
          Try removing filters, adding more questions soon.
        </div>
      )}

      {/* Render filtered questions */}
      {filtered.map((q) => (
        <div
          key={q._id}
          className={`
            p-4 mt-4 rounded-3xl 
            transition-all duration-300
            bg-[#181818]
            
          `}
        >
          <div className="flex justify-between items-center">
            <div className="text-lg font-bold text-white flex items-center gap-2">
              <span>{q.title}</span>

              {q.link && (
                <a
                  href={q.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 ml-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                    />
                  </svg>
                </a>
              )}
            </div>

            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold
                 ${
                   q.difficulty === "Hard"
                     ? "bg-red-500/10 text-red-400"
                     : q.difficulty === "Medium"
                     ? " bg-yellow-500/10 text-yellow-400"
                     : "bg-green-500/10 text-green-400"
                 }`}
            >
              <div>{q.difficulty}</div>
            </div>
          </div>

          <label className="flex items-center gap-3 mt-3 cursor-pointer select-none">
            {q.isDone === true ? (
              <h2 className="text-green-400 font-semibold text-s">completed</h2>
            ) : (
              <>
                <input
                  type="checkbox"
                  defaultChecked={q.isDone}
                  onChange={() => handletick(q._id)}
                  className="
                appearance-none h-5 w-5 rounded-md 
                border border-gray-500 bg-[#1f1f1f]
                checked:bg-green-500/80 checked:border-green-500
                transition-all duration-200
              "
                />
                <h1 className="font-semibold text-xs">Mark as done</h1>
              </>
            )}
          </label>
        </div>
      ))}
    </div>
  );
}

export default Question_list;
