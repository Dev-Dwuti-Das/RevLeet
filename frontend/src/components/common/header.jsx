import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#000000d]/80 backdrop-blur-md  border-white/10  z-50">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="h-8 w-auto"
          />
          <span className="text-white font-semibold tracking-wide text-xl">
            Sentinel
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          <a
            href="/home"
            className="text-gray-300 hover:text-white transition text-lg font-extrabold"
          >
            Home
          </a>
          <a
            href="/WorkingQueues"
            className="text-gray-300 hover:text-white transition text-xl font-extrabold"
          >
            WorkingQ
          </a>
          <a
            href="/WaitingQueues"
            className="text-gray-300 hover:text-white transition text-xl font-extrabold"
          >
            WaitingQ
          </a>
        </div>

        {/* Login Button */}
        <div className="hidden lg:flex">
          <a
            href="#"
            className="text-gray-300 hover:text-white transition text-sm font-medium"
          >
            Login →
          </a>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-gray-300 hover:text-white transition"
        >
          <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-[#111]/95 border-t border-white/10 px-6 pb-6 space-y-4">
          <a
            href="/home"
            className="block text-gray-300 hover:text-white text-base py-2"
          >
            Home
          </a>
          <a
            href="/Queues"
            className="block text-gray-300 hover:text-white text-base py-2"
          >
            Queues
          </a>
          <a
            href="#"
            className="block text-gray-300 hover:text-white text-base py-2"
          >
            Something
          </a>

          <a
            href="#"
            className="block text-gray-300 hover:text-white text-base pt-4"
          >
            Login →
          </a>
        </div>
      )}
    </header>
  );
}
