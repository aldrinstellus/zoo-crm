import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://muzigal-zoo.vercel.app";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "aldrin@atc.xyz";
const FROM_EMAIL = process.env.FROM_EMAIL || "Muzigal Docs <onboarding@resend.dev>";

export async function sendAccessRequestNotification(params: {
  requestId: string;
  email: string;
  approveToken: string;
  ip: string;
}) {
  const approveUrl = `${APP_URL}/api/access/approve?token=${encodeURIComponent(params.approveToken)}&action=approve`;
  const denyUrl = `${APP_URL}/api/access/approve?token=${encodeURIComponent(params.approveToken)}&action=deny`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `Muzigal Docs — Access Request from ${params.email}`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 0;">
        <h2 style="color: #1a1a2e; margin-bottom: 8px;">New Access Request</h2>
        <p style="color: #555; margin-bottom: 24px;">Someone wants to view the Muzigal documentation.</p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; color: #888; font-size: 13px;">Email</td>
            <td style="padding: 8px 0; font-weight: 600; color: #1a1a2e;">${params.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888; font-size: 13px;">IP Address</td>
            <td style="padding: 8px 0; color: #1a1a2e;">${params.ip}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888; font-size: 13px;">Time</td>
            <td style="padding: 8px 0; color: #1a1a2e;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</td>
          </tr>
        </table>

        <div style="display: flex; gap: 12px;">
          <a href="${approveUrl}" style="display: inline-block; background: #16a34a; color: #fff; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">Approve</a>
          <a href="${denyUrl}" style="display: inline-block; background: #dc2626; color: #fff; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px; margin-left: 12px;">Deny</a>
        </div>

        <p style="color: #aaa; font-size: 11px; margin-top: 32px;">
          Approving will generate a unique password valid for 30 minutes and email it to ${params.email}.
        </p>
      </div>
    `,
  });
}

export async function sendApprovedPassword(params: {
  email: string;
  password: string;
}) {
  const loginUrl = `${APP_URL}/login?mode=login`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: params.email,
    subject: "Muzigal Docs — Your Access Password",
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 0;">
        <h2 style="color: #1a1a2e; margin-bottom: 8px;">Access Approved</h2>
        <p style="color: #555; margin-bottom: 24px;">Your request to view the Muzigal documentation has been approved.</p>

        <div style="background: #f8f9fa; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 24px;">
          <p style="color: #888; font-size: 12px; margin: 0 0 8px 0;">Your password</p>
          <p style="font-size: 24px; font-weight: 700; color: #1a1a2e; letter-spacing: 2px; margin: 0; font-family: monospace;">${params.password}</p>
          <p style="color: #dc2626; font-size: 12px; margin: 12px 0 0 0; font-weight: 600;">Valid for 30 minutes. One-time use only.</p>
        </div>

        <a href="${loginUrl}" style="display: inline-block; background: #1a1a2e; color: #fff; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">Log In Now</a>

        <p style="color: #aaa; font-size: 11px; margin-top: 32px;">
          Enter your email and the password above to access the docs. This password cannot be reused.
        </p>
      </div>
    `,
  });
}

export async function sendDenialNotification(email: string) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Muzigal Docs — Access Request Denied",
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 0;">
        <h2 style="color: #1a1a2e; margin-bottom: 8px;">Access Denied</h2>
        <p style="color: #555;">Your request to access the Muzigal documentation has been declined.</p>
        <p style="color: #555;">If you believe this is an error, please contact <a href="mailto:aldrin@atc.xyz" style="color: #2563eb;">aldrin@atc.xyz</a>.</p>
      </div>
    `,
  });
}
