import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="
        fixed top-0 left-0 w-full
        z-50
        bg-black/0
      "
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="h-8 w-auto"
            alt="logo"
          />
          <span className="text-white font-semibold tracking-tight text-xl">
            Sentinel
          </span>
        </div>

        <span className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full border border-gray-500/30 backdrop-blur-sm bg-black-500/10 text-whit/70 text-sm">
          <div className="hidden lg:flex items-center gap-10">
            {[
              ["Home", "/home"],
              ["WorkingQ", "/WorkingQueues"],
              ["WaitingQ", "/WaitingQueues"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="
                text-white
                transition
                text-md
                font-semibold
                relative    
              "
              >
                {label}
              </a>
            ))}
          </div>
        </span>

        {/* Login */}
        <div className="hidden lg:flex">
          <a href="#" className="text-sm font-medium text-white transition">
            Login →
          </a>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white transition"
        >
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div
          className="
            lg:hidden
            bg-black/70
            backdrop-blur-xl
            border-t border-white/10
            px-6 pb-6
            space-y-4
          "
        >
          <a href="/home" className="block text-white py-2">
            Home
          </a>
          <a href="/WorkingQueues" className="block text-white py-2">
            WorkingQ
          </a>
          <a href="/WaitingQueues" className="block text-white py-2">
            WaitingQ
          </a>

          <a href="#" className="block text-white pt-4">
            Login →
          </a>
        </div>
      )}
    </header>
  );
}
