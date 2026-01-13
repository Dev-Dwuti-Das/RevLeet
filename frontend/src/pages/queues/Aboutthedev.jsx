export default function AboutDeveloper() {
  return (
    <div className="min-h-screen bg-[#05050a] text-white px-6 py-20">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            About the Developer
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Revleet is built by someone who got tired of forgetting solutions,
            re-learning patterns, and pretending random practice was enough.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#0f0f14] border border-white/5 rounded-2xl p-8 space-y-10">

          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Why Revleet exists</h2>
            <p className="text-gray-400 leading-relaxed">
              Solving problems once feels productive. Forgetting them later feels inevitable.
              Revleet was built to fix that gap — not with motivation quotes or streak pressure,
              but with structure.
              <br /><br />
              Spaced repetition works. Most coding platforms ignore it.
              Revleet doesn’t.
            </p>
          </section>

          {/* Divider */}
          <div className="h-px bg-white/5" />

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Philosophy</h2>
            <ul className="text-gray-400 space-y-2 list-disc list-inside">
              <li>Consistency beats intensity</li>
              <li>Memory should be engineered, not hoped for</li>
              <li>Progress should be visible</li>
              <li>Systems over motivation</li>
            </ul>
          </section>

          {/* Divider */}
          <div className="h-px bg-white/5" />

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Built with</h2>

            <div className="flex flex-wrap gap-3">
              {[
                "React",
                "Node.js",
                "MongoDB",
                "Spaced Repetition",
                "Queue-based learning",
                "Too many late nights"
              ].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full text-sm bg-white/5 border border-white/10 text-gray-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          {/* Divider */}
          <div className="h-px bg-white/5" />

          {/* Footer note */}
          <section className="text-sm text-gray-500">
            Revleet is a tool built for people who take interviews seriously —
            and memory even more seriously.
          </section>

        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500 text-sm">
          Built with intent. Not hype.
        </div>

      </div>
    </div>
  );
}
