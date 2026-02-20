import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import LandingNavbar from "../../components/common/landing_nav";
import { useAuth } from "../../context";
function Login() {
  let navigate = useNavigate();
  const { refreshAuth } = useAuth();
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const submitBtnClass =
    "w-full rounded-full border border-violet-200/30 py-3 font-semibold text-white backdrop-blur-md  transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60 disabled:opacity-60 disabled:cursor-not-allowed";

  async function handlesubmit(e) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await axios.post("/api/login", form, { withCredentials: true });
      res.data.flag === "error"
        ? toast.error(res.data.msg)
        : toast.success(res.data.msg);

      if (res.data.flag === "success") {
        await refreshAuth();
        navigate("/home", { replace: true });
      }
    } catch (err) {
      const msg = err?.response?.data?.msg || "Login failed";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#0b0b0b] text-white">
      <LandingNavbar></LandingNavbar>
      
      <div className="hidden lg:flex flex-col justify-center px-16 relative grid-bg">
        {/* Glow */}
        {/* <div className="absolute top-32 left-32 w-[800px] h-[600px] bg-purple-600/70 blur-[120px] z-0" /> */}

        <h1 className="text-5xl font-bold mb-6">Revleet</h1>

        <p className="text-gray-300 heading-bottom3 max-w-md mb-8 z-1">
          A smarter way to revise DSA problems using
          <span className="text-purple-400 heading-top2  font-semibold z-1">
            {" "}
            spaced repetition
          </span>
          .
        </p>

        <ul className="space-y-4 hero-text2 text-gray-400 font-semibold  z-1">
          <li className="flex items-center gap-3 ">
            <span className="w-2 h-2 rounded-full bg-purple-500 z-1 " />
            Track what you forget, not what you remember
          </li>
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-purple-500 z-1" />
            Questions move through queues automatically
          </li>
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-purple-500 z-1" />
            Built for consistency, not cramming
          </li>
        </ul>
      </div>

      <div className="flex items-center relative justify-center px-4 sm:px-6 py-24 lg:py-8 overflow-hidden">
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a18] via-[#060610] to-black" />

          <div
            className="
            absolute
            w-[72vw] h-[72vw] sm:w-[520px] sm:h-[520px]
            rounded-full
            bg-gradient-to-br from-purple-500 via-indigo-500 to-cyan-400
            blur-[130px]
            opacity-70
            animate-[float-slow_18s_ease-in-out_infinite]
          "
          />

          <div
            className="
            absolute
            w-[56vw] h-[56vw] sm:w-[420px] sm:h-[420px]
            rounded-full
            border border-purple-400/30
            blur-sm
            animate-[float-reverse_22s_ease-in-out_infinite]
          "
          />

          <div
            className="
            absolute
            w-[40vw] h-[40vw] sm:w-[300px] sm:h-[300px]
            rounded-full
            border border-cyan-400/20
            blur-sm
            animate-[float-orbit_40s_linear_infinite]
          "
          />

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[130vw] sm:w-[1200px] h-[240px] sm:h-[300px] bg-purple-600/30 blur-[140px] sm:blur-[160px]" />
        </div>
        
        <div
          className="
          w-full max-w-md
          bg-[#000000]/85
          border border-white/10
          rounded-3xl
          p-6 sm:p-8
          z-20
          
        "
        >
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight heading-bottom2">
              login your account
            </h2>
            <p className="text-gray-400 mt-2 hero-text2 text-sm">
              Start building long-term memory today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handlesubmit} className="space-y-5">
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
              disabled={submitting}
              className={submitBtnClass}
            >
              {submitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400 pe-2">
            don't have an account ?{" "}
            <Link to="/signup" className="!text-purple-500 hover:!text-purple-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
