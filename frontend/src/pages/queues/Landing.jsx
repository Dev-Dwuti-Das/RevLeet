export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">

        {/* subtle glow */}
        <div className="absolute top-40 left-75 w-[800px] h-[500px] bg-purple-600/70 blur-[140px] z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent blur-3xl" />

        <h1 className="relative text-5xl md:text-7xl font-bold tracking-tight mb-6">
          You solved it once.<br />
          <span className="text-purple-400">Now actually remember it.</span>
        </h1>

        <p className="relative max-w-2xl text-gray-200/80 text-lg md:text-xl mb-10">
          Revleet is a spaced-repetition system for coding problems.
          It automatically schedules revisions so concepts stick for interviews.
        </p>

        <div className="relative flex gap-4">
          <a
            href="/home"
            className="
              text-white-500
              bg-purple-500 hover:bg-purple-600
              px-8 py-4 rounded-full
              font-semibold
              transition
              shadow-[0_0_30px_rgba(168,85,247,0.35)]
            "
          >
            Start Revising
          </a>

          <a
            href="/about"
            className="
              border border-gray-700
              px-8 py-4 rounded-full
              text-gray-300
              hover:text-white hover:border-gray-500
              transition
            "
          >
            How it Works
          </a>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">
          The real problem with LeetCode
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-gray-400">
          <Problem text="You solve a question once and never see it again." />
          <Problem text="You revisit problems randomly with no structure." />
          <Problem text="You forget patterns right when it matters most." />
        </div>
      </section>

      {/* SOLUTION */}
      <section className="bg-[#111] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-14">
            Revleet fixes this with structure
          </h2>

          {/* FLOW */}
          <div className="flex flex-wrap justify-center align-items gap-3 text-sm text-gray-300 mb-10">
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

      {/* FEATURES */}
      <section className="py-24">
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

      <section className="bg-[#111] py-28 text-center px-6">
        <span className="text-4xl md:text-5xl font-bold mb-6 me-4">
          Stop grinding
        </span><span className="text-4xl md:text-5xl font-bold mb-6">
          Stop Learning
        </span>



        <p className="text-gray-400 mb-10 max-w-xl mx-auto mt-2">
          Revleet turns practice into long-term skill.
        </p>

        <a
          href="/home"
          className="
            bg-purple-500 hover:bg-purple-600
            px-10 py-3 rounded-full
            font-bold
            text-white
            text-xl
            transition
          "
        >
          Get Started Free
        </a>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
        Built with intent. © {new Date().getFullYear()} Revleet
      </footer>
    </div>
  );
}

/* ---------- Components ---------- */

function Problem({ text }) {
  return (
    <div className="bg-[#121212] border border-gray-800 rounded-2xl p-6">
      {text}
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-6 hover:border-purple-500/40 transition">
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
      className={`
        px-4 py-2 rounded-full border
        ${colors[color] || "bg-gray-500/10 border-gray-600/30"}
      `}
    >
      {label}
    </span>
  );
}

function Arrow() {
  return <span className="text-purple-400 flex align-items mt-2">→</span>;
}
