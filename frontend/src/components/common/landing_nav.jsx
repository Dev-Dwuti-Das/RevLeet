import { useState } from "react";

export default function LandingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30 pointer-events-none">
      <nav className="relative max-w-7xl mx-auto px-6 py-4 pointer-events-auto">
        
        <div className="flex items-center justify-between">

          {/* LEFT — Logo */}
          <span className="text-white font-bold text-lg">
            Sentinel
          </span>

          {/* CENTER — Links */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            {[
              { href: "/landing", label: "Home" },
              { href: "/landing#whyrevleet", label: "Why Revleet" },
              { href: "/landing#howitworks", label: "How it works" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="
                  px-4 py-1.5 rounded-full
                  ms-2
                  text-sm font-medium tracking-wide
                  heading-top3
                  text-white/70
                  transition-all duration-300 ease-out
                  hover:text-white
                  hover:bg-white/15
                "
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* RIGHT — Auth */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="
                inline-flex items-center gap-1
                px-5 py-2
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
            </button>

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
                  heading-bottom4
                  overflow-hidden
                  z-50
                "
              >
                <a
                  href="/login"
                  className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 transition"
                >
                  login
                </a>
                <a
                  href="/signup"
                  className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 transition"
                >
                  Sign up
                </a>
              </div>
            )}
          </div>

        </div>
      </nav>
    </header>
  );
}
