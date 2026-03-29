# PRD: Kidzee Polichalur MVP 2 — Visibility & Auto-Publishing

## Introduction

MVP 1 delivered a centralized activity platform with admin CRUD and share links. MVP 2 closes the remaining customer requirements: **"When we update them here it would be great if they get uploaded in Google, YouTube, Insta and FB or similar platforms for visibility."**

MVP 2 uses pragmatic defaults — build what we can without waiting for Imtiaz's Batch 2 questionnaire responses. Every feature is designed to work in "manual-first" mode and upgrade to "auto" mode once API credentials are provided.

**Customer:** Imtiaz (Kidzee Polichalur franchise owner)
**Source:** WhatsApp conversation, 28 March 2026
**MVP 1 Status:** Live at https://kidzee-polichalur.vercel.app

---

## Goals

- Make activities discoverable on Google search ("Kidzee Polichalur" queries)
- Enable social media posting to Instagram and Facebook (queue → approve → publish pipeline)
- Support YouTube video embedding and deep linking
- Add image upload capability for activity photos
- Migrate data storage from fragile JSON files to Supabase
- Track all costs, effort, and API usage for client billing transparency

---

## Cost & Effort Tracker

### Estimated Effort

| Story | Effort (hrs) | Complexity | Dependencies |
|-------|-------------|------------|--------------|
| US-001: SEO meta tags + Open Graph | 1.5 | Low | None |
| US-002: Sitemap + robots.txt | 1 | Low | None |
| US-003: JSON-LD structured data | 1.5 | Low | US-001 |
| US-004: Supabase migration | 3 | Medium | Supabase project |
| US-005: Image upload | 3 | Medium | US-004 (Supabase Storage) |
| US-006: Meta API integration | 4 | High | Meta Business account |
| US-007: Social publish pipeline | 2.5 | Medium | US-006 |
| US-008: YouTube embed + deep link | 1.5 | Low | None |
| US-009: Activity detail page | 2 | Medium | US-005 |
| US-010: MVP 2 documentation | 1.5 | Low | All above |
| **Total** | **22 hrs** | | |

### API & Service Costs

| Service | Free Tier | Monthly Cost | Notes |
|---------|-----------|-------------|-------|
| Vercel (hosting) | 100GB bandwidth | Rs. 0 | Current plan sufficient |
| Supabase (database + storage) | 500MB DB, 1GB storage | Rs. 0 | Free tier covers MVP 2 |
| Meta Graph API | Unlimited | Rs. 0 | Free, requires app review |
| YouTube Data API | 10,000 units/day | Rs. 0 | Free, requires Google OAuth |
| Google Search Console | Unlimited | Rs. 0 | Free |
| Custom domain (.in) | N/A | Rs. 500-1500/year | Optional, pending Imtiaz response |
| **Total monthly** | | **Rs. 0** | All free tier |

### One-Time Setup Costs

| Item | Cost | Notes |
|------|------|-------|
| Meta App Review | Rs. 0 | Free but takes 5-10 business days |
| Google Cloud project (YouTube API) | Rs. 0 | Free |
| Supabase project | Rs. 0 | Free tier |
| Domain registration (if needed) | Rs. 500-1500 | Pending Imtiaz |
| **Total one-time** | **Rs. 0-1500** | |

---

## User Stories

### US-001: SEO Meta Tags + Open Graph
**Description:** As a parent searching Google for "Kidzee Polichalur," I want the platform to appear in search results with a rich preview so I can find and share it easily.

**Acceptance Criteria:**
- [ ] Every page has unique `<title>` and `<meta name="description">`
- [ ] Open Graph tags on all pages (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`)
- [ ] Twitter Card meta tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
- [ ] Homepage title: "Kidzee Polichalur — Preschool Activities & Events"
- [ ] Activities page title: "Activities — Kidzee Polichalur"
- [ ] Year page title: "2024 Activities — Kidzee Polichalur"
- [ ] OG image defaults to Kidzee logo (can be overridden per activity)
- [ ] `npm run build` passes
- [ ] Validate with https://metatags.io or Facebook Sharing Debugger

**Files:** `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/activities/page.tsx`, `src/app/activities/[year]/page.tsx`
**Effort:** 1.5 hrs

---

### US-002: Sitemap + Robots.txt
**Description:** As Google's crawler, I need a sitemap.xml and robots.txt so I can discover and index all activity pages.

**Acceptance Criteria:**
- [ ] `sitemap.xml` generated dynamically at `/sitemap.xml` via Next.js `sitemap.ts`
- [ ] Includes: homepage, `/activities`, each `/activities/{year}` page
- [ ] `robots.txt` at `/robots.txt` via Next.js `robots.ts`
- [ ] Robots allows all crawlers, points to sitemap URL
- [ ] Admin pages excluded from sitemap (not `/admin`, `/admin/login`)
- [ ] API routes excluded from sitemap
- [ ] `npm run build` passes

**Files:** `src/app/sitemap.ts`, `src/app/robots.ts`
**Effort:** 1 hr

---

### US-003: JSON-LD Structured Data
**Description:** As a search engine, I need structured data (Schema.org) to understand the content and display rich results.

**Acceptance Criteria:**
- [ ] Homepage: `Organization` schema with name, logo, address, URL
- [ ] Homepage: `EducationalOrganization` type with `preschool` descriptor
- [ ] Each activity: `Event` schema with name, date, description, location
- [ ] Breadcrumb schema on activity pages
- [ ] Validate with Google Rich Results Test (https://search.google.com/test/rich-results)
- [ ] `npm run build` passes

**Files:** `src/components/structured-data.tsx`, `src/app/page.tsx`, `src/app/activities/[year]/page.tsx`
**Effort:** 1.5 hrs

---

### US-004: Supabase Migration
**Description:** As the platform, I need persistent database storage so data survives Vercel serverless cold starts and supports image uploads.

**Acceptance Criteria:**
- [ ] Create Supabase project for Kidzee Polichalur (or use existing zoo-crm Supabase)
- [ ] Create `activities` table matching current Activity schema
- [ ] Create `social_posts` table matching current SocialPost schema
- [ ] Migrate `src/lib/data.ts` from JSON file I/O to Supabase client
- [ ] Migrate `src/lib/social-posts.ts` from JSON to Supabase
- [ ] Seed existing 10 demo activities into Supabase
- [ ] All existing CRUD operations work unchanged (GET, POST, DELETE)
- [ ] Environment variables: `SUPABASE_URL`, `SUPABASE_ANON_KEY`
- [ ] RLS policies: public read, authenticated write
- [ ] `npm run build` passes
- [ ] Verify in browser: activities load, admin can add/delete

**Files:** `src/lib/data.ts`, `src/lib/social-posts.ts`, `src/lib/supabase.ts` (new), migration SQL
**Effort:** 3 hrs
**Dependency:** Supabase project setup

---

### US-005: Image Upload for Activities
**Description:** As an admin, I want to upload photos when creating an activity so parents can see what happened.

**Acceptance Criteria:**
- [ ] Image upload field in admin "Add Activity" form (multi-file, max 10 images)
- [ ] Accept JPEG, PNG, WebP (max 5MB each)
- [ ] Upload to Supabase Storage bucket `activity-images`
- [ ] Store image URLs in activity.images array
- [ ] Show image thumbnails in activity cards (first image as hero, rest as count badge)
- [ ] Image gallery/lightbox on activity detail page (or expand on card)
- [ ] Images included in Open Graph tags (`og:image` = first activity image)
- [ ] Admin can remove uploaded images
- [ ] `npm run build` passes
- [ ] Verify in browser: upload images, see them on activity cards

**Files:** `src/app/admin/page.tsx`, `src/app/api/activities/route.ts`, `src/components/activity-card.tsx`, `src/components/image-upload.tsx` (new)
**Effort:** 3 hrs
**Dependency:** US-004 (Supabase Storage)

---

### US-006: Meta Graph API Integration
**Description:** As the platform, I need to connect to Meta's Graph API so activities can be published to Facebook Pages and Instagram Business accounts.

**Note:** This feature works in "manual-first" mode until Imtiaz provides Meta Business credentials. The UI is built, but actual publishing requires API credentials configured in environment variables.

**Acceptance Criteria:**
- [ ] Create `/api/social/publish` endpoint that posts to Meta Graph API
- [ ] Support Facebook Page posts: text + images via `/{page-id}/photos` or `/{page-id}/feed`
- [ ] Support Instagram Business posts: image + caption via `/{ig-user-id}/media` + `/{ig-user-id}/media_publish`
- [ ] Handle API errors gracefully (token expired, rate limit, permissions)
- [ ] Update social post status: "queued" → "publishing" → "published" / "failed"
- [ ] Store Meta post IDs in social_posts record for reference
- [ ] Works without credentials (graceful fallback: "Meta API not configured" message)
- [ ] Environment variables: `META_PAGE_ACCESS_TOKEN`, `META_PAGE_ID`, `META_IG_USER_ID`
- [ ] `npm run build` passes

**Files:** `src/app/api/social/publish/route.ts` (new), `src/lib/meta-api.ts` (new), `src/lib/social-posts.ts`
**Effort:** 4 hrs
**Dependency:** Meta Business account (from Imtiaz)

---

### US-007: Social Publish Pipeline UI
**Description:** As an admin, I want to review, approve, and publish social media posts from the dashboard instead of just queuing them.

**Acceptance Criteria:**
- [ ] "Social Posts" section in admin dashboard showing queued/published/failed posts
- [ ] Each queued post shows: caption preview, platform, created date, activity title
- [ ] "Publish Now" button on each queued post (calls `/api/social/publish`)
- [ ] "Edit Caption" ability before publishing
- [ ] Status badges: queued (yellow), published (green), failed (red)
- [ ] Published posts show platform post URL (link to Facebook/Instagram post)
- [ ] Failed posts show error message + "Retry" button
- [ ] If Meta API not configured: show "Copy Caption" button instead of "Publish"
- [ ] `npm run build` passes
- [ ] Verify in browser: queue a post, see it in list, publish/copy

**Files:** `src/app/admin/page.tsx`, `src/components/social-post-list.tsx` (new)
**Effort:** 2.5 hrs
**Dependency:** US-006

---

### US-008: YouTube Embed + Deep Link
**Description:** As a parent, I want to watch activity videos directly on the platform and as an admin, I want to easily link YouTube videos.

**Acceptance Criteria:**
- [ ] YouTube URL field in admin form auto-detects video ID from various URL formats (youtube.com/watch, youtu.be, shorts)
- [ ] Activity cards show video thumbnail from YouTube API (`https://img.youtube.com/vi/{id}/hqdefault.jpg`)
- [ ] Play button overlay on video thumbnail
- [ ] Click opens embedded YouTube player (iframe) inline or in modal
- [ ] Video embed is responsive (16:9 aspect ratio)
- [ ] OG meta tags include `og:video` for activities with YouTube links
- [ ] `npm run build` passes
- [ ] Verify in browser: add YouTube URL, see thumbnail, click to play

**Files:** `src/components/activity-card.tsx`, `src/components/youtube-embed.tsx` (new), `src/lib/youtube.ts` (new)
**Effort:** 1.5 hrs

---

### US-009: Activity Detail Page
**Description:** As a parent sharing an activity link, I want it to open a full dedicated page (not just an anchor on a list) with all photos, video, and details.

**Acceptance Criteria:**
- [ ] New route: `/activities/{year}/{id}` — full-page activity view
- [ ] Shows: title, date, category, full description, all images (gallery), video embed, tags
- [ ] Share buttons (same as card share panel)
- [ ] Social auto-post button
- [ ] Proper SEO meta tags (unique title, description, OG image from first activity image)
- [ ] JSON-LD Event schema for the specific activity
- [ ] Back button → returns to activities list
- [ ] Activity cards link to this detail page
- [ ] `npm run build` passes
- [ ] Verify in browser: click activity → see detail page → share → navigate back

**Files:** `src/app/activities/[year]/[id]/page.tsx` (new), `src/components/activity-gallery.tsx` (new)
**Effort:** 2 hrs
**Dependency:** US-005 (images), US-008 (video)

---

### US-010: MVP 2 Documentation
**Description:** As a stakeholder, I want updated documentation reflecting all MVP 2 features.

**Acceptance Criteria:**
- [ ] Update `docs/stakeholder-docs/STAKEHOLDER-REVIEW.md` with MVP 2 features
- [ ] New screenshots for: image upload, social publish pipeline, activity detail page, YouTube embed
- [ ] Update API reference with new endpoints
- [ ] Update roadmap (MVP 2 items → "Done", add MVP 3 items)
- [ ] Regenerate PDF
- [ ] Update cost tracker with actual hours spent
- [ ] `npm run build` passes (all apps in monorepo)

**Files:** `docs/stakeholder-docs/STAKEHOLDER-REVIEW.md`, `docs/stakeholder-docs/screenshots/`
**Effort:** 1.5 hrs
**Dependency:** All above stories complete

---

## Functional Requirements

- FR-1: Every public page must have unique SEO meta tags (title, description, OG, Twitter Card)
- FR-2: Dynamic `sitemap.xml` must include all public pages and exclude admin/API routes
- FR-3: JSON-LD structured data on homepage (Organization) and activities (Event)
- FR-4: All data must be stored in Supabase (not JSON files)
- FR-5: Admin can upload up to 10 images per activity (max 5MB each, JPEG/PNG/WebP)
- FR-6: Images stored in Supabase Storage with public URLs
- FR-7: Platform can publish to Facebook Pages via Meta Graph API (when configured)
- FR-8: Platform can publish to Instagram Business via Meta Graph API (when configured)
- FR-9: Social posts follow pipeline: queued → approved → published/failed
- FR-10: YouTube videos embedded inline with responsive player
- FR-11: Each activity has a dedicated detail page at `/activities/{year}/{id}`
- FR-12: All features degrade gracefully when API credentials are not configured

---

## Non-Goals (Out of Scope for MVP 2)

- Direct YouTube video upload (admin pastes link; direct upload is MVP 3)
- Google Business Profile integration (MVP 3)
- Parent login/accounts (MVP 3)
- WhatsApp notifications to parents (MVP 3)
- Email newsletters (MVP 3)
- Analytics/engagement tracking (MVP 3)
- Multi-language support (MVP 3)
- PWA/offline capability (MVP 3)
- Custom domain setup (pending Imtiaz's response on budget)
- Automated scheduling (post at specific time) — MVP 2 is "publish now"
- Image watermarking with school logo (MVP 3)
- Activity edit/update (only add/delete in MVP 2; edit is MVP 3)

---

## Technical Considerations

### Supabase Setup
- Use existing zoo-crm Supabase project or create dedicated Kidzee project
- Tables: `activities`, `social_posts`
- Storage bucket: `activity-images` (public read, authenticated write)
- RLS: public SELECT on both tables, authenticated INSERT/DELETE

### Meta Graph API
- Requires Meta Business account + Facebook Page + Instagram Business
- Page Access Token (long-lived, 60-day) stored in env vars
- Instagram publishing requires image URL (not upload) — use Supabase Storage public URLs
- Rate limits: 200 posts/hour (more than sufficient)
- App review required for `pages_manage_posts` and `instagram_content_publish` permissions

### YouTube
- No API needed for embedding — just parse video ID from URL
- Thumbnail via `https://img.youtube.com/vi/{VIDEO_ID}/hqdefault.jpg`
- Embed via `https://www.youtube.com/embed/{VIDEO_ID}`

### SEO
- Next.js 16 `generateMetadata()` for dynamic meta tags
- `sitemap.ts` and `robots.ts` in app directory (native Next.js support)
- JSON-LD via `<script type="application/ld+json">` in page components

---

## Success Metrics

| Metric | Target | How to Measure |
|--------|--------|---------------|
| Google indexing | All public pages indexed within 2 weeks of Search Console submission | Google Search Console → Coverage |
| Social post publishing | Admin can publish to FB/Insta in < 3 clicks from dashboard | Manual testing |
| Image upload | Admin can add photos in < 30 seconds per activity | Manual testing |
| Page load | All pages load in < 2 seconds on 4G mobile | Lighthouse audit |
| Uptime | No data loss on Vercel restarts | Verify activities persist after redeployment |

---

## Implementation Order

```
Phase 1 (No external deps — build immediately):
  US-001: SEO meta tags ──┐
  US-002: Sitemap/robots ──┤── Can ship independently
  US-003: JSON-LD ─────────┘
  US-008: YouTube embed ───── No API needed

Phase 2 (Supabase setup required):
  US-004: Supabase migration ──┐
  US-005: Image upload ────────┘── Sequential

Phase 3 (Meta credentials required — build UI, mock API):
  US-006: Meta API integration ──┐
  US-007: Social publish pipeline ┘── Sequential

Phase 4 (Depends on all above):
  US-009: Activity detail page
  US-010: Documentation update
```

---

## Open Questions (Resolved by Batch 2 Questionnaire)

| # | Question | Default (if no response) | Impact |
|---|----------|-------------------------|--------|
| 1 | Does Imtiaz have a Meta Business account? | Build UI anyway, add credentials later | US-006 scope |
| 2 | Does Imtiaz have a YouTube channel? | Embed-only (no upload) | US-008 scope |
| 3 | Does Imtiaz want a custom domain? | Keep vercel.app subdomain | SEO impact |
| 4 | Monthly budget? | Rs. 0 (free tier only) | Service selection |
| 5 | Auto-post or approve-first? | Approve-first (safer) | US-007 flow |
| 6 | Who reviews content? | Admin only | Access control |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-29 | Initial PRD — 10 user stories, 22 hrs estimated |

---

*Prepared by: Aldrin Stellus (aldrin@atc.xyz) — ZOO CRM Platform*
