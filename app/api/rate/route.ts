import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: NextRequest) {
  try {
    const { rating } = await req.json();

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid rating" }, { status: 400 });
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      "unknown";

    const userAgent = req.headers.get("user-agent") || "";

    // UPSERT: Update if IP exists, insert if not
    const { error } = await supabaseServer
      .from("book_ratings")
      .upsert(
        {
          user_ip: ip,
          rating,
          user_agent: userAgent,
        },
        { onConflict: "user_ip" }
      );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Fetch updated average + total count
    const { data, error: aggregateError } = await supabaseServer
      .from("book_ratings")
      .select("rating");

    if (aggregateError) {
      return NextResponse.json({ error: aggregateError.message }, { status: 500 });
    }

    const total = data.length;
    const average =
      total > 0
        ? (
            data.reduce((acc, curr) => acc + curr.rating, 0) / total
          ).toFixed(2)
        : 0;

    return NextResponse.json({ average, total });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
