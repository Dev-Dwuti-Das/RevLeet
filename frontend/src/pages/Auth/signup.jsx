import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/signup",
        form,
        { withCredentials: true }
      );

      res.data.flag === "error"
        ? toast.error(res.data.msg, {
            style: { color: "#ff2c2cec", fontWeight: 700 },
          })
        : toast.success(res.data.msg, {
            style: { color: "#56ff67ec" },
          });
    } catch (err) {
      toast.error("Server error", {
        style: { color: "#ff2c2cec", fontWeight: 700 },
      });
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#0b0b0b] text-white">
     

      {/* LEFT SIDE — SAME AS LOGIN */}
      <div className="hidden lg:flex flex-col justify-center px-16 relative grid-bg">
        <h1 className="text-5xl font-bold mb-6">Revleet</h1>

        <p className="text-gray-300 heading-bottom3 max-w-md mb-8">
          A smarter way to revise DSA problems using
          <span className="text-purple-400 heading-top2 font-semibold">
            {" "}
            spaced repetition
          </span>
          .
        </p>

        <ul className="space-y-4 hero-text2 text-gray-400 font-semibold">
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            Track what you forget, not what you remember
          </li>
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            Questions move through queues automatically
          </li>
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            Built for consistency, not cramming
          </li>
        </ul>
      </div>

      {/* RIGHT SIDE — SAME BACKGROUND + BLOBS */}
      <div className="flex items-center relative justify-center px-6 overflow-hidden">

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a18] via-[#060610] to-black" />

          <div className="absolute left-[200px] top-[10%] w-[600px] h-[600px] rounded-full bg-purple-500/50 blur-[140px] animate-[float-slow_20s_ease-in-out_infinite]" />

          <div className="absolute right-[20px] top-[35%] w-[200px] h-[200px] rounded-full bg-indigo-500/50 blur-[180px] animate-[float-reverse_26s_ease-in-out_infinite]" />

          <div className="absolute left-1/2 bottom-[-200px] -translate-x-1/2 w-[900px] h-[300px] bg-purple-600/30 blur-[180px]" />
        </div>

        {/* GLASS CARD — SAME AS LOGIN */}
        <div
          className="
            relative z-10
            w-full max-w-md
            bg-[#121212]
            border border-white/10
            rounded-3xl
            p-8
          "
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight heading-bottom2">
              Create your account
            </h2>
            <p className="text-gray-400 mt-2 hero-text2 text-sm">
              Start building long-term memory today
            </p>
          </div>

          <form onSubmit={handlesubmit} className="space-y-5">

            <input
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setform({ ...form, name: e.target.value })}
              className="
                w-full rounded-xl bg-[#1b1b1b]
                border border-gray-700/50
                px-4 py-3 text-white
                placeholder-gray-500
                focus:border-purple-500
                focus:ring-2 focus:ring-purple-500/30
                outline-none transition
              "
            />

            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setform({ ...form, email: e.target.value })}
              className="
                w-full rounded-xl bg-[#1b1b1b]
                border border-gray-700/50
                px-4 py-3 text-white
                placeholder-gray-500
                focus:border-purple-500
                focus:ring-2 focus:ring-purple-500/30
                outline-none transition
              "
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setform({ ...form, password: e.target.value })}
              className="
                w-full rounded-xl bg-[#1b1b1b]
                border border-gray-700/50
                px-4 py-3 text-white
                placeholder-gray-500
                focus:border-purple-500
                focus:ring-2 focus:ring-purple-500/30
                outline-none transition
              "
            />

            <button
              type="submit"
              className="
                w-full rounded-full
                bg-gradient-to-r from-purple-500 to-indigo-600
                py-3 font-semibold
                hover:opacity-90
                hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]
                transition-all duration-300
              "
            >
              Sign up
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <span className="text-purple-400 hover:text-purple-300 cursor-pointer">
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
