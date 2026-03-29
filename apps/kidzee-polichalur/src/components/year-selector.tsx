"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

export function YearSelector({
  years,
  activeYear,
  baseHref,
}: {
  years: number[];
  activeYear?: number;
  /** Base path for year links. Defaults to "/activities". When set (e.g. "/activities/category/sports-day"), years link via ?year= query param. */
  baseHref?: string;
}) {
  const useQueryParam = !!baseHref;

  function yearHref(year: number) {
    if (useQueryParam) return `${baseHref}?year=${year}`;
    return `/activities/${year}`;
  }

  function allHref() {
    if (useQueryParam) return baseHref!;
    return "/activities";
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Link
        href={allHref()}
        className={cn(
          "px-4 py-2 rounded-[var(--radius-blob)] text-sm font-semibold transition-all",
          !activeYear
            ? "bg-[var(--color-primary)] text-white shadow-[var(--shadow-md)]"
            : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-light)]/20 border border-[var(--color-border-light)]"
        )}
      >
        All Years
      </Link>
      {years.map((year) => (
        <Link
          key={year}
          href={yearHref(year)}
          className={cn(
            "px-4 py-2 rounded-[var(--radius-blob)] text-sm font-semibold transition-all",
            activeYear === year
              ? "bg-[var(--color-primary)] text-white shadow-[var(--shadow-md)]"
              : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-light)]/20 border border-[var(--color-border-light)]"
          )}
        >
          {year}
        </Link>
      ))}
    </div>
  );
}
