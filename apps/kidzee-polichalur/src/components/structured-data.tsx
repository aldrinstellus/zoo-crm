import type { Activity } from "@/lib/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://kidzee-polichalur.vercel.app";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Kidzee Polichalur",
    description:
      "Preschool and kindergarten in Polichalur, Tamil Nadu. Nurturing young minds with love, creativity, and joy.",
    url: BASE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Polichalur",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ActivityEventSchema({ activity }: { activity: Activity }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: activity.title,
    description: activity.description,
    startDate: activity.date,
    location: {
      "@type": "Place",
      name: "Kidzee Polichalur",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Polichalur",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
    },
    image: activity.images.length > 0 ? activity.images[0] : undefined,
    organizer: {
      "@type": "Organization",
      name: "Kidzee Polichalur",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url?: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
