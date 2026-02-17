import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { loggedIn, loading } = useAuth();
  const navigate = useNavigate();

  // If we are still checking or if they aren't logged in, don't show the Nav
  if (loading || !loggedIn) return null;

  const logout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      <header className="inset-x-0 bg-black">
        <nav className="relative max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="text-white font-bold text-lg">Sentinel</span>

            <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex gap-6 text-white">
              <Link to="/home">Home</Link>
              <Link to="/WorkingQueues">WorkingQ</Link>
              <Link to="/WaitingQueues">WaitingQ</Link>
            </div>

            <div className="flex items-center gap-4 relative">
              <button
                onClick={() => setShowLogoutConfirm(!showLogoutConfirm)}
                className="text-white"
              >
                Logout
              </button>

              {showLogoutConfirm && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-3xl z-50 bg-black border border-white/10 shadow-lg p-3 text-sm">
                  <p className="text-white/80 mb-3 p-1 ms-1 font-bold">Are you sure?</p>
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setShowLogoutConfirm(false)} className="px-3 py-1 me-3 rounded-3xl text-white/70 hover:text-white">
                      Cancel
                    </button>
                    <button onClick={logout} className="px-3 py-1 rounded-3xl bg-red-500/20 text-red-400 hover:bg-red-500/30">
                      Logout
                    </button>
                  </div>
                </div>
              )}

              <button className="lg:hidden text-white text-xl" onClick={() => setOpen(!open)}>
                ☰
              </button>
            </div>
          </div>
        </nav>

        {open && (
          <div className="lg:hidden bg-black border-t border-white/10 px-6 py-4 space-y-3">
            <Link to="/home" className="block text-white">Home</Link>
            <Link to="/WorkingQueues" className="block text-white">WorkingQ</Link>
            <Link to="/WaitingQueues" className="block text-white">WaitingQ</Link>
            <button onClick={() => setShowLogoutConfirm(true)} className="block text-white">
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Mobile logout modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 lg:hidden">
          <div className="bg-black border border-white/10 rounded-xl p-5 w-72">
            <p className="text-white mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowLogoutConfirm(false)} className="text-white/70">Cancel</button>
              <button onClick={logout} className="px-3 py-1 rounded bg-red-500/20 text-red-400">Logout</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
