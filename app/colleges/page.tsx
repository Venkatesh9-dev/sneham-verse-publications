"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/supabase/client";

export default function CollegesPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitted(false);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // 🔹 Read all fields from the form
    const collegeName = String(formData.get("collegeName") || "");
    const location = String(formData.get("location") || "");
    const department = String(formData.get("department") || "");
    const contactName = String(formData.get("contactName") || "");
    const designation = String(formData.get("designation") || "");
    const email = String(formData.get("email") || "");
    const phone = String(formData.get("phone") || "");
    const copiesRaw = formData.get("copies");
    const copies =
      copiesRaw !== null && copiesRaw !== "" ? Number(copiesRaw) : null;
    const notes = String(formData.get("notes") || "");

    // 🔹 Payload for Supabase (must match table columns)
    const dbPayload = {
      college_name: collegeName,
      person_name: contactName,
      email,
      phone,
      quantity: copies,
      message:
        [
          location && `City & State: ${location}`,
          department && `Department / Course: ${department}`,
          designation && `Designation: ${designation}`,
          notes && `Notes: ${notes}`,
        ]
          .filter(Boolean)
          .join("\n") || null,
    };

    // 1️⃣ Save in Supabase
    const { error: insertError } = await supabase
      .from("bulk_orders")
      .insert([dbPayload]);

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      setError(
        insertError.message ||
          "Something went wrong while submitting. Please try again."
      );
      setLoading(false);
      return;
    }

    // 2️⃣ Fire email notification (best-effort – form is already saved)
    try {
      const res = await fetch("/api/bulk-order-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // 👇 match what the API route expects (snake_case)
          college_name: collegeName,
          location,
          department,
          contact_person: contactName,
          designation,
          email,
          phone,
          copies,
          notes,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        console.error("Email API failed:", res.status, data);
      }
    } catch (err) {
      console.error("Error calling bulk-order-email API:", err);
      // We won't show this to the user – DB is already saved.
    }

    setLoading(false);
    setSubmitted(true);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="mt-6 md:mt-8 space-y-8">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-blue-400">
          Institutions
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-50">
          For Colleges &amp; Institutes
        </h1>
        <p className="text-sm md:text-base text-slate-300 max-w-2xl">
          SnehAm VERSE PUBLICATIONS collaborates with colleges and educational
          institutions that want to introduce AI to their students in a simple,
          practical, and responsible way.
        </p>
      </div>

      <div className="grid md:grid-cols-[1.1fr,1.4fr] gap-8 md:gap-10 items-start">
        {/* Left text */}
        <div className="space-y-4 text-sm md:text-base text-slate-100 leading-relaxed">
          <p>
            Our first title,{" "}
            <span className="font-semibold italic">
              “AN UNINVITED GUEST – AI”
            </span>
            , can be used for AI awareness sessions, seminars, orientation
            programs, or as a student-friendly reference book in the library.
          </p>
          <p>
            The content is written to be accessible for both technical and
            non-technical students, focusing on mindset, clarity, and usage — not
            just buzzwords.
          </p>
          <p>
            We welcome bulk orders, department events, and structured sessions on
            responsible AI use for students.
          </p>
        </div>

        {/* Right: Form */}
        <div id="bulk-order" className="space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
            Bulk Order &amp; Enquiry Form
          </h2>
          <p className="text-xs md:text-sm text-slate-300">
            Please share your institution details below. We will contact you with
            pricing, delivery timelines, and simple payment options. Online
            payment gateway integration will be added soon.
          </p>

          {error && (
            <div className="rounded-md border border-red-500/60 bg-red-500/10 px-4 py-3 text-xs md:text-sm text-red-200">
              {error}
            </div>
          )}

          {submitted && (
            <div className="rounded-md border border-emerald-500/60 bg-emerald-500/10 px-4 py-3 text-xs md:text-sm text-emerald-200">
              Thank you for your enquiry. We&apos;ll review your details and get
              back to you shortly.
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid gap-4 text-xs md:text-sm"
          >
            <div className="grid gap-2">
              <label className="font-medium text-slate-100">
                College / Institute Name <span className="text-red-400">*</span>
              </label>
              <input
                required
                name="collegeName"
                className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 outline-none text-slate-50 placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Example: ABC College of Science & Commerce"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="font-medium text-slate-100">
                  City &amp; State
                </label>
                <input
                  name="location"
                  className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 outline-none text-slate-50 placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Hyderabad, Telangana"
                />
              </div>

              <div className="grid gap-2">
                <label className="font-medium text-slate-100">
                  Department / Course
                </label>
                <input
                  name="department"
                  className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 outline-none text-slate-50 placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="B.Sc, B.Com, Pharmacy, etc."
                />
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="font-medium text-slate-100">
                  Contact Person Name{" "}
                  <span className="text-red-400">*</span>
                </label>
                <input
                  required
                  name="contactName"
                  className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 outline-none text-slate-50 placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="HOD / Librarian / Coordinator"
                />
              </div>

              <div className="grid gap-2">
                <label className="font-medium text-slate-100">
                  Designation
                </label>
                <input
                  name="designation"
                  className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 outline-none text-slate-50 placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="HOD, Librarian, Principal, etc."
                />
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="font-medium text-slate-100">
                  Official Email ID <span className="text-red-400">*</span>
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 outline-none text-slate-50 placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="example@college.edu.in"
                />
              </div>

              <div className="grid gap-2">
                <label className="font-medium text-slate-100">
                  Phone / WhatsApp Number
                </label>
                <input
                  name="phone"
                  className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 outline-none text-slate-50 placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="font-medium text-slate-100">
                  Approximate Number of Copies
                </label>
                <input
                  name="copies"
                  type="number"
                  min={1}
                  className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 outline-none text-slate-50 placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Eg: 50"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="font-medium text-slate-100">
                Additional Notes
              </label>
              <textarea
                name="notes"
                rows={3}
                className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 outline-none text-slate-50 placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Event date, seminar details, preferred timelines, etc."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex justify-center rounded-full bg-blue-500 px-5 py-2 text-sm font-medium text-white hover:bg-blue-400 disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Enquiry"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
