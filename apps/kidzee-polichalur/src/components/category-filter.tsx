"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ActivityCategory } from "@/lib/types";
import { CATEGORY_LABELS, ALL_CATEGORIES } from "@/lib/types";
import {
  MaskHappy,
  Trophy,
  PaintBrush,
  Bus,
  Confetti,
  GraduationCap,
  Wrench,
  Medal,
  MusicNotes,
  Star,
  SquaresFour,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

const ICON_MAP: Record<ActivityCategory, Icon> = {
  "annual-day": MaskHappy,
  "sports-day": Trophy,
  "art-craft": PaintBrush,
  "field-trip": Bus,
  festival: Confetti,
  graduation: GraduationCap,
  workshop: Wrench,
  competition: Medal,
  cultural: MusicNotes,
  other: Star,
};

const COLOR_MAP: Record<ActivityCategory, string> = {
  "annual-day": "#9B59B6",
  "sports-day": "#E67E22",
  "art-craft": "#E91E63",
  "field-trip": "#27AE60",
  festival: "#F39C12",
  graduation: "#2980B9",
  workshop: "#8D6E63",
  competition: "#D4AC0D",
  cultural: "#C0392B",
  other: "#7F8C8D",
};

export function CategoryFilter({ activeCategory }: { activeCategory?: string }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide justify-center flex-wrap">
      <Link
        href="/activities"
        className={cn(
          "flex items-center gap-1.5 px-3.5 py-2 rounded-[var(--radius-blob)] text-sm font-semibold transition-all whitespace-nowrap shrink-0",
          !activeCategory
            ? "bg-[var(--color-primary)] text-white shadow-[var(--shadow-md)]"
            : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-light)]/20 border border-[var(--color-border-light)]"
        )}
      >
        <SquaresFour size={16} weight="duotone" />
        All
      </Link>
      {ALL_CATEGORIES.map((cat) => {
        const IconComp = ICON_MAP[cat];
        const isActive = activeCategory === cat;
        return (
          <Link
            key={cat}
            href={`/activities/category/${cat}`}
            className={cn(
              "flex items-center gap-1.5 px-3.5 py-2 rounded-[var(--radius-blob)] text-sm font-semibold transition-all whitespace-nowrap shrink-0",
              isActive
                ? "text-white shadow-[var(--shadow-md)]"
                : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-light)]/20 border border-[var(--color-border-light)]"
            )}
            style={isActive ? { backgroundColor: COLOR_MAP[cat] } : undefined}
          >
            <IconComp size={16} weight={isActive ? "fill" : "duotone"} />
            {CATEGORY_LABELS[cat]}
          </Link>
        );
      })}
    </div>
  );
}
