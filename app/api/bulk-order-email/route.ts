// app/api/bulk-order-email/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";

// Ensure this runs on Node (Resend needs Node runtime)
export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
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
      `College / Institute: ${college_name}`,
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

    const { error } = await resend.emails.send({
      from: "SnehAm VERSE <no-reply@snehamversepublications.com>",
      // you set this in .env.local; fallback just in case
      to: process.env.NOTIFY_EMAIL ?? "snehamversepublicications@gmail.com",
      subject: `New Bulk Order Enquiry – ${
        college_name || "Unknown College"
      }`,
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
