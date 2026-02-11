import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RatingRequest {
  rating: number;
}

export async function POST(req: NextRequest) {
  try {
    const body: RatingRequest = await req.json();
    const { rating } = body;

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Invalid rating value" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();

    // Get user IP from headers
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip =
      forwardedFor?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "0.0.0.0";

    const { error: insertError } = await supabase
      .from("book_ratings")
      .insert([
        {
          rating: Number(rating),
          user_ip: ip,
        },
      ]);

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

    // Fetch updated summary
    const { data, error: fetchError } = await supabase
      .from("book_ratings")
      .select("rating");

    if (fetchError) {
      console.error("Fetch error:", fetchError);
      return NextResponse.json(
        { error: fetchError.message },
        { status: 500 }
      );
    }

    const count = data?.length ?? 0;

    const total =
      count > 0
        ? data.reduce(
            (acc: number, curr: { rating: number }) =>
              acc + Number(curr.rating),
            0
          )
        : 0;

    const average =
      count > 0 ? Number((total / count).toFixed(1)) : 0;

    return NextResponse.json({
      average,
      count,
    });

  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
