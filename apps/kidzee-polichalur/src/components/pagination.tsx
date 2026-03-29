"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  function pageUrl(page: number) {
    const separator = basePath.includes("?") ? "&" : "?";
    return `${basePath}${separator}page=${page}`;
  }

  // Build page numbers with ellipsis
  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-8" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link
          href={pageUrl(currentPage - 1)}
          className="flex items-center gap-1 px-3 py-2 rounded-[var(--radius-blob)] text-sm font-semibold text-[var(--color-text-secondary)] bg-[var(--color-surface)] border border-[var(--color-border-light)] hover:bg-[var(--color-primary-light)]/20 transition-all"
        >
          <CaretLeft size={14} weight="bold" />
          Prev
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 rounded-[var(--radius-blob)] text-sm font-semibold text-[var(--color-text-muted)] bg-[var(--color-surface)] border border-[var(--color-border-light)] opacity-50 cursor-not-allowed">
          <CaretLeft size={14} weight="bold" />
          Prev
        </span>
      )}

      {pages.map((p, i) =>
        p === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="px-2 py-2 text-sm text-[var(--color-text-muted)]"
          >
            ...
          </span>
        ) : (
          <Link
            key={p}
            href={pageUrl(p)}
            className={cn(
              "px-3.5 py-2 rounded-[var(--radius-blob)] text-sm font-semibold transition-all",
              p === currentPage
                ? "bg-[var(--color-primary)] text-white shadow-[var(--shadow-md)]"
                : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border-light)] hover:bg-[var(--color-primary-light)]/20"
            )}
          >
            {p}
          </Link>
        )
      )}

      {currentPage < totalPages ? (
        <Link
          href={pageUrl(currentPage + 1)}
          className="flex items-center gap-1 px-3 py-2 rounded-[var(--radius-blob)] text-sm font-semibold text-[var(--color-text-secondary)] bg-[var(--color-surface)] border border-[var(--color-border-light)] hover:bg-[var(--color-primary-light)]/20 transition-all"
        >
          Next
          <CaretRight size={14} weight="bold" />
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 rounded-[var(--radius-blob)] text-sm font-semibold text-[var(--color-text-muted)] bg-[var(--color-surface)] border border-[var(--color-border-light)] opacity-50 cursor-not-allowed">
          Next
          <CaretRight size={14} weight="bold" />
        </span>
      )}
    </nav>
  );
}
