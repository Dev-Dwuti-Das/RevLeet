export default function About() {
  return (
    <div className="relative min-h-screen px-6 py-24 text-white overflow-hidden">

      {/* background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0a0a18] via-[#060610] to-black" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.18),transparent_60%)]" />

      <div className="mx-auto w-full max-w-4xl space-y-16">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-semibold heading-bottom tracking-tight">
            About <span className="text-violet-400 heading-top">Revleet</span>
          </h1>
          <p className="text-gray-400 text-lg hero-text">
            A structured way to revise coding problems and actually remember them.
          </p>
        </div>

        {/* What is Revleet */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">
          <h2 className="text-xl font-medium mb-3 hero-text1">What is Revleet?</h2>
          <p className="text-gray-400 leading-relaxed">
            Revleet helps you track, revise, and move coding questions through
            clearly defined stages. Instead of random problem solving, every
            question progresses forward until it is truly done.
          </p>
        </div>

        {/* How it works */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 space-y-6">
          <h2 className="text-xl font-medium hero-text1">How it works</h2>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/15">
              Question List
            </span>
            <span className="text-violet-400">→</span>
            <span className="px-4 py-1.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-400/30">
              Waiting
            </span>
            <span className="text-violet-400">→</span>
            <span className="px-4 py-1.5 rounded-full bg-orange-500/15 text-orange-300 border border-orange-400/30">
              Vague
            </span>
            <span className="text-violet-400">→</span>
            <span className="px-4 py-1.5 rounded-full bg-yellow-500/15 text-yellow-300 border border-yellow-400/30">
              Almost Done
            </span>
            <span className="text-violet-400">→</span>
            <span className="px-4 py-1.5 rounded-full bg-green-500/15 text-green-300 border border-green-400/30">
              Done
            </span>
          </div>

          <p className="text-gray-400 leading-relaxed">
            Each question moves forward as your understanding improves.
            Waiting queues enforce time gaps so revisions happen at the
            right moment — not randomly.
          </p>
        </div>

        {/* Queue meanings */}
        <div className="grid sm:grid-cols-2 gap-6">

          <div className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6">
            <h3 className="font-medium mb-2 text-red-400">Clueless</h3>
            <p className="text-gray-400 text-sm">
              You don’t understand the problem yet. This is the starting point.
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6">
            <h3 className="font-medium mb-2 text-orange-400">Vague</h3>
            <p className="text-gray-400 text-sm">
              You know the idea, but need repeated exposure.
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6">
            <h3 className="font-medium mb-2 text-yellow-400">Almost Done</h3>
            <p className="text-gray-400 text-sm">
              You can solve it, but confidence isn’t automatic yet.
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6">
            <h3 className="font-medium mb-2 text-green-400">Done</h3>
            <p className="text-gray-400 text-sm">
              Fully internalized. Minimal revision required.
            </p>
          </div>

        </div>

        {/* Learning principle */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">
          <h2 className="text-xl font-medium mb-3 hero-text1">
            Learning principle
          </h2>

          <p className="text-gray-400 leading-relaxed mb-4">
            Revleet is built on <span className="text-white font-medium">
            spaced repetition</span> — a proven learning technique where information
            is reviewed at increasing intervals to maximize long-term memory.
          </p>

          <a
            href="https://en.wikipedia.org/wiki/Spaced_repetition"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300 transition"
          >
            Learn more about spaced repetition →
          </a>
        </div>

        {/* Footer line */}
        <div className="text-center text-gray-500 text-sm">
          Revise consistently. Move questions forward. Build confidence.
        </div>

      </div>
    </div>
  );
}
