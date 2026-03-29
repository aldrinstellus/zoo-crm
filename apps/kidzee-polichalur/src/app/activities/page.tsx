import type { Metadata } from "next";
import { getActivitiesPaginated, getAvailableYears } from "@/lib/data";
import { ActivityCard } from "@/components/activity-card";
import { YearSelector } from "@/components/year-selector";
import { CategoryFilter } from "@/components/category-filter";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/search-bar";
import { MagnifyingGlass } from "@phosphor-icons/react/ssr";

export const metadata: Metadata = {
  title: "All Activities",
  description:
    "Browse all preschool activities and events at Kidzee Polichalur. Filter by year to explore celebrations, sports days, workshops, and more.",
};

export const dynamic = "force-dynamic";

export default async function ActivitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const page = sp.page ? parseInt(sp.page) : 1;
  const query = sp.q || "";
  const years = await getAvailableYears();

  const { activities, total, totalPages } = await getActivitiesPaginated(page, 6, {
    q: query || undefined,
  });

  // Build basePath for pagination preserving search query
  let basePath = "/activities";
  if (query) basePath += `?q=${encodeURIComponent(query)}`;

  return (
    <div>
      <div className="py-8 px-4 bg-[var(--color-bg-brand)]">
        <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h1
              className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text)] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {query ? `Results for "${query}"` : "All Activities"}
            </h1>
            <p className="text-[var(--color-text-secondary)]">
              {query
                ? `${total} ${total === 1 ? "activity" : "activities"} found`
                : "Browse all our preschool activities and events"}
            </p>
          </div>

          {/* Search bar */}
          <div className="mb-6">
            <SearchBar defaultValue={query} />
          </div>

          {/* Category filter */}
          <div className="mb-6">
            <CategoryFilter />
          </div>

          {/* Year selector (hide when searching) */}
          {!query && (
            <div className="mb-8">
              <YearSelector years={years} />
            </div>
          )}

          {/* Results count */}
          {total > 0 && (
            <p className="text-sm text-[var(--color-text-muted)] text-center mb-6">
              Showing {(page - 1) * 6 + 1}-{Math.min(page * 6, total)} of {total}{" "}
              {total === 1 ? "activity" : "activities"}
            </p>
          )}

          {activities.length === 0 ? (
            <div className="text-center py-16 bg-[var(--color-surface)] rounded-2xl border-2 border-dashed border-[var(--color-border-light)]">
              <div className="mb-4 flex justify-center">
                <MagnifyingGlass size={48} weight="duotone" color="var(--color-text-muted)" />
              </div>
              <p className="text-[var(--color-text-secondary)] text-lg">
                {query ? `No activities match "${query}"` : "No activities found"}
              </p>
              <p className="text-[var(--color-text-muted)] text-sm mt-1">
                {query ? "Try a different search term." : "Check back later for updates!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {activities.map((activity, i) => (
                <ActivityCard key={activity.id} activity={activity} index={i} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <Pagination currentPage={page} totalPages={totalPages} basePath={basePath} />
        </div>
      </div>
    </div>
  );
}
