import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  verifyHmacToken,
  generatePassword,
  hashPassword,
  logAccess,
} from "@/lib/auth";
import { sendApprovedPassword, sendDenialNotification } from "@/lib/email";

function htmlPage(title: string, message: string, success: boolean) {
  return new Response(
    `<!DOCTYPE html>
    <html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${title}</title>
    <style>
      body { font-family: -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f9fafb; }
      .card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 40px; max-width: 400px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,.05); }
      .icon { font-size: 48px; margin-bottom: 16px; }
      h1 { color: #1a1a2e; font-size: 20px; margin: 0 0 8px; }
      p { color: #6b7280; font-size: 14px; line-height: 1.6; }
    </style></head>
    <body><div class="card">
      <div class="icon">${success ? "&#10003;" : "&#10007;"}</div>
      <h1>${title}</h1>
      <p>${message}</p>
    </div></body></html>`,
    {
      status: 200,
      headers: { "Content-Type": "text/html" },
    }
  );
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    const action = url.searchParams.get("action"); // "approve" or "deny"

    if (!token || !action || !["approve", "deny"].includes(action)) {
      return htmlPage("Invalid Link", "This link is malformed or expired.", false);
    }

    // Verify HMAC
    const payload = await verifyHmacToken(token);
    if (!payload) {
      return htmlPage("Invalid Link", "This approval link has an invalid signature.", false);
    }

    const email = payload.email as string;

    // Find the pending request matching this token
    const { data: req } = await supabase
      .from("access_requests")
      .select("*")
      .eq("approval_token", token)
      .eq("status", "pending")
      .single();

    if (!req) {
      return htmlPage(
        "Already Processed",
        "This request has already been approved, denied, or expired.",
        false
      );
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const ua = request.headers.get("user-agent") || "";

    if (action === "deny") {
      // Deny
      await supabase
        .from("access_requests")
        .update({ status: "denied", denied_at: new Date().toISOString() })
        .eq("id", req.id);

      await logAccess({
        request_id: req.id,
        email,
        action: "denied",
        ip_address: ip,
        user_agent: ua,
      });

      await sendDenialNotification(email);

      return htmlPage(
        "Request Denied",
        `Access denied for ${email}. They have been notified.`,
        false
      );
    }

    // Approve: generate password, hash, store, email
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
      .eq("id", req.id);

    await logAccess({
      request_id: req.id,
      email,
      action: "approved",
      ip_address: ip,
      user_agent: ua,
      metadata: { expires_at: expiresAt },
    });

    await sendApprovedPassword({ email, password: plainPassword });

    return htmlPage(
      "Access Approved",
      `A unique password has been sent to <strong>${email}</strong>. It expires in 30 minutes.`,
      true
    );
  } catch (err) {
    console.error("Approve error:", err);
    return htmlPage("Error", "Something went wrong. Please try again.", false);
  }
}
