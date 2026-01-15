import { useState } from "react";
import { useAuth } from "../../context.jsx";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const loggedIn = useAuth();

  // ❌ No navbar when not logged in
  if (!loggedIn) return <Outlet />;

  const logout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      window.location.replace("/"); // hard redirect OK for logout
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      <header className="sticky top-0 w-full z-30 bg-black">
        <nav className="relative max-w-7xl mx-auto flex items-center px-6 py-4">

          {/* LEFT */}
          <span className="text-white font-bold">Sentinel</span>

          {/* CENTER */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex gap-6 text-white">
            <Link to="/home">Home</Link>
            <Link to="/WorkingQueues">WorkingQ</Link>
            <Link to="/WaitingQueues">WaitingQ</Link>
          </div>

          {/* RIGHT */}
          <div className="ml-auto flex items-center gap-4">
            <button onClick={logout} className="text-white">
              Logout →
            </button>

            <button
              className="lg:hidden text-white"
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>
          </div>
        </nav>

        {open && (
          <div className="lg:hidden bg-black px-6 py-4 space-y-3">
            <Link to="/home" className="block text-white">Home</Link>
            <Link to="/WorkingQueues" className="block text-white">WorkingQ</Link>
            <Link to="/WaitingQueues" className="block text-white">WaitingQ</Link>
            <button onClick={logout} className="block text-white">
              Logout →
            </button>
          </div>
        )}
      </header>

      <Outlet />
    </>
  );
}
