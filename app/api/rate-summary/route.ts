// app/api/rate-summary/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseServer";

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

    const ratings = data || [];

    const total = ratings.length;

    const average =
      total > 0
        ? ratings.reduce(
            (acc: number, curr: any) => acc + curr.rating,
            0
          ) / total
        : 0;

    return NextResponse.json({
      total,
      average,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
