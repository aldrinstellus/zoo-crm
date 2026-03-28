"use client";

import { useEffect, useState, useCallback } from "react";

interface AccessRequest {
  id: string;
  email: string;
  status: string;
  requested_at: string;
  approved_at: string | null;
  used_at: string | null;
  denied_at: string | null;
  expires_at: string | null;
  ip_address: string | null;
}

interface LogEntry {
  id: string;
  email: string | null;
  action: string;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  metadata: Record<string, unknown>;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  approved: "bg-blue-50 text-blue-700 border-blue-200",
  used: "bg-green-50 text-green-700 border-green-200",
  denied: "bg-red-50 text-red-700 border-red-200",
  expired: "bg-gray-50 text-gray-500 border-gray-200",
};

export default function AdminPage() {
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [tab, setTab] = useState<"requests" | "logs">("requests");
  const [acting, setActing] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    const [reqRes, logRes] = await Promise.all([
      fetch("/api/admin/requests"),
      fetch("/api/admin/logs"),
    ]);
    if (reqRes.ok) setRequests(await reqRes.json());
    if (logRes.ok) setLogs(await logRes.json());
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleAction(id: string, action: "approve" | "deny") {
    setActing(id);
    await fetch("/api/admin/requests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action }),
    });
    await loadData();
    setActing(null);
  }

  function fmtTime(ts: string | null) {
    if (!ts) return "—";
    return new Date(ts).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const pending = requests.filter((r) => r.status === "pending");

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        {["pending", "approved", "used", "denied", "expired"].map((s) => (
          <div
            key={s}
            className="bg-white rounded-lg border border-gray-200 p-4 text-center"
          >
            <p className="text-2xl font-bold text-[#1a1a2e]">
              {requests.filter((r) => r.status === s).length}
            </p>
            <p className="text-xs text-gray-400 capitalize">{s}</p>
          </div>
        ))}
      </div>

      {/* Pending alert */}
      {pending.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm font-medium text-yellow-800">
            {pending.length} pending request{pending.length > 1 ? "s" : ""} awaiting approval
          </p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setTab("requests")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            tab === "requests"
              ? "bg-white text-[#1a1a2e] shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Requests
        </button>
        <button
          onClick={() => setTab("logs")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            tab === "logs"
              ? "bg-white text-[#1a1a2e] shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Audit Log
        </button>
      </div>

      {/* Requests Table */}
      {tab === "requests" && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-500">Email</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Requested</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">IP</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Expires</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3 font-medium text-gray-900">{r.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${
                        STATUS_COLORS[r.status] || ""
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{fmtTime(r.requested_at)}</td>
                  <td className="px-4 py-3 text-gray-400 font-mono text-xs">
                    {r.ip_address || "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{fmtTime(r.expires_at)}</td>
                  <td className="px-4 py-3 text-right">
                    {r.status === "pending" && (
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleAction(r.id, "approve")}
                          disabled={acting === r.id}
                          className="px-3 py-1 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700 disabled:opacity-50"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(r.id, "deny")}
                          disabled={acting === r.id}
                          className="px-3 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700 disabled:opacity-50"
                        >
                          Deny
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                    No requests yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Logs Table */}
      {tab === "logs" && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-500">Time</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Email</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Action</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">IP</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l) => (
                <tr key={l.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3 text-gray-500 text-xs">{fmtTime(l.created_at)}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{l.email || "—"}</td>
                  <td className="px-4 py-3">
                    <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">
                      {l.action}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-gray-400 font-mono text-xs">
                    {l.ip_address || "—"}
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                    No logs yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
