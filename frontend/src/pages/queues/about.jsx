export default function About() {
  return (
    <div className="w-full min-h-screen flex justify-center px-6 py-14 text-white">
      <div className="w-full max-w-4xl space-y-12">

        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold tracking-wide">About Revleet</h1>
          <p className="text-gray-400 text-lg">
            A simple system to revise coding questions the right way.
          </p>
        </div>

        {/* What is Revleet */}
        <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">What is Revleet?</h2>
          <p className="text-gray-400 leading-relaxed">
            Revleet helps you track, revise, and move coding questions step by step.
            Instead of solving everything randomly, your questions move through
            clear stages until they are fully done.
          </p>
        </div>

        {/* How it works */}
        <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">How it works</h2>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="px-3 py-1 rounded-full bg-gray-500/15 border border-gray-600/30">
              Question List
            </span>
            <span className="text-gray-500">→</span>
            <span className="px-3 py-1 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30">
              Waiting
            </span>
            <span className="text-gray-500">→</span>
            <span className="px-3 py-1 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">
              Vague
            </span>
            <span className="text-gray-500">→</span>
            <span className="px-3 py-1 rounded-full bg-yellow-500/15 text-yellow-400 border border-yellow-500/30">
              Almost Done
            </span>
            <span className="text-gray-500">→</span>
            <span className="px-3 py-1 rounded-full bg-green-500/15 text-green-400 border border-green-500/30">
              Done
            </span>
          </div>

          <p className="text-gray-400 mt-5 leading-relaxed">
            Each question moves from left to right as you understand it better.
            Waiting queues simply hold questions until you’re ready to move them forward.
          </p>
        </div>

        {/* Meaning of queues */}
        <div className="grid sm:grid-cols-2 gap-6">

          <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5">
            <h3 className="font-semibold mb-2 text-red-400">Clueless</h3>
            <p className="text-gray-400 text-sm">
              You don’t understand the question yet. Start here.
            </p>
          </div>

          <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5">
            <h3 className="font-semibold mb-2 text-orange-400">Vague</h3>
            <p className="text-gray-400 text-sm">
              You know the idea but still need revision.
            </p>
          </div>

          <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5">
            <h3 className="font-semibold mb-2 text-yellow-400">Almost Done</h3>
            <p className="text-gray-400 text-sm">
              You can solve it, but want more confidence.
            </p>
          </div>

          <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5">
            <h3 className="font-semibold mb-2 text-green-400">Done</h3>
            <p className="text-gray-400 text-sm">
              Fully understood. No need to revisit often.
            </p>
          </div>

        </div>

         <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">
            Learning Principle
          </h2>

          <p className="text-gray-400 leading-relaxed mb-4">
            Revleet is inspired by the concept of <span className="text-white font-medium">
            Spaced Repetition</span> — a proven learning technique where information
            is reviewed at increasing intervals to improve long-term memory.
          </p>

          <a
            href="https://en.wikipedia.org/wiki/Spaced_repetition"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2
              text-sm font-semibold
              text-blue-400 hover:text-blue-300
              transition
            "
          >
            Learn more about Spaced Repetition
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h6m0 0v6m0-6L10 20" />
            </svg>
          </a>
        </div>

        {/* Final CTA */}
        <div className="text-center text-gray-400 text-sm">
          Revise consistently. Move questions forward. Build confidence.
        </div>

      </div>
    </div>
  );
}
