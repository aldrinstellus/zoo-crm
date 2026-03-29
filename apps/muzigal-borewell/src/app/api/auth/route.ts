import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionToken, logAccess } from "@/lib/auth";

const SITE_PASSWORD = process.env.SITE_PASSWORD || "muzigal2026";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "aldrin@atc.xyz";

export async function POST(request: Request) {
  const { password } = await request.json();
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ua = request.headers.get("user-agent") || "";

  if (password === SITE_PASSWORD) {
    const sessionToken = await createSessionToken(ADMIN_EMAIL, "admin");

    const cookieStore = await cookies();
    cookieStore.set("muzigal_auth", sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24h for admin
      path: "/",
    });

    await logAccess({
      email: ADMIN_EMAIL,
      action: "admin_login",
      ip_address: ip,
      user_agent: ua,
    });

    return NextResponse.json({ ok: true });
  }

  await logAccess({
    email: "unknown",
    action: "admin_login_failed",
    ip_address: ip,
    user_agent: ua,
  });

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
