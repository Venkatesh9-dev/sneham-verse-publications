export default function ContactPage() {
  return (
    <section className="mt-6 md:mt-8 space-y-6">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.25em] text-blue-400">
          Contact
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-50">
          Get in touch
        </h1>
        <p className="text-sm md:text-base text-slate-300 max-w-2xl">
          For enquiries, collaborations, or bulk orders, you can reach us
          directly using the details below.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
        <div className="space-y-3 text-sm md:text-base text-slate-100">
          <p>
            For college partnerships and bulk requests, please prefer email so
            we can track all details clearly.
          </p>
          <div className="space-y-1">
            <p className="font-semibold text-slate-50">Primary Email</p>
            <p className="text-blue-300">support@snehamverse.com</p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-slate-50">Response Time</p>
            <p className="text-slate-300">
              We usually respond within 24–48 working hours.
            </p>
          </div>
        </div>

        <div className="space-y-2 text-xs md:text-sm text-slate-200">
          <p className="font-semibold text-slate-50">
            For Bulk Orders &amp; Events
          </p>
          <p>
            If you have already filled the{" "}
            <a
              href="/colleges#bulk-order"
              className="text-blue-400 hover:underline"
            >
              Bulk Order &amp; Enquiry Form
            </a>
            , you don&apos;t need to email separately. We&apos;ll reach out
            based on the form submission.
          </p>
          <p>
            For other questions related to SnehAm VERSE PUBLICATIONS, feel free
            to write to us with a clear subject line.
          </p>
        </div>
      </div>
    </section>
  );
}
