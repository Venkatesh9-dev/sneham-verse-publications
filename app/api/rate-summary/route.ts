import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseServer";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("book_ratings")
      .select("rating");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const total = data.length;
    const average =
      total > 0
        ? (
            data.reduce((acc, curr) => acc + curr.rating, 0) / total
          ).toFixed(2)
        : 0;

    return NextResponse.json({ average, total });
  } catch  {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
