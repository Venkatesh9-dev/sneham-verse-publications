// app/api/bulk-order-email/route.ts
import { NextResponse } from "next/server";

// Ensure this runs on Node (Resend needs Node runtime)
export const runtime = "nodejs";

async function getResendClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("Missing RESEND_API_KEY environment variable");
  }
  // lazy import/resend client creation
  const { Resend } = await import("resend");
  return new Resend(key);
}

export async function POST(req: Request) {
  try {
    const resend = await getResendClient();

    const body = await req.json();
    console.log("bulk-order-email body:", body);

    const {
      college_name,
      location,
      department,
      contact_person,
      designation,
      email,
      phone,
      copies,
      notes,
    } = body;

    const textLines = [
      `College / Institute: ${college_name ?? "N/A"}`,
      location && `City & State: ${location}`,
      department && `Department / Course: ${department}`,
      contact_person && `Contact Person: ${contact_person}`,
      designation && `Designation: ${designation}`,
      email && `Email: ${email}`,
      phone && `Phone / WhatsApp: ${phone}`,
      typeof copies === "number" && !Number.isNaN(copies)
        ? `Approx. Copies: ${copies}`
        : "",
      notes && `Notes: ${notes}`,
    ].filter(Boolean);

    const toEmail = process.env.NOTIFY_EMAIL ?? "snehamversepublications@gmail.com";

    const { error } = await resend.emails.send({
      from: "SnehAm VERSE <no-reply@snehamversepublications.com>",
      to: toEmail,
      subject: `New Bulk Order Enquiry – ${college_name ?? "Unknown College"}`,
      text: textLines.join("\n"),
    });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json(
        { ok: false, message: "Resend error", error },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("bulk-order-email route error:", err);
    return NextResponse.json(
      { ok: false, message: "Server error", error: String(err) },
      { status: 500 }
    );
  }
}
