import { NextRequest, NextResponse } from "next/server";
import { getActivities, addActivity, deleteActivity, updateActivity } from "@/lib/data";
import type { Activity } from "@/lib/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get("year");

  let activities = await getActivities();

  if (year) {
    activities = activities.filter((a) => a.year === parseInt(year));
  }

  activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return NextResponse.json(activities);
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const now = new Date().toISOString();
  const activity: Activity = {
    id: Date.now().toString(),
    title: body.title,
    description: body.description,
    date: body.date,
    year: new Date(body.date).getFullYear(),
    category: body.category,
    images: body.images || [],
    videoUrl: body.videoUrl || undefined,
    tags: body.tags || [],
    createdAt: now,
    updatedAt: now,
  };

  await addActivity(activity);
  return NextResponse.json(activity, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...updates } = body;
  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  // Recalculate year if date changed
  if (updates.date) {
    updates.year = new Date(updates.date).getFullYear();
  }

  const updated = await updateActivity(id, updates);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const deleted = await deleteActivity(id);
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
