import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";


function login() {
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/login", form, {withCredentials:true} );
      res.data.flag === "error" ? toast.error(res.data.msg) : toast.success(res.data.msg) 

    } catch (err) {
      toast.error("Wrong email or password")
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#0b0b0b] text-white">

      
      <div className="hidden lg:flex flex-col justify-center px-16 relative overflow-hidden">
        
        {/* Glow */}
        {/* <div className="absolute top-32 left-32 w-[800px] h-[600px] bg-purple-600/70 blur-[120px] z-0" /> */}

        <h1 className="text-5xl font-bold  mb-6">
          Revleet
        </h1>

        <p className="text-xl text-gray-300 font-bold max-w-md mb-8 z-1">
          A smarter way to revise DSA problems using
          <span className="text-purple-400 font-semibold z-1"> spaced repetition</span>.
        </p>

        <ul className="space-y-4 text-gray-400 font-semibold  z-1">
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

      <div className="flex items-center relative justify-center px-6 overflow-hidden">
        
         <div className="absolute top-32 -left-32 w-[800px] h-[600px] bg-purple-600/80 blur-[120px] z-0" />
        <div className="
          w-full max-w-md
          bg-[#121212]
          border border-white/10
          rounded-3xl
          p-8
          z-1
          
        ">

          
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              login your account
            </h2>
            <p className="text-gray-400 mt-2 text-sm">
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
              className="
                w-full rounded-full
                bg-gradient-to-r from-purple-500 to-indigo-600
                py-3 font-semibold
                hover:opacity-90
                hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]
                transition-all duration-300
              "
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            don't have an account?{" "}
            <span className="text-purple-400 hover:text-purple-300 cursor-pointer">
              Signin
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default login;
