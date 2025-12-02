export default function BookPage() {
  return (
    <section className="py-10 md:py-14">
      <div className="glass-panel px-6 md:px-10 lg:px-12 py-10 md:py-12 max-readable space-y-8">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
            The Book
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-white">
            AN UNINVITED GUEST – AI
          </h1>
          <p className="text-sm md:text-base text-slate-200">
            A practical, student-friendly guide for learners who are new to AI or
            unsure how to use it efficiently and honestly.
          </p>
        </div>

        <div className="space-y-4 text-sm md:text-base text-slate-200">
          <p>
            <span className="font-semibold italic">
              “AN UNINVITED GUEST – AI”
            </span>{" "}
            is written for students who are surrounded by AI news and tools, but
            don&apos;t know what is real, what is hype, and how to actually use
            AI to support their daily study, revision, and career planning.
          </p>

          <p>
            The book avoids heavy programming and complex maths. Instead, it
            focuses on clarity and real student problems — too much to study,
            fear of forgetting, lack of time, exam pressure, boredom, confusion
            about the future, and the temptation to misuse AI as a shortcut.
          </p>

          <p className="font-medium pt-2">
            Inside the book, students will explore:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>What AI really means beyond buzzwords and movie myths</li>
            <li>
              The real problems students face — and how AI can support them
              without replacing their efforts
            </li>
            <li>
              How to ask smarter questions (prompts) to get better answers from
              AI tools
            </li>
            <li>
              Practical ways to use AI for notes, revision, planning, and doubt
              clearing
            </li>
            <li>
              Career mindset and courage in the AI era — how to think about
              future roles
            </li>
            <li>
              A curated student AI toolkit and prompt library for daily use
            </li>
          </ul>

          <p>
            The tone of the book is simple, honest, and direct — like a senior
            or mentor sitting beside you and explaining how to live and learn
            with AI, step by step.
          </p>
        </div>

        <div className="grid gap-4 text-xs md:text-sm text-slate-300">
          <div className="grid md:grid-cols-2 gap-4">
            <p>
              <span className="text-slate-400">Author:</span> Potti Venkatesh
            </p>
            <p>
              <span className="text-slate-400">Publisher:</span> SnehAm VERSE
              PUBLICATIONS
            </p>
            <p>
              <span className="text-slate-400">ISBN:</span> 978-81-995955-2-1
            </p>
            <p>
              <span className="text-slate-400">Edition:</span> First Edition,
              2025
            </p>
            <p>
              <span className="text-slate-400">Format:</span> Paperback (eBook
              planned)
            </p>
            <p>
              <span className="text-slate-400">Ideal readers:</span> Intermediate &
              college students, and institutes beginning AI awareness.
            </p>
          </div>

          <p className="text-slate-300">
            For bulk copies and campus sessions, please visit the{" "}
            <a href="/colleges" className="text-cyan-300 hover:underline">
              Colleges &amp; Institutes
            </a>{" "}
            page.
          </p>
        </div>
      </div>
    </section>
  );
}
