import { NextRequest, NextResponse } from "next/server";
import { addSocialPost, getSocialPosts, generateCaption, deleteSocialPost, updateSocialPost } from "@/lib/social-posts";
import type { SocialPlatform, SocialPost } from "@/lib/social-posts";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const activityId = searchParams.get("activityId");

  let posts = await getSocialPosts();

  if (activityId) {
    posts = posts.filter((p) => p.activityId === activityId);
  }

  posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { activityId, activityTitle, description, images, platform, tags, scheduledAt } = body as {
    activityId: string;
    activityTitle: string;
    description: string;
    images?: string[];
    platform: SocialPlatform;
    tags?: string[];
    scheduledAt?: string;
  };

  if (!activityId || !activityTitle || !description || !platform) {
    return NextResponse.json(
      { error: "Missing required fields: activityId, activityTitle, description, platform" },
      { status: 400 }
    );
  }

  if (!["instagram", "facebook", "both"].includes(platform)) {
    return NextResponse.json(
      { error: "Platform must be 'instagram', 'facebook', or 'both'" },
      { status: 400 }
    );
  }

  const caption = generateCaption(activityTitle, description, tags || []);

  const post: SocialPost = {
    id: Date.now().toString(),
    activityId,
    activityTitle,
    caption,
    images: images || [],
    platform,
    status: "queued",
    scheduledAt: scheduledAt || undefined,
    createdAt: new Date().toISOString(),
  };

  await addSocialPost(post);

  return NextResponse.json(
    {
      post,
      preview: {
        caption,
        platform,
        imageCount: post.images.length,
      },
    },
    { status: 201 }
  );
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

  const deleted = await deleteSocialPost(id);
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
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

  const updated = await updateSocialPost(id, updates);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}
