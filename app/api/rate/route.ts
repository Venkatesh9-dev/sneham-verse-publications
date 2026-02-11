import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { rating } = await req.json();

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Invalid rating value" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();

    const { error: insertError } = await supabase
      .from("book_ratings")
      .insert([{ rating: Number(rating) }]);

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

    const { data } = await supabase
      .from("book_ratings")
      .select("rating");

    const safeData = data ?? [];

    const count = safeData.length;

    const total = safeData.reduce(
      (acc: number, curr: { rating: number }) =>
        acc + Number(curr.rating),
      0
    );

    const average =
      count > 0 ? Number((total / count).toFixed(1)) : 0;

    return NextResponse.json({
      average,
      count,
    });

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
