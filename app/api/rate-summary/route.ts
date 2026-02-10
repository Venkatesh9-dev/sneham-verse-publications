import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseServer";

interface RatingRow {
  rating: number;
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("book_ratings")
      .select("rating");

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const ratings: RatingRow[] = data || [];

    const total = ratings.length;

    const average =
      total > 0
        ? ratings.reduce(
            (acc: number, curr: RatingRow) => acc + curr.rating,
            0
          ) / total
        : 0;

    return NextResponse.json({
      total,
      average,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}
