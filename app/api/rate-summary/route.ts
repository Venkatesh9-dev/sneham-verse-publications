import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from("book_ratings")
      .select("rating");

    if (error) {
      console.error("Summary fetch error:", error);
      return NextResponse.json(
        { error: error.message },
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
    console.error("Unexpected summary error:", error);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
