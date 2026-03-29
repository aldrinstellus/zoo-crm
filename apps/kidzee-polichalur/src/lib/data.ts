import { promises as fs } from "fs";
import path from "path";
import type { Activity } from "./types";
import { CATEGORY_LABELS } from "./types";

const DATA_FILE = path.join(process.cwd(), "data", "activities.json");

async function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
  }
}

export async function getActivities(): Promise<Activity[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as Activity[];
}

export async function getActivitiesByYear(year: number): Promise<Activity[]> {
  const all = await getActivities();
  return all.filter((a) => a.year === year).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getAvailableYears(): Promise<number[]> {
  const all = await getActivities();
  const years = [...new Set(all.map((a) => a.year))];
  return years.sort((a, b) => b - a);
}

export async function getActivityById(id: string): Promise<Activity | undefined> {
  const all = await getActivities();
  return all.find((a) => a.id === id);
}

export async function addActivity(activity: Activity): Promise<Activity> {
  const all = await getActivities();
  all.push(activity);
  await fs.writeFile(DATA_FILE, JSON.stringify(all, null, 2));
  return activity;
}

export async function updateActivity(id: string, updates: Partial<Activity>): Promise<Activity | null> {
  const all = await getActivities();
  const index = all.findIndex((a) => a.id === id);
  if (index === -1) return null;
  all[index] = { ...all[index], ...updates, updatedAt: new Date().toISOString() };
  await fs.writeFile(DATA_FILE, JSON.stringify(all, null, 2));
  return all[index];
}

export async function deleteActivity(id: string): Promise<boolean> {
  const all = await getActivities();
  const filtered = all.filter((a) => a.id !== id);
  if (filtered.length === all.length) return false;
  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2));
  return true;
}

export async function getActivitiesByCategory(category: string): Promise<Activity[]> {
  const all = await getActivities();
  return all
    .filter((a) => a.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getActivitiesPaginated(
  page: number = 1,
  limit: number = 10,
  filters?: { year?: number; category?: string; q?: string }
): Promise<{ activities: Activity[]; total: number; page: number; totalPages: number }> {
  let all = await getActivities();
  if (filters?.year) all = all.filter((a) => a.year === filters.year);
  if (filters?.category) all = all.filter((a) => a.category === filters.category);
  if (filters?.q) {
    const q = filters.q.toLowerCase();
    all = all.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)) ||
        CATEGORY_LABELS[a.category].toLowerCase().includes(q)
    );
  }
  all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const total = all.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  return { activities: all.slice(start, start + limit), total, page, totalPages };
}

export async function searchActivities(query: string): Promise<Activity[]> {
  const all = await getActivities();
  const q = query.toLowerCase();
  return all.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q)) ||
      CATEGORY_LABELS[a.category].toLowerCase().includes(q)
  );
}
