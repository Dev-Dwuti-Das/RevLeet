import { useEffect, useRef, useState } from "react";

export default function Filter({ onFilterSelect }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(""); // track selected
  const menuRef = useRef(null);

  const filters = [
    { label: "All", color: "text-gray-300" },
    { label: "Easy", color: "text-green-400" },
    { label: "Medium", color: "text-yellow-400" },
    { label: "Hard", color: "text-red-400" },
    { label: "No", color: "text-gray-300" },
    { label: "isdone", color: "text-green-400" },
    { label: "isnotdone", color: "text-red-400" },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const close = (e) => {
      if (!menuRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  // Get color for selected option
  const selectedColor =
    filters.find((f) => f.label === selected)?.color || "text-gray-300";

  return (
    <div className="relative" ref={menuRef}>
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`
          flex items-center gap-2
          bg-[#1b1b1b]
          border border-gray-700/40
          rounded-3xl
          px-3 py-2
          text-sm font-semibold
          hover:border-gray-400/60
          transition-all duration-300
          ${selected === "" ? "text-gray-300/80" : selectedColor}
        `}
      >
        <svg
          className={`w-4 h-4 ${
            selected === "" ? "text-gray-400" : selectedColor
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4.5h18M6 10.5h12M10 16.5h4"
          />
        </svg>

        {selected === "" ? "Filter" : selected}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute right-0 mt-2 w-40 
            bg-[#1b1b1b] 
            border border-gray-700/40 
            rounded-xl 
            shadow-lg shadow-black/40 
            py-2
            z-50
          "
        >
          {filters.map((f, index) => (
            <div
              key={f.label}
              onClick={() => {
                setSelected(f.label === "All" ? "" : f.label);
                onFilterSelect(f.label);
                setOpen(false);
              }}
              className={`
                px-4 py-2 text-sm cursor-pointer
                ${f.color}
                ${f.label === "No"? "border-b border-white/10" : "hover:bg-[#262626] hover:text-white transition-all font-semibold"} 
              `}
            >
              {f.label === "No"? " ":f.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
