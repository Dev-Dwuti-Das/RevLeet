import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import LandingNavbar from "../../components/common/landing_nav";
import { Github, Linkedin } from "lucide-react";
export default function Landing() {
  const {loggedIn, enterDemo} = useAuth();
  const navigate = useNavigate();
  const buttonBase =
    "inline-flex items-center justify-center rounded-full border font-semibold tracking-wide backdrop-blur-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/60";
  const buttonPrimary =
    `${buttonBase} px-10 py-3.5 text-white bg-white/12 border-white/30 hover:bg-white/18 hover:border-white/45`;
  const buttonSecondary = buttonPrimary;
  const iconButton =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-gray-300 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] transition-all duration-200 hover:scale-105 hover:border-white/40 hover:bg-white/18 hover:text-white";

  if (loggedIn) return <Navigate to="/home" replace />;

  const handleDemoEnter = async () => {
    await enterDemo();
    navigate("/home");
  };
  function FlowPill({ label, tone }) {
    const styles = {
      neutral: "bg-white/5 border-white/15 text-white",
      purple: "bg-purple-500/20 border-purple-400/30 text-purple-300",
      orange: "bg-orange-500/20 border-orange-400/30 text-orange-300",
      yellow: "bg-yellow-500/20 border-yellow-400/30 text-yellow-300",
      green: "bg-green-500/20 border-green-400/30 text-green-300",
    };

    return (
      
      <span
        className={`
        px-5 py-2.5
        rounded-full
        text-sm font-medium
        backdrop-blur-md
        border
        ${styles[tone]}
      `}
      >
        {label}
      </span>
    );
  }

  function QueueCardLeft() {
    return (
      <div
        className="
        min-w-90 rounded-3xl
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        shadow-[0_30px_100px_rgba(0,0,0,0.6)]
        p-6
      "
      >
        
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-medium text-lg">Buffer 1</h3>

          <span
            className="
          px-3 py-1
          rounded-full
          text-xs
          bg-purple-500/20
          text-purple-200/90"
          >
            Waiting Queue
          </span>
        </div>

        <div className="mb-6">
          <span className="text-4xl font-semibold text-purple-500">6</span>
          <p className="text-sm text-gray-400">questions pending</p>
        </div>

        <div className="h-px w-full bg-white/10 mb-4" />

        <div className="space-y-3 max-h-70 pr-1">
          {[
            { title: "Maximum Subarray" },
            { title: "LRU Cache" },
            { title: "Binary Search" },
            { title: "Time Based Key-Value Store" },
            { title: "Merge Intervals" },
          ].map((item, i) => (
            <div
              key={i}
              className="
              flex items-center justify-between
              px-4 py-3
              rounded-xl
              bg-white/5
              border border-white/10
              hover:bg-white/10
              transition
            "
            >
              <div>
                <p className="text-sm text-white me-5">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function QueueCard() {
    return (
      <div
        className="
        w-full max-w-md
        rounded-3xl
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        shadow-[0_30px_100px_rgba(0,0,0,0.6)]
        p-6
      "
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-medium z-1 text-lg">Warm Queue</h3>
          <span className="px-3 py-1 rounded-full text-xs bg-orange-500/20 text-orange-300">
            Pending
          </span>
        </div>

        <div className="mb-4">
          <span className="text-4xl font-semibold text-orange-400">8</span>
          <p className="text-sm text-gray-400">questions pending</p>
        </div>

        <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
          {[
            "Two Sum II – Input Array Is Sorted",
            "Container With Most Water",
            "Clone Graph",
            "Decode Ways",
            "Course Schedule",
          ].map((item, i) => (
            <div
              key={i}
              className="
              flex items-center justify-between
              px-4 py-3
              rounded-xl
              bg-white/5
              border border-white/10
              hover:bg-white/10
              transition duration-50
            "
            >
              <span className="text-sm text-white me-5">{item}</span>
              <input
                type="checkbox"
                className="
                  appearance-none h-5 w-5 rounded-xl
                  border border-gray-500/60 
                  checked:bg-white/20 checked:border-white
                  transition-all duration-200
                "
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05050a] text-white overflow-x-hidden">
      <LandingNavbar></LandingNavbar>
      <section className="relative min-h-screen flex items-center justify-center">
        
        <div
          className="
      absolute
      w-[520px] h-[520px]
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
      w-[420px] h-[420px]
      rounded-full
      border border-purple-400/30
      blur-sm
      animate-[float-reverse_22s_ease-in-out_infinite]
    "
        />

        <div
          className="
      absolute
      w-[300px] h-[300px]
      rounded-full
      border border-cyan-400/20
      blur-sm
      animate-[float-orbit_40s_linear_infinite]
    "
        />

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[300px] bg-purple-600/30 blur-[160px]" />

        <div className="absolute bottom-10 left-30 z-10 hidden lg:block rotate-[-10deg] scale-[1]">
          <QueueCardLeft></QueueCardLeft>
        </div>

        <div className="absolute  bottom-12 right-20 z-10 hidden lg:block rotate-[10deg] opacity-90 scale-[1.5]">
          <QueueCard />
        </div>

        <div className="relative z-20 max-w-4xl text-center px-6">
          <h1 className="text-5xl md:text-7xl tracking-tight leading-tight mb-6 font-inter">
            <span className="block heading-bottom text-white">
              You <span className="heading-top">solved</span> it once.
            </span>

            <span className="block heading-bottom font-semibold text-white">
              Now you <span className="heading-top">remember</span> it.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto hero-text text-gray-300 text-lg md:text-xl mb-12">
            Revleet is a spaced-repetition system for coding problems. It
            schedules revisions so concepts stick for interviews.
          </p>

          <div className="flex justify-center gap-5 flex-wrap">
            <a href="/signup" className={buttonPrimary}>
              Start Revising
            </a>

            <a href="/about" className={buttonSecondary}>
              How it Works
            </a>

            <button type="button" onClick={handleDemoEnter} className={buttonSecondary}>
              Try Demo
            </button>
          </div>
        </div>
      </section>

      <section className="relative py-32 border-none" id="whyrevleet">
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.18),transparent_55%)]" /> */}

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4 heading-bottom1">
            LeetCode helps you{" "}
            <span className="text-violet-500 heading-top1 ">SOLVE</span>.
            <br />
            RevLeet helps you{" "}
            <span className="text-violet-500 heading-top1">REMEMBER</span>.
          </h2>

          <p className="max-w-2xl mx-auto hero-text1 text-gray-400 text-lg mb-20">
            The real problem isn’t difficulty. It’s decay.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="relative group">
              <div
                className="
    absolute inset-0
    bg-purple-500/30
    blur-[90px]
    opacity-0
    group-hover:opacity-100
    transition-opacity
    duration-1000
    delay-120
    ease-out
  "
              />
              <div className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">
                <h3 className="text-lg font-medium text-gray-400 hero-text1 mb-3">
                  No enforced revision
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Problems are solved once, then silently disappear from memory.
                  There’s no system to bring them back.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div
                className="
    absolute inset-0
    bg-purple-500/30
    blur-[90px]
    opacity-0
    group-hover:opacity-100
    transition-opacity
    duration-1000
    delay-120
    ease-out
  "
              />
              <div className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">
                <h3 className="text-lg font-medium text-gray-400 mb-3 hero-text1">
                  Fake sense of progress
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  A high solved count looks impressive until recall fails under
                  interview pressure.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div
                className="
    absolute inset-0
    bg-purple-500/30
    blur-[90px]
    opacity-0
    group-hover:opacity-100
    transition-opacity
    duration-1000
    delay-120
    ease-out
  "
              />
              <div className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">
                <h3 className="text-lg font-medium text-gray-400 hero-text1 mb-3">
                  Mental overhead everywhere
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Notes, reminders, spreadsheets tools meant to help end up
                  becoming the problem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-28 overflow-hidden" id="howitworks">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold heading-bottom text-white mb-6">
            Revleet fixes this with{" "}
            <span className="text-violet-500 heading-top-bold">structure</span>
          </h2>

          <div className="relative flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-10">
            <FlowPill label="Question List" tone="neutral" />
            <Arrow />

            <FlowPill label="Waiting" tone="purple" />
            <Arrow />

            <FlowPill label="Vague" tone="orange" />
            <Arrow />

            <FlowPill label="Almost Done" tone="yellow" />
            <Arrow />

            <FlowPill label="Done" tone="green" />
          </div>

          <p className="max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed">
            Every question moves through queues based on your confidence.
            Waiting stages enforce time gaps — the core principle of
            <span className="text-violet-400"> spaced repetition</span>.
          </p>
        </div>
      </section>

      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#0d0d11]" />
        <div
          className="
      absolute
      w-[520px] h-[520px]
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
      w-[420px] h-[420px]
      rounded-full
      border border-purple-400/30
      blur-sm
      animate-[float-reverse_22s_ease-in-out_infinite]
    "
        />

        <div
          className="
      absolute
      w-[300px] h-[300px]
      rounded-full
      border border-cyan-400/20
      blur-sm
      animate-[float-orbit_40s_linear_infinite]
    "
        />
        <div className="relative max-w-5xl mx-auto text-center rounded-3xl border border-white/10 bg-black/80 backdrop-blur-xl p-10 sm:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50 mb-4">
            Ready When You Are
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold mb-4 heading-bottom text-white">
            Stop grinding.
            <span className="text-purple-400"> Start learning.</span>
          </h2>

          <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
            Revleet turns practice into long-term skill. Small daily wins beat
            last‑minute cramming.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="/signup" className={buttonPrimary}>
              Get Started Free
            </a>
            <a href="/about" className={buttonSecondary}>
              See the method
            </a>
          </div>
        </div>
      </section>

      

<footer className="border-t border-white/10 bg-black/30 backdrop-blur-sm">
  <div className="mx-auto grid w-full max-w-6xl grid-cols-3 items-center px-6 py-2 text-sm text-gray-400">
    
    <div /> {/* empty left spacer */}

    <span className="text-center">
      Built with intent. © {new Date().getFullYear()} Revleet
    </span>

    <div className="flex justify-end gap-6">
      <a
        href="https://github.com/Dev-Dwuti-Das"
        target="_blank"
        rel="noopener noreferrer"
        
      >
        <Github size={18} />
      </a>

      <a
        href="https://www.linkedin.com/in/YOUR-LINKEDIN-USERNAME/"
        target="_blank"
        rel="noopener noreferrer"
        
      >
        <Linkedin size={18} />
      </a>
    </div>

  </div>
</footer>




    </div>
  );
}

function Problem({ text }) {
  return (
    <div className="bg-[#0f0f14] border border-white/5 rounded-2xl p-6">
      {text}
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="bg-[#0f0f14] border border-white/5 rounded-2xl p-6 hover:border-purple-500/40 transition">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}

function Step({ label, color }) {
  const colors = {
    purple: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    orange: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    yellow: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
    green: "bg-green-500/15 text-green-300 border-green-500/30",
  };

  return (
    <span
      className={`px-4 py-2 rounded-full border ${
        colors[color] || "bg-gray-500/10 border-gray-600/30"
      }`}
    >
      {label}
    </span>
  );
}

function Arrow() {
  return <span className="text-purple-400 mt-2">→</span>;
}
