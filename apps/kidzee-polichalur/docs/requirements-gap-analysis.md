# Kidzee Polichalur — Requirements Gap Analysis

> **Version:** 1.0 (Pre-questionnaire)
> **Date:** March 29, 2026
> **Status:** Pending stakeholder input

---

## 1. Current State vs Requirements

| # | Requirement (from Imtiaz) | Current Status | Gap | Priority |
|---|---|---|---|---|
| 1 | Centralized activity platform | **DONE** — Home page, activity listing, year browsing | None | - |
| 2 | Public access for everyone | **DONE** — No auth required for public pages | None | - |
| 3 | Admin access for year-wise uploads | **DONE** — Password-protected admin CRUD | None | - |
| 4 | Auto-publish to Google | **GAP** — No Google Business Profile integration | Build or integrate | High |
| 5 | Auto-publish to YouTube | **GAP** — Video URLs supported but no upload | Build or integrate | High |
| 6 | Auto-publish to Instagram | **GAP** — No Instagram API integration | Build or integrate | High |
| 7 | Auto-publish to Facebook | **GAP** — No Facebook API integration | Build or integrate | High |
| 8 | "Similar platforms for visibility" | **PARTIAL** — Website exists, but no SEO/OG tags | Enhance | Medium |

---

## 2. Phased Implementation Roadmap

### Phase 1: Quick Wins (Week 1)
*No API keys needed, no stakeholder setup required*

- [ ] Add Open Graph meta tags to all activity pages (so links look good when shared on WhatsApp/Facebook)
- [ ] Add "Share" buttons per activity (WhatsApp, Facebook, Instagram, Copy Link)
- [ ] Add SEO meta tags + sitemap.xml for Google indexing
- [ ] Add school branding (logo, colors, name from questionnaire)
- [ ] Activity image gallery with lightbox

### Phase 2: Social Media Integration (Week 2-3)
*Requires stakeholder social media accounts + API access*

- [ ] Facebook Page auto-posting via Meta Graph API
- [ ] Instagram auto-posting via Instagram Content Publishing API
- [ ] YouTube video upload via YouTube Data API v3
- [ ] Google Business Profile posting via GBP API
- [ ] Admin UI: toggle which platforms to post to per activity
- [ ] Admin UI: preview post before publishing
- [ ] Optional: scheduling (post at a specific time)

### Phase 3: Communication & Analytics (Week 3-4)
*Requires parent contact info + WhatsApp setup*

- [ ] WhatsApp sharing to parent groups (via WhatsApp Business API or share links)
- [ ] Activity view counter / basic analytics
- [ ] Monthly activity digest (email or WhatsApp)
- [ ] Custom domain setup (if requested)
- [ ] Image watermarking with school logo

---

## 3. Social Media Integration — Tool Options

### Option A: Direct API Integration (Build It)
Build social media posting directly into the app.

| Platform | API | Free Tier | Limitations |
|---|---|---|---|
| Facebook | Meta Graph API | Free | Requires Facebook Page, App Review for public use |
| Instagram | Instagram Content Publishing API | Free | Business account required, no Stories/Reels via API |
| YouTube | YouTube Data API v3 | 10,000 units/day free | Upload = 1,600 units, ~6 uploads/day |
| Google Business | Google Business Profile API | Free | Requires verified business listing |

**Pros:** Full control, no monthly cost, integrated UX
**Cons:** API setup complexity, each platform has approval process, maintenance burden

### Option B: Middleware (Buffer / Zapier)
Use a third-party tool to handle social media posting.

| Tool | Free Tier | Paid | Features |
|---|---|---|---|
| Buffer | 3 channels, 10 scheduled posts | $6/mo/channel | Multi-platform scheduling, analytics |
| Hootsuite | Limited free | $99/mo | Enterprise features, team management |
| Zapier | 100 tasks/mo | $20/mo (750 tasks) | Webhook trigger → post to any platform |
| Make.com | 1,000 ops/mo | $9/mo | Visual automation builder |
| IFTTT | 2 applets free | $3.50/mo | Simple if-this-then-that automation |

**Pros:** Quick setup, handles API complexity, multi-platform out of the box
**Cons:** Monthly cost, dependency on third party, less customizable

### Option C: Hybrid (Recommended)
- **Phase 1:** Share buttons + OG tags (zero cost, immediate value)
- **Phase 2:** Zapier/Make.com webhook from our app → auto-post (low cost, fast to build)
- **Phase 3:** Replace with direct API if scale/cost justifies it

---

## 4. Media Storage Options

| Option | Free Tier | Cost at Scale | Pros | Cons |
|---|---|---|---|---|
| Vercel Blob | 256 MB free | $0.15/GB/mo | Already on Vercel, simple API | Limited free tier |
| Cloudinary | 25 GB storage, 25 GB bandwidth | Pay as you go | Auto-resize, optimization, transformations | Another service to manage |
| Supabase Storage | 1 GB free | $0.021/GB/mo | Generous free tier, good API | Needs Supabase project |
| Local JSON (current) | Unlimited (on disk) | Serverless = ephemeral | Zero setup | Data lost on redeploy |

**Current issue:** The app uses file-based JSON storage (`data/activities.json`) which doesn't persist on Vercel serverless. **This needs to be migrated to a database/storage service before going to production.**

---

## 5. Pending — Awaiting Questionnaire Responses

The following decisions are blocked until Imtiaz responds:

1. **Which social media platforms** to prioritize (may not need all 4)
2. **Auto-post vs manual share** preference (determines build complexity)
3. **Budget** — determines whether we use free APIs or middleware
4. **Existing social media accounts** — determines API setup path
5. **Content approval workflow** — auto-publish or review first?
6. **Parent notification preference** — WhatsApp, email, or just website?
7. **Storage migration** — need to decide on Supabase vs Cloudinary vs Vercel Blob
8. **Custom domain** — if yes, need to set up DNS

---

*This document will be updated after receiving the completed questionnaire from Imtiaz.*
