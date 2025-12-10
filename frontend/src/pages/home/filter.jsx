import { useEffect, useRef, useState } from "react";

export default function FilterMenu({ onFilterSelect }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const filters = ["All", "Easy", "Medium", "Hard"];

  useEffect(() => {
    const handleClick = (e) => {
      if (!menuRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex items-center gap-2
          bg-[#1b1b1b]
          border border-gray-700/40
          text-gray-300/50
          rounded-3xl
          px-3 py-2
          text-sm font-semibold
          hover:border-gray-400/60
          hover:text-white
          transition-all duration-300
          focus:text-gray-300
        "
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h18M6 10.5h12M10 16.5h4" />
        </svg>
        Filter
      </button>

     
      {open && (
        <div
          className="
            absolute right-0 mt-2 w-40 
            bg-[#1b1b1b] 
            border border-gray-700/40 
            rounded-xl 
            shadow-lg shadow-black/40 
            py-2
            animate-fadeIn
            z-50
          "
        >
          {filters.map((item) => (
            <div
              key={item}
              onClick={() => {
                onFilterSelect(item);
                setOpen(false);
              }}
              className="
                px-4 py-2 
                text-gray-300 text-sm 
                hover:bg-[#262626] 
                hover:text-white
                transition-all 
                cursor-pointer
              "
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
