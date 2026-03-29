export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  year: number;
  category: ActivityCategory;
  images: string[]; // URLs or paths
  videoUrl?: string; // YouTube or other video URL
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type ActivityCategory =
  | "annual-day"
  | "sports-day"
  | "art-craft"
  | "field-trip"
  | "festival"
  | "graduation"
  | "workshop"
  | "competition"
  | "cultural"
  | "other";

export const CATEGORY_LABELS: Record<ActivityCategory, string> = {
  "annual-day": "Annual Day",
  "sports-day": "Sports Day",
  "art-craft": "Art & Craft",
  "field-trip": "Field Trip",
  festival: "Festival Celebration",
  graduation: "Graduation",
  workshop: "Workshop",
  competition: "Competition",
  cultural: "Cultural Event",
  other: "Other",
};

/** @deprecated Use CATEGORY_ICONS with the CategoryIcon component instead */
export const CATEGORY_EMOJIS: Record<ActivityCategory, string> = {
  "annual-day": "🎭",
  "sports-day": "🏃",
  "art-craft": "🎨",
  "field-trip": "🚌",
  festival: "🎉",
  graduation: "🎓",
  workshop: "🔧",
  competition: "🏆",
  cultural: "🎶",
  other: "📌",
};

/** Phosphor icon component names for each activity category */
export const CATEGORY_ICONS: Record<ActivityCategory, string> = {
  "annual-day": "MaskHappy",
  "sports-day": "Trophy",
  "art-craft": "PaintBrush",
  "field-trip": "Bus",
  festival: "Confetti",
  graduation: "GraduationCap",
  workshop: "Wrench",
  competition: "Medal",
  cultural: "MusicNotes",
  other: "Star",
};

export const CATEGORY_DESCRIPTIONS: Record<ActivityCategory, string> = {
  "annual-day": "Our annual celebrations bring together students, parents, and teachers for unforgettable performances and joy.",
  "sports-day": "Little champions showcase their athletic skills in races, relays, and team games.",
  "art-craft": "Creative workshops where young artists explore painting, clay modeling, and paper crafts.",
  "field-trip": "Exciting excursions to zoos, farms, museums, and parks for hands-on learning.",
  festival: "Colorful celebrations of Diwali, Christmas, Pongal, and other festivals with crafts and traditions.",
  graduation: "Proud moments as our senior batch celebrates their preschool journey with caps and gowns.",
  workshop: "Hands-on science, cooking, and learning workshops that spark curiosity.",
  competition: "Fancy dress, talent shows, and creative competitions that build confidence.",
  cultural: "Patriotic celebrations, cultural programs, and heritage activities.",
  other: "Special events and unique activities at Kidzee Polichalur.",
};

/** All category slugs for iteration */
export const ALL_CATEGORIES: ActivityCategory[] = [
  "annual-day",
  "sports-day",
  "art-craft",
  "field-trip",
  "festival",
  "graduation",
  "workshop",
  "competition",
  "cultural",
  "other",
];
