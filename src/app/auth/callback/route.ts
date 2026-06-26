import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      const { data: userProfile } = await supabase
        .from("user_list")
        .select("id")
        .eq("user_id", data.user.id)
        .maybeSingle();
      if (!userProfile) {
        return NextResponse.redirect(new URL("/onboarding/step1", request.url));
      }
    }
  }

  return NextResponse.redirect(new URL(next, request.url));
}
