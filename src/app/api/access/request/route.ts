import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { createHmacToken, logAccess } from "@/lib/auth";
import { sendAccessRequestNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const ua = request.headers.get("user-agent") || "";

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // Rate limit: 1 pending request per email per 10 minutes
    const tenMinAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { data: recent } = await supabase
      .from("access_requests")
      .select("id")
      .eq("email", email.toLowerCase())
      .eq("status", "pending")
      .gte("requested_at", tenMinAgo)
      .limit(1);

    if (recent && recent.length > 0) {
      return NextResponse.json(
        { error: "A request is already pending for this email. Please wait." },
        { status: 429 }
      );
    }

    // Create approval token
    const approvalPayload = {
      email: email.toLowerCase(),
      ts: Date.now(),
      nonce: crypto.randomUUID(),
    };
    const approvalToken = await createHmacToken(approvalPayload);

    // Insert request
    const { data: req, error: insertErr } = await supabase
      .from("access_requests")
      .insert({
        email: email.toLowerCase(),
        status: "pending",
        approval_token: approvalToken,
        ip_address: ip,
      })
      .select("id")
      .single();

    if (insertErr) {
      console.error("Insert error:", insertErr);
      return NextResponse.json({ error: "Failed to create request" }, { status: 500 });
    }

    // Log
    await logAccess({
      request_id: req.id,
      email: email.toLowerCase(),
      action: "request_created",
      ip_address: ip,
      user_agent: ua,
    });

    // Notify admin
    await sendAccessRequestNotification({
      requestId: req.id,
      email: email.toLowerCase(),
      approveToken: approvalToken,
      ip,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Request access error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
