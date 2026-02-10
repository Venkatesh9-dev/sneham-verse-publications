// app/api/rate/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseServer";

export async function POST(req: NextRequest) {
  try {
    const { rating } = await req.json();

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Invalid rating value" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("book_ratings")
      .insert([{ rating }]);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
