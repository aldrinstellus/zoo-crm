"use client";

import { useState } from "react";
import type { Activity } from "@/lib/types";
import { getShareUrls } from "@/lib/social";
import {
  ArrowSquareOut,
  ChatCircleDots,
  XLogo,
  Copy,
  Check,
  Play,
} from "@phosphor-icons/react";

const SOCIAL_COLORS = {
  facebook: "#1877F2",
  whatsapp: "#25D366",
  youtube: "#FF0000",
  twitter: "#1DA1F2",
  copy: "#6B7280",
};

export function ShareBar({ activity }: { activity: Activity }) {
  const [copied, setCopied] = useState(false);
  const shareUrls = getShareUrls(activity);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrls.copyLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={shareUrls.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-2 text-white text-xs font-medium rounded-lg transition-all hover:opacity-85 active:scale-95"
        style={{ backgroundColor: SOCIAL_COLORS.facebook }}
      >
        <ArrowSquareOut size={14} weight="bold" />
        Facebook
      </a>

      {shareUrls.youtube && (
        <a
          href={shareUrls.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 text-white text-xs font-medium rounded-lg transition-all hover:opacity-85 active:scale-95"
          style={{ backgroundColor: SOCIAL_COLORS.youtube }}
        >
          <Play size={14} weight="fill" />
          YouTube
        </a>
      )}

      <a
        href={shareUrls.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-2 text-white text-xs font-medium rounded-lg transition-all hover:opacity-85 active:scale-95"
        style={{ backgroundColor: SOCIAL_COLORS.whatsapp }}
      >
        <ChatCircleDots size={14} weight="bold" />
        WhatsApp
      </a>

      <a
        href={shareUrls.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-2 text-white text-xs font-medium rounded-lg transition-all hover:opacity-85 active:scale-95"
        style={{ backgroundColor: SOCIAL_COLORS.twitter }}
      >
        <XLogo size={14} weight="bold" />
        Post
      </a>

      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-3 py-2 text-white text-xs font-medium rounded-lg transition-all hover:opacity-85 active:scale-95"
        style={{ backgroundColor: SOCIAL_COLORS.copy }}
      >
        {copied ? <Check size={14} weight="bold" /> : <Copy size={14} weight="bold" />}
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
}
