import { useEffect, useState } from "react";
import { Star } from "lucide-react";

const STARS_API_URL = "/api/project-stars";
const STAR_API_URL = "/api/project-stars/star";

export default function LandingNavbar() {
  const [open, setOpen] = useState(false);
  const [starCount, setStarCount] = useState(0);
  const [hasStarred, setHasStarred] = useState(false);
  const [isStarring, setIsStarring] = useState(false);
  const navPill =
    "px-4 py-1.5 rounded-full text-sm font-medium tracking-wide heading-top3 transition-all duration-200 text-white/75 border border-transparent hover:text-white hover:bg-white/12 hover:border-white/20";

  useEffect(() => {
    let isMounted = true;

    const loadStars = async () => {
      try {
        const response = await fetch(STARS_API_URL, { credentials: "include" });
        if (!response.ok) return;
        const data = await response.json();
        if (isMounted && typeof data?.count === "number") {
          setStarCount(data.count);
          setHasStarred(Boolean(data.starred));
        }
      } catch (error) {
        // Keep button usable even if counter cannot be fetched.
      }
    };

    loadStars();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleStar = async () => {
    if (hasStarred || isStarring) return;

    setIsStarring(true);
    setHasStarred(true);
    setStarCount((prev) => prev + 1);

    try {
      const response = await fetch(STAR_API_URL, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Failed to star project");
      }

      const data = await response.json();
      setStarCount(typeof data?.count === "number" ? data.count : 0);
      setHasStarred(Boolean(data?.starred));
    } catch (error) {
      setHasStarred(false);
      setStarCount((prev) => Math.max(0, prev - 1));
    } finally {
      setIsStarring(false);
    }
  };

  return (
    <header className="absolute inset-x-0 top-0 z-30 pointer-events-none">
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 py-2 pointer-events-auto">
        
        <div className="flex items-center justify-between">

          {/* LEFT — Logo */}
          <a href="/landing" aria-label="Go to home">
            <img
              src="/logo.png"
              alt="Revleet logo"
              className="tp-0 h-12 sm:h-14 w-auto object-contain"
            />
          </a>

          {/* CENTER — Links */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2">
            {[
              { href: "/landing", label: "Home" },
              { href: "/landing#whyrevleet", label: "Why Revleet" },
              { href: "/landing#howitworks", label: "How it works" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`${navPill} ms-2 whitespace-nowrap`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* RIGHT — Star + Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleStar}
              disabled={isStarring}
              className={`
                inline-flex items-center gap-1
                px-4 py-2
                rounded-full
                border
                text-sm font-medium leading-none
                transition-all duration-200
                disabled:opacity-70
                disabled:cursor-not-allowed
                ${
                  hasStarred
                    ? "border-amber-300/60 text-amber-100 bg-amber-400/20 hover:bg-amber-300/30 hover:border-amber-200/80 hover:text-amber-50 hover:shadow-[0_0_18px_rgba(251,191,36,0.45)]"
                    : "border-white/25 text-white/90 hover:text-amber-100 hover:bg-amber-400/14 hover:border-amber-300/60"
                }
              `}
              aria-label="Star RevLeet"
            >
              <Star size={19} strokeWidth={2.2} />
              <span className="ms-2 mt-0.5 font-medium text-md">{starCount}</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="
                  inline-flex items-center gap-1
                  px-4 py-2
                  rounded-full
                  border border-white/25
                  text-sm font-medium text-white/90
                  hover:text-white hover:bg-white/16 hover:border-white/35
                  transition-all duration-200
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
                    className="block px-4 py-3 text-sm text-white/85 hover:text-white hover:bg-white/12 transition-colors duration-200"
                  >
                    login
                  </a>
                  <a
                    href="/signup"
                    className="block px-4 py-3 text-sm text-white/85 hover:text-white hover:bg-white/12 transition-colors duration-200"
                  >
                    Sign up
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>
      </nav>
    </header>
  );
}
