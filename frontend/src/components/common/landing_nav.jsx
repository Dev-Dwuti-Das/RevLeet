import { useState } from "react";

export default function LandingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30 pointer-events-none">
      <nav className="relative max-w-7xl mx-auto flex items-center px-6 py-4 pointer-events-auto">

        {/* LEFT — Logo */}
        <span className="text-white font-bold">
          Sentinel
        </span>

        {/* CENTER — Section Links */}
        <span
          className="
            absolute left-1/2 -translate-x-1/2
            inline-flex items-center gap-1
            px-2 py-1
            rounded-full
            bg-white/10
            backdrop-blur-md
            border border-white/20
          "
        >
          <a
            href="/landing#about"
            className="
              px-4 py-2 rounded-full
              text-sm text-white/80
              hover:text-white hover:bg-white/15
              transition
            "
          >
            about
          </a>

          <a
            href="/landing#whyrevleet"
            className="
              px-4 py-2 rounded-full
              text-sm text-white/80
              hover:text-white hover:bg-white/15
              transition
            "
          >
            why revleet
          </a>

          <a
            href="/landing#howitworks"
            className="
              px-4 py-2 rounded-full
              text-sm text-white/80
              hover:text-white hover:bg-white/15
              transition
            "
          >
            how it works
          </a>
        </span>

        {/* RIGHT — Auth Dropdown */}
        <span className="relative ml-auto">
          {/* Trigger */}
          <button
            onClick={() => setOpen(!open)}
            className="
              inline-flex items-center gap-1
              px-4 py-2
              rounded-full
              bg-white/10
              backdrop-blur-md
              border border-white/20
              text-sm text-white/80
              hover:text-white hover:bg-white/15
              transition
            "
          >
            Login
            <span className="text-xs">▾</span>
          </button>

          {/* Dropdown */}
          {open && (
            <div
              className="
                absolute right-0 mt-2
                min-w-[160px]
                rounded-xl
                bg-black/20
                backdrop-blur-md
                border border-white/20
                shadow-[0_20px_40px_rgba(0,0,0,0.4)]
                overflow-hidden
                z-50
              "
            >
              <a
                href="/login"
                className="
                  block px-4 py-3
                  text-sm text-white/80
                  hover:text-white hover:bg-white/10
                  transition
                "
              >
                Sign in
              </a>

              <a
                href="/signup"
                className="
                  block px-4 py-3
                  text-sm text-white/80
                  hover:text-white hover:bg-white/10
                  transition
                "
              >
                Sign up
              </a>
            </div>
          )}
        </span>

      </nav>
    </header>
  );
}
