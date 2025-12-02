import ThreeDBook from "@/components/ThreeDBook";

export default function HomePage() {
  return (
    <main className="mt-6 md:mt-10 space-y-12">
      {/* HERO SECTION */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Text + CTAs */}
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
            SNEHAM VERSE PUBLICATIONS
          </p>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-50 leading-tight">
            Student-friendly books for
            <br />
            understanding{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500">
              AI
            </span>{" "}
            and using it wisely.
          </h1>

          <p className="text-sm md:text-base text-slate-300 max-w-xl leading-relaxed">
            Our first title,{" "}
            <span className="italic font-semibold">
              “AN UNINVITED GUEST – AI”
            </span>
            , is written for students who are new to AI or unsure how to use it
            effectively in their studies and careers.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="/book"
              className="pill-btn-primary inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium"
            >
              Know More About the Book
            </a>
            <a
              href="/colleges#bulk-order"
              className="pill-btn-secondary inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium"
            >
              For Colleges &amp; Institutes
            </a>
          </div>
        </div>

        {/* Right: 3D Book – no card, just glow + book */}
        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-sm">
            {/* Glow behind book */}
            <div className="pointer-events-none absolute -inset-10 rounded-full bg-gradient-to-br from-cyan-500/25 via-sky-500/15 to-blue-700/25 blur-3xl" />

            <div className="relative flex flex-col items-center">
              <div className="text-[10px] uppercase tracking-[0.25em] text-slate-300 mb-3">
                An Uninvited Guest – AI
              </div>

              {/* 3D rotating / floating book */}
              <ThreeDBook />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
