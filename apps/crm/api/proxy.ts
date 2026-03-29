import type { VercelRequest, VercelResponse } from '@vercel/node';

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Preflight
  if (req.method === 'OPTIONS') {
    for (const [k, v] of Object.entries(CORS_HEADERS)) res.setHeader(k, v);
    return res.status(204).end();
  }

  const gasUrl = process.env.GAS_URL;
  if (!gasUrl) {
    return res.status(500).json({ error: 'GAS_URL not configured' });
  }

  try {
    const url = new URL(gasUrl);
    // Forward query params
    const params = new URLSearchParams(req.query as Record<string, string>);
    params.forEach((v, k) => url.searchParams.set(k, v));

    const options: RequestInit = { method: req.method };
    if (req.method === 'POST') {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(req.body);
    }

    const response = await fetch(url.toString(), options);
    const data = await response.text();

    for (const [k, v] of Object.entries(CORS_HEADERS)) res.setHeader(k, v);
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).send(data);
  } catch (err) {
    for (const [k, v] of Object.entries(CORS_HEADERS)) res.setHeader(k, v);
    return res.status(500).json({ error: 'Proxy error', details: String(err) });
  }
}
