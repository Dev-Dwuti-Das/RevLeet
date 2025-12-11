import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./Search";
import FilterMenu from "./filter";

function Question_list() {
  const [question, setquestion] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficulty, setDifficulty] = useState("All");

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
        setFiltered(res.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };

    fetchQuestions();
  }, []);

  // 🔥 Main filter logic (search + difficulty)
  const applyFilters = (search = searchTerm, diff = difficulty) => {
    let updated = [...question];

    // difficulty filter
    if (diff !== "All") {
      updated = updated.filter((q) => q.difficulty === diff);
    }

    // search filter
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

  // when filter menu selects difficulty
  const handleDifficulty = (value) => {
    setDifficulty(value);
    applyFilters(searchTerm, value);
  };

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
        z-50
      "
    >
      {/* Header Row: Search + Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
        <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-3">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="md:w-auto w-full flex justify-start md:justify-end">
          <FilterMenu onFilterSelect={handleDifficulty} />
        </div>
      </div>

      {/* Render filtered questions */}
      {filtered.map((q) => (
        <div
          key={q._id}
          className={`
            p-4 mt-4 rounded-xl 
            border transition-all duration-300
            bg-[#181818]
            ${
              q.isDone
                ? "border-green-500/60"
                : "border-[#2a2a2a] hover:border-gray-500/40"
            }
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
