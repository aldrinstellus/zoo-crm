import type { Metadata } from "next";
import { getActivitiesByYear, getAvailableYears } from "@/lib/data";
import { ActivityCard } from "@/components/activity-card";
import { YearSelector } from "@/components/year-selector";
import { MagnifyingGlass } from "@phosphor-icons/react/ssr";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const { year } = await params;
  return {
    title: `${year} Activities`,
    description: `Explore Kidzee Polichalur's preschool activities from ${year}. Dance performances, sports events, festivals, and creative workshops.`,
  };
}

export const dynamic = "force-dynamic";

export default async function YearActivitiesPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year: yearStr } = await params;
  const year = parseInt(yearStr);
  const activities = await getActivitiesByYear(year);
  const years = await getAvailableYears();

  return (
    <div>
      <div className="py-8 px-4 bg-[var(--color-bg-brand)]">
        <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1
              className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text)] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Activities - {year}
            </h1>
            <p className="text-[var(--color-text-secondary)]">
              {activities.length} {activities.length === 1 ? "activity" : "activities"} in {year}
            </p>
          </div>

          <div className="mb-8">
            <YearSelector years={years} activeYear={year} />
          </div>

          {activities.length === 0 ? (
            <div className="text-center py-16 bg-[var(--color-surface)] rounded-2xl border-2 border-dashed border-[var(--color-border-light)]">
              <div className="mb-4 flex justify-center">
                <MagnifyingGlass size={48} weight="duotone" color="var(--color-text-muted)" />
              </div>
              <p className="text-[var(--color-text-secondary)] text-lg">No activities found for {year}</p>
              <p className="text-[var(--color-text-muted)] text-sm mt-1">Try selecting a different year.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {activities.map((activity, i) => (
                <ActivityCard key={activity.id} activity={activity} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
