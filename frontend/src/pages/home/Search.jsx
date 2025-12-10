
export default function SearchBar() {
  return (
    <div className="w-full">
      <div
        className="
          flex items-center 
          bg-[#1b1b1b] 
          border border-gray-700/40 
          rounded-4xl 
          ps-5 py-1 pe-1 
          transition-all duration-300
          hover:border-white/30
        "
      >
          

        {/* Input */}
        <input
          type="text"
          placeholder="Search…"
          className="
            w-full 
            bg-transparent 
            outline-none 
            text-white 
            placeholder-gray-500 
            text-base
            
          "
        />

        {/* ENTER Button */}
        <button
          className="
            bg-[#262626]
            border border-gray-700/50
            px-3 py-2
            rounded-3xl
            text-gray-300 
            text-md
            font-semibold
            hover:bg-[]
            hover:text-white
            hover:border-white/30
            transition-all duration-200
            shadow-inner
          "
        >
          <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
        </button>
      </div>
    </div>
  );
}
