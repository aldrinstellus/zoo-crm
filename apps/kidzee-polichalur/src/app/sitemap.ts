import type { MetadataRoute } from "next";
import { getActivities, getAvailableYears } from "@/lib/data";
import { ALL_CATEGORIES } from "@/lib/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://kidzee-polichalur.vercel.app";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/activities`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Year pages
  const years = await getAvailableYears();
  const yearPages: MetadataRoute.Sitemap = years.map((year) => ({
    url: `${baseUrl}/activities/${year}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Activity detail pages (only if the route exists — will be added when detail page is created)
  const activities = await getActivities();
  const activityPages: MetadataRoute.Sitemap = activities.map((activity) => ({
    url: `${baseUrl}/activities/${activity.year}/${activity.id}`,
    lastModified: new Date(activity.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = ALL_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/activities/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...yearPages, ...activityPages, ...categoryPages];
}
