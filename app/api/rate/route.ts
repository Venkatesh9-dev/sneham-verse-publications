import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseServer";

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
