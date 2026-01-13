import { useState } from "react";
import { useAuth } from "../../context.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const loggedIn = useAuth();
  console.log(loggedIn)
  console.log("herer", loggedIn);

  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 w-full z-20">
      <nav className="max-w-7xl mx-auto flex justify-between px-6 py-4">

        <span className="text-white font-bold">Sentinel</span>

        {loggedIn && (
          <div className="hidden lg:flex gap-6 text-white">
            <a href="/home">Home</a>
            <a href="/WorkingQueues">WorkingQ</a>
            <a href="/WaitingQueues">WaitingQ</a>
          </div>
        )}

        {!loggedIn ? (
          <a href="/login" className="text-white">Login →</a>
        ) : (
          <button onClick={logout} className="text-white">Logout →</button>
        )}

        <button
          className="lg:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-black px-6 py-4 space-y-3">
          {loggedIn && (
            <>
              <a href="/home" className="block text-white">Home</a>
              <a href="/WorkingQueues" className="block text-white">WorkingQ</a>
              <a href="/WaitingQueues" className="block text-white">WaitingQ</a>
            </>
          )}

          {!loggedIn ? (
            <a href="/login" className="block text-white">Login →</a>
          ) : (
            <button onClick={logout} className="block text-white">Logout →</button>
          )}
        </div>
      )}
    </header>
  );
}
