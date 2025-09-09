// app/api/schedule/route.ts
import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabaseClient";
import * as Sentry from "@sentry/nextjs";

export async function GET() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("schedule").select("*");

  if (error) {
    Sentry.logger.error("Failed to fetch schedule from Supabase", {
      error: error.message,
    });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
