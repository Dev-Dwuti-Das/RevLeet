import { useState } from "react";

export default function FilterDropdown({ onFilterChange }) {
  const [selected, setSelected] = useState("All");

  const handleChange = (value) => {
    setSelected(value);
    onFilterChange(value);
  };

  return (
    <div className="relative">
      <select
        value={selected}
        onChange={(e) => handleChange(e.target.value)}
        className="
          bg-[#1b1b1b] 
          text-gray-300 
          border border-gray-700/40 
          rounded-xl 
          px-4 py-2 
          text-sm
          focus:outline-none 
          focus:ring-1 
          focus:ring-gray-500
          cursor-pointer
        "
      >
        <option className="bg-[#1b1b1b]" value="All">All</option>
        <option className="bg-[#1b1b1b]" value="Easy">Easy</option>
        <option className="bg-[#1b1b1b]" value="Medium">Medium</option>
        <option className="bg-[#1b1b1b]" value="Hard">Hard</option>
      </select>
    </div>
  );
}
