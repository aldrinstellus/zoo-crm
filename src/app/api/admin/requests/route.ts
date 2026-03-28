import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generatePassword, hashPassword, logAccess } from "@/lib/auth";
import { sendApprovedPassword, sendDenialNotification } from "@/lib/email";

export async function GET() {
  const { data, error } = await supabase
    .from("access_requests")
    .select("*")
    .order("requested_at", { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  try {
    const { id, action } = await request.json();
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const ua = request.headers.get("user-agent") || "";

    if (!id || !["approve", "deny"].includes(action)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Get the request
    const { data: req } = await supabase
      .from("access_requests")
      .select("*")
      .eq("id", id)
      .eq("status", "pending")
      .single();

    if (!req) {
      return NextResponse.json({ error: "Request not found or already processed" }, { status: 404 });
    }

    if (action === "deny") {
      await supabase
        .from("access_requests")
        .update({ status: "denied", denied_at: new Date().toISOString() })
        .eq("id", id);

      await logAccess({
        request_id: id,
        email: req.email,
        action: "denied",
        ip_address: ip,
        user_agent: ua,
        metadata: { via: "admin_ui" },
      });

      await sendDenialNotification(req.email);

      return NextResponse.json({ ok: true });
    }

    // Approve
    const plainPassword = generatePassword(12);
    const hashed = await hashPassword(plainPassword);
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    await supabase
      .from("access_requests")
      .update({
        status: "approved",
        password_hash: hashed,
        expires_at: expiresAt,
        approved_at: new Date().toISOString(),
      })
      .eq("id", id);

    await logAccess({
      request_id: id,
      email: req.email,
      action: "approved",
      ip_address: ip,
      user_agent: ua,
      metadata: { via: "admin_ui", expires_at: expiresAt },
    });

    await sendApprovedPassword({ email: req.email, password: plainPassword });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Admin action error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
