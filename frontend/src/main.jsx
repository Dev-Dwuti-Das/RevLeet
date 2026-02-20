function MobileBlockedScreen() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07070d] text-white">

      {/* Background — MATCHED TO HERO */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f3a] via-[#0b061a] to-[#020205]" />
      <div className="absolute -top-28 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-purple-600/40 blur-[160px]" />
      <div className="absolute -left-24 top-[45%] h-[320px] w-[320px] rounded-full bg-fuchsia-500/25 blur-[140px]" />
      <div className="absolute -right-24 top-[55%] h-[340px] w-[340px] rounded-full bg-indigo-500/30 blur-[140px]" />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-7 pb-16 pt-24 text-center">
        <section className="max-w-md">

          <h1 className="text-[52px] leading-[0.95] tracking-tight font-serif text-white">

            Revleet helps you
            <br />

            <span className="bg-gradient-to-r from-violet-300 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              FOCUS.
            </span>

            <br />

            Desktop gives you
            <br />

            <span className="bg-gradient-to-r from-violet-300 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              CONTROL.
            </span>

          </h1>

          <p className="mt-8 text-[17px] leading-relaxed text-gray-300">
            The real limitation isn’t access. It’s environment.
          </p>

        </section>
      </main>
    </div>
  );
}