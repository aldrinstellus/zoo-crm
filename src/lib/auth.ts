import { hash, compare } from "bcryptjs";
import { supabase } from "./supabase";

const HMAC_SECRET = process.env.HMAC_SECRET!;

// --- Password generation ---

const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";

export function generatePassword(length = 12): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => CHARSET[byte % CHARSET.length]).join("");
}

// --- Bcrypt ---

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashed: string
): Promise<boolean> {
  return compare(password, hashed);
}

// --- HMAC tokens ---

async function getHmacKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(HMAC_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createHmacToken(payload: Record<string, unknown>): Promise<string> {
  const key = await getHmacKey();
  const data = JSON.stringify(payload);
  const enc = new TextEncoder();
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  const sigHex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const b64 = btoa(data);
  return `${b64}.${sigHex}`;
}

export async function verifyHmacToken(
  token: string
): Promise<Record<string, unknown> | null> {
  try {
    const [b64, sigHex] = token.split(".");
    if (!b64 || !sigHex) return null;

    const data = atob(b64);
    const key = await getHmacKey();
    const enc = new TextEncoder();
    const sigBytes = new Uint8Array(
      sigHex.match(/.{2}/g)!.map((h) => parseInt(h, 16))
    );

    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      enc.encode(data)
    );
    if (!valid) return null;

    return JSON.parse(data);
  } catch {
    return null;
  }
}

// --- Session tokens ---

export async function createSessionToken(
  email: string,
  role: "visitor" | "admin"
): Promise<string> {
  const payload = {
    email,
    role,
    iat: Date.now(),
    sid: crypto.randomUUID(),
  };
  return createHmacToken(payload);
}

export async function verifySessionToken(
  token: string,
  maxAgeMs = 30 * 60 * 1000 // 30 minutes
): Promise<{ email: string; role: string; iat: number } | null> {
  const payload = await verifyHmacToken(token);
  if (!payload) return null;

  const iat = payload.iat as number;
  if (Date.now() - iat > maxAgeMs) return null;

  return {
    email: payload.email as string,
    role: payload.role as string,
    iat,
  };
}

// --- Logging ---

export async function logAccess(params: {
  request_id?: string;
  email?: string;
  action: string;
  ip_address?: string;
  user_agent?: string;
  metadata?: Record<string, unknown>;
}) {
  await supabase.from("access_log").insert({
    request_id: params.request_id || null,
    email: params.email || null,
    action: params.action,
    ip_address: params.ip_address || null,
    user_agent: params.user_agent || null,
    metadata: params.metadata || {},
  });
}
