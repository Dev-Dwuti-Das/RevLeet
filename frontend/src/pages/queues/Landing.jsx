import landing_page_asset1 from "../../assets/landing_page_asset1.png";
export default function Landing() {
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

        <div className="space-y-3 max-h-[280px] pr-1">
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

        {/* Count */}
        <div className="mb-4">
          <span className="text-4xl font-semibold text-orange-400">8</span>
          <p className="text-sm text-gray-400">questions pending</p>
        </div>

        {/* List */}
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a18] via-[#060610] to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.25),transparent_60%)]" />

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
            intelligently schedules revisions so concepts stick for interviews.
          </p>

          <div className="flex justify-center gap-5">
            <a
              href="/home"
              className="
          inline-flex items-center justify-center
          px-10 py-3
          rounded-full
          font-medium
          text-white
          bg-white/15
          backdrop-blur-xl
          transition
          hover:bg-white/20
        "
            >
              Start Revising
            </a>

            <a
              href="/about"
              className="
          inline-flex items-center justify-center
          px-10 py-3.5
          rounded-full
          font-medium
          text-white/90
          bg-white/10
          backdrop-blur-md
          border border-white/25
          shadow-[0_20px_60px_rgba(0,0,0,0.6)]
          transition
          hover:bg-white/15
        "
            >
              How it Works
            </a>
          </div>
        </div>
      </section>

      <section className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center px-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="
      w-[700px] h-[350px]
      rounded-full
      bg-violet-500/40
      blur-[160px]
      opacity-80
    "
          />
        </div>

        <div className="relative z-10 max-w-3xl text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white">
            Think better with <span className="text-violet-400">Revleet</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Never forget a problem. Never relearn the same concept twice.
          </p>
        </div>

        {/* === GLASS PRODUCT CARD === */}
      </section>

      <section className="max-w-6xl mx-auto px-6 py-28">
        <h2 className="text-3xl md:text-4xl font-semibold mb-10">
          The real problem with LeetCode
        </h2>

        <img
          src={landing_page_asset1}
          style={{ height: 500, width: 425 }}
        ></img>

        <div className="grid md:grid-cols-3 gap-6 text-gray-400">
          <Problem text="You solve a question once and never see it again." />
          <Problem text="You revisit problems randomly with no structure." />
          <Problem text="You forget patterns right when it matters most." />
        </div>
      </section>

      <section className="bg-[#0d0d11] py-28">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-14">
            Revleet fixes this with structure
          </h2>

          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-300 mb-10">
            <Step label="Question List" />
            <Arrow />
            <Step label="Waiting" color="purple" />
            <Arrow />
            <Step label="Vague" color="orange" />
            <Arrow />
            <Step label="Almost Done" color="yellow" />
            <Arrow />
            <Step label="Done" color="green" />
          </div>

          <p className="text-center max-w-3xl mx-auto text-gray-400">
            Every question moves through queues based on your confidence.
            Waiting stages enforce time gaps — the core principle of
            <span className="text-purple-400"> spaced repetition</span>.
          </p>
        </div>
      </section>

      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16">
            Built for serious preparation
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              title="Automatic Revision Timing"
              desc="You don’t decide when to revise. The system does — based on memory science."
            />
            <Feature
              title="Visible Progress"
              desc="At any moment, you know exactly what you’re weak at and what’s mastered."
            />
            <Feature
              title="Low Mental Overhead"
              desc="No spreadsheets. No reminders. Just solve, revise, move on."
            />
          </div>
        </div>
      </section>

      <section className="bg-[#0d0d11] py-32 text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Stop grinding.
          <span className="text-purple-400"> Start learning.</span>
        </h2>

        <p className="text-gray-400 mb-10 max-w-xl mx-auto">
          Revleet turns practice into long-term skill.
        </p>

        <a
          href="/home"
          className="
            bg-purple-500 hover:bg-purple-600
            px-10 py-4 rounded-full
            font-bold
            text-white text-xl
            shadow-[0_0_40px_rgba(168,85,247,0.45)]
            transition
          "
        >
          Get Started Free
        </a>
      </section>

      <footer className="border-t border-white/5 py-6 text-center text-gray-500 text-sm">
        Built with intent. © {new Date().getFullYear()} Revleet
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
