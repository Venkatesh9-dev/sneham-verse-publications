export default function AboutPage() {
  return (
    <section className="py-10 md:py-14">
      <div className="glass-panel px-6 md:px-10 lg:px-12 py-10 md:py-12 max-readable">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-300 mb-3">
          About
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
          About SnehAm VERSE PUBLICATIONS
        </h1>

        <p className="text-sm md:text-base text-slate-200 mb-6">
          SnehAm VERSE PUBLICATIONS is an AI-focused education imprint created
          to bring honest, realistic, and student-friendly clarity about
          artificial intelligence — especially for learners who are hearing
          about AI everywhere but don&apos;t know where to start.
        </p>

        <div className="space-y-4 text-sm md:text-base text-slate-200">
          <p>
            Many students feel overwhelmed by buzzwords, tools, and hype.
            Instead of complicated theory or shortcuts, we focus on explaining
            what AI really is, how it appears in daily life, and how students
            can use it with responsibility and confidence.
          </p>

          <p>
            Our first title,{" "}
            <span className="font-semibold italic">
              “AN UNINVITED GUEST – AI”
            </span>
            , is written for students who either aren&apos;t aware of AI at all,
            or know it by name but don&apos;t understand how to use it
            effectively in their studies, exam preparation, and career
            decisions.
          </p>

          <p>
            Over time, SnehAm VERSE PUBLICATIONS aims to build a focused set of
            books and resources that act like a calm, trustworthy mentor for
            students in the AI age — helping them think clearly, act honestly,
            and grow at their own pace.
          </p>
        </div>
      </div>
    </section>
  );
}
