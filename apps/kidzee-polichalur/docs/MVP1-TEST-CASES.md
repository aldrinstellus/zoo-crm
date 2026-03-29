# Kidzee Polichalur MVP 1 — Comprehensive Test & UAT Documentation

**Version**: 1.0.0
**Date**: 2026-03-29
**App Version**: 1.1.0
**Live URL**: https://kidzee-polichalur.vercel.app
**Admin URL**: https://kidzee-polichalur.vercel.app/admin
**Admin Password**: `kidzee2024`

---

## Test Summary Dashboard

| Category | Count | P0 (Critical) | P1 (High) | P2 (Medium) |
|----------|-------|---------------|-----------|-------------|
| Functional Tests | 168 | 42 | 78 | 48 |
| UX/UI Tests | 66 | 12 | 32 | 22 |
| Accessibility Tests | 25 | 8 | 12 | 5 |
| UAT Scenarios | 8 | 4 | 3 | 1 |
| **TOTAL** | **267** | **66** | **125** | **76** |

### Feature Coverage Matrix

| Feature Area | Functional | UX/UI | A11y | UAT | Total |
|-------------|-----------|-------|------|-----|-------|
| Homepage | 15 | 8 | 3 | 2 | 28 |
| Activities Listing | 18 | 6 | 2 | 2 | 28 |
| Activity Detail | 22 | 4 | 4 | 2 | 32 |
| Category Pages | 12 | 2 | 1 | 1 | 16 |
| Year Pages | 6 | 2 | 1 | 1 | 10 |
| Admin Login | 10 | 4 | 2 | 1 | 17 |
| Admin Dashboard | 25 | 6 | 3 | 2 | 36 |
| API Endpoints | 20 | — | — | 1 | 21 |
| SEO & Metadata | 12 | — | — | 1 | 13 |
| Navigation | 10 | 4 | 3 | 2 | 19 |
| Activity Card | 10 | 6 | 2 | — | 18 |
| Social Share | 8 | 4 | 2 | 1 | 15 |
| Brand DNA | — | 12 | — | — | 12 |
| Responsive | — | 20 | 2 | 1 | 23 |

---

## Environment Setup

### Required Browsers
| Browser | Version | Platform |
|---------|---------|----------|
| Chrome | Latest | macOS / Windows |
| Safari | Latest | macOS / iOS |
| Firefox | Latest | macOS / Windows |
| Edge | Latest | Windows |

### Required Devices / Viewports
| Device | Width | Type |
|--------|-------|------|
| iPhone SE | 375px | Mobile |
| iPhone 14 Pro | 393px | Mobile |
| iPad | 768px | Tablet |
| iPad Pro | 1024px | Tablet |
| MacBook Air | 1280px | Desktop |
| iMac / External | 1920px | Large Desktop |

### Test Data Prerequisites
- Seed data loaded (10 demo activities across 2023-2024)
- To seed: POST to `https://kidzee-polichalur.vercel.app/api/seed`
- Admin password: `kidzee2024`
- All 10 categories have at least 1 activity in seed data

### Test Case Format Legend
| Column | Description |
|--------|-------------|
| **ID** | Unique identifier (Section-Area-Number) |
| **Test Case** | What is being tested |
| **Preconditions** | Required state before test |
| **Steps** | Numbered actions to perform |
| **Expected Result** | What should happen |
| **Priority** | P0=Critical, P1=High, P2=Medium |
| **Status** | PASS / FAIL / BLOCKED / SKIP |

---

# SECTION 1: FUNCTIONAL TEST CASES

---

## 1.1 Homepage (`/`)

| ID | Test Case | Preconditions | Steps | Expected Result | Priority | Status |
|----|-----------|---------------|-------|-----------------|----------|--------|
| FN-HOME-001 | Page loads successfully | Seed data exists | 1. Navigate to `/` | Page loads with all sections: hero, wave divider, stats, recent activities, categories, year selector, footer. No console errors. | P0 | |
| FN-HOME-002 | Hero section content | None | 1. Navigate to `/` 2. Observe hero section | Displays: Kidzee logo (SVG), "Kidzee Polichalur" heading, tagline "Where every day is an adventure!", two CTA buttons ("Explore Activities" + "Admin Portal") | P0 | |
| FN-HOME-003 | "Explore Activities" CTA | None | 1. Navigate to `/` 2. Click "Explore Activities" button | Navigates to `/activities`. Button has white bg, purple text, blob radius (15px 5px). | P0 | |
| FN-HOME-004 | "Admin Portal" CTA | None | 1. Navigate to `/` 2. Click "Admin Portal" button | Navigates to `/admin`. Button has translucent white bg (white/20), backdrop blur. | P1 | |
| FN-HOME-005 | Animated stats count up | None | 1. Navigate to `/` 2. Scroll down to stats section | 4 stat cards animate from 0 to final value (count-up effect) when they enter viewport. Cards: years active, total activities, students, events/year. | P1 | |
| FN-HOME-006 | Stats animate only once | None | 1. Navigate to `/` 2. Scroll to stats (triggers animation) 3. Scroll away 4. Scroll back to stats | Count-up animation plays only on first scroll into view. Does NOT replay on subsequent scrolls. | P2 | |
| FN-HOME-007 | Recent activities grid | Seed data exists | 1. Navigate to `/` 2. Scroll to "Recent Activities" section | Shows exactly 4 most recent activities as cards, sorted by date descending. | P0 | |
| FN-HOME-008 | Activity cards link correctly | Seed data exists | 1. Navigate to `/` 2. Click any activity card title | Navigates to `/activities/[year]/[id]` for the correct activity. | P0 | |
| FN-HOME-009 | Category filter shows all categories | None | 1. Navigate to `/` 2. Scroll to categories section | All 10 category pills visible: Annual Day, Sports Day, Art & Craft, Field Trip, Festival, Graduation, Workshop, Competition, Cultural, Other. Each has correct Phosphor icon. | P1 | |
| FN-HOME-010 | Category pills navigate | None | 1. Navigate to `/` 2. Click "Festival" category pill | Navigates to `/activities/category/festival`. | P1 | |
| FN-HOME-011 | Year selector shows years | Seed data exists (2023, 2024) | 1. Navigate to `/` 2. Scroll to year selector | Shows "All Years" button + year buttons for each year with activities (e.g., 2023, 2024). | P1 | |
| FN-HOME-012 | Year buttons navigate | Seed data exists | 1. Navigate to `/` 2. Click "2024" year button | Navigates to `/activities/2024`. | P1 | |
| FN-HOME-013 | Wave divider renders | None | 1. Navigate to `/` 2. Observe transition between hero and stats | SVG wave divider renders seamlessly between hero gradient and stats section. No visible gap. Colors match adjacent sections. | P2 | |
| FN-HOME-014 | Chennai illustrations render | None | 1. Navigate to `/` on desktop (>768px) 2. Observe hero section | Four illustrations visible: auto-rickshaw (bottom-left, 20% opacity), palm tree (bottom-right, 12% opacity), kolam pattern (top-right, 10% opacity). All have aria-hidden="true". | P2 | |
| FN-HOME-015 | Hero shimmer animation | None | 1. Navigate to `/` 2. Observe hero section for 10+ seconds | Gradient shimmer sweeps left-to-right (4s cycle, 3s delay between repeats). Radial glow pulses at center (6s cycle, scale 1→1.15). Both animate continuously. | P2 | |

---

## 1.2 Activities Listing (`/activities`)

| ID | Test Case | Preconditions | Steps | Expected Result | Priority | Status |
|----|-----------|---------------|-------|-----------------|----------|--------|
| FN-ACT-001 | Page loads with all elements | Seed data exists | 1. Navigate to `/activities` | Page shows: search bar, category filter (horizontal), year selector, activity grid, pagination (if >6 activities). No console errors. | P0 | |
| FN-ACT-002 | Default pagination (6 per page) | 10+ activities exist | 1. Navigate to `/activities` | Exactly 6 activity cards displayed. Pagination shows page numbers. Total pages = ceil(total/6). | P0 | |
| FN-ACT-003 | Search — valid query | Seed "Diwali" activity exists | 1. Navigate to `/activities` 2. Type "Diwali" in search bar 3. Press Enter or submit | URL updates to `/activities?q=Diwali`. Only activities matching "Diwali" shown. Result count displayed. | P0 | |
| FN-ACT-004 | Search — matches all fields | Activities with various tags | 1. Search by title (e.g., "Annual") 2. Search by tag (e.g., "dance") 3. Search by category label (e.g., "Festival") 4. Search by description keyword | Each search returns correct matching activities. Search covers: title, description, tags array, category label text. | P0 | |
| FN-ACT-005 | Search — case insensitive | "Diwali" activity exists | 1. Search "diwali" (lowercase) 2. Search "DIWALI" (uppercase) 3. Search "Diwali" (mixed) | All three queries return the same results. | P1 | |
| FN-ACT-006 | Search — empty query | Any state | 1. Navigate to `/activities` 2. Clear search bar 3. Submit empty query | URL is `/activities` (no `?q=` param). All activities shown with default pagination. | P1 | |
| FN-ACT-007 | Search — no results | No "xyznonexistent" activity | 1. Search "xyznonexistent" | Empty state message displayed (e.g., "No activities found"). No activity cards shown. | P1 | |
| FN-ACT-008 | Pagination — page numbers with ellipsis | 50+ activities (or adjust limit) | 1. Navigate to `/activities` with enough data for >7 pages | Pagination shows: 1, ..., page-1, page, page+1, ..., totalPages. Ellipsis appears when total pages >7. | P1 | |
| FN-ACT-009 | Pagination — Previous disabled on page 1 | Multiple pages exist | 1. Navigate to `/activities` (page 1) | "Previous" button is visually disabled and not clickable. | P1 | |
| FN-ACT-010 | Pagination — Next disabled on last page | Multiple pages exist | 1. Navigate to last page via pagination | "Next" button is visually disabled and not clickable. | P1 | |
| FN-ACT-011 | Pagination — URL updates | Multiple pages exist | 1. Click page 2 in pagination | URL updates to `/activities?page=2`. Correct 6 activities shown for page 2. | P0 | |
| FN-ACT-012 | Search + pagination combo | 10+ activities match "2024" | 1. Search "2024" 2. Click page 2 | URL is `/activities?q=2024&page=2`. Shows correct subset of search results. Query preserved across pages. | P1 | |
| FN-ACT-013 | Category filter — active highlight | None | 1. Navigate to `/activities` 2. Observe category pills | "All" button appears active (primary color). Other category pills show inactive style (surface bg, border). | P1 | |
| FN-ACT-014 | Category filter — "All" button | On a category page | 1. Navigate to `/activities/category/festival` 2. Click "All" category button | Navigates to `/activities` showing all activities unfiltered. | P1 | |
| FN-ACT-015 | Category pills — icon weight | None | 1. Navigate to `/activities/category/festival` 2. Observe pill icons | Active category pill has fill-weight Phosphor icon. All inactive pills have duotone-weight icons. | P2 | |
| FN-ACT-016 | Year selector filters | Seed data (2023+2024) | 1. Navigate to `/activities` 2. Click "2024" year button | Only 2024 activities displayed. Year button highlighted as active. | P1 | |
| FN-ACT-017 | Year selector hidden during search | Any state | 1. Navigate to `/activities` 2. Search "Diwali" | Year selector section is hidden when a search query is active. | P2 | |
| FN-ACT-018 | Card stagger animation | 6+ activities | 1. Navigate to `/activities` 2. Observe activity cards loading | Cards appear with staggered entrance animation. Each card delayed by index × 0.06s. Spring physics: stiffness 260, damping 24. | P2 | |

---

## 1.3 Activity Detail (`/activities/[year]/[id]`)

| ID | Test Case | Preconditions | Steps | Expected Result | Priority | Status |
|----|-----------|---------------|-------|-----------------|----------|--------|
| FN-DET-001 | Detail page loads | Valid activity in seed data | 1. Navigate to any activity detail URL | Page loads with: hero image (or fallback), breadcrumb, category badge, title, date, description, tags. No console errors. | P0 | |
| FN-DET-002 | Breadcrumb structure | Valid activity | 1. Navigate to activity detail 2. Observe breadcrumb | Shows: Home → Activities → [Year] → [Activity Title]. Last item is bold, not a link. Others are clickable links. | P0 | |
| FN-DET-003 | Breadcrumb navigation | Valid activity | 1. Click "Home" in breadcrumb 2. Go back, click "Activities" 3. Go back, click "[Year]" | Each link navigates to correct page: `/`, `/activities`, `/activities/[year]`. | P1 | |
| FN-DET-004 | Back button in hero | Valid activity | 1. Navigate to activity detail 2. Click back button (top-left of hero) | Navigates back to previous page. Button has white/15 bg with backdrop blur. | P1 | |
| FN-DET-005 | Category badge | Valid activity | 1. Navigate to activity detail 2. Observe category badge | Badge shows category icon (Phosphor, fill weight) + category label. Background uses category-specific color from COLOR_MAP. | P1 | |
| FN-DET-006 | Date formatting | Valid activity (date: "2024-12-15") | 1. Navigate to activity detail 2. Observe date display | Date formatted in en-IN locale (e.g., "15 December 2024" or "15/12/2024"). | P2 | |
| FN-DET-007 | Description line breaks | Activity with multi-line description | 1. Navigate to activity detail 2. Observe description | Line breaks in description preserved (white-space: pre-line). Paragraphs render with proper spacing. | P2 | |
| FN-DET-008 | Tags display | Activity with 5+ tags | 1. Navigate to activity detail 2. Observe tags section | Tags displayed as pills with category-specific color. All tags shown (no truncation on detail page). | P1 | |
| FN-DET-009 | Image gallery — multi-image | Activity with 3+ images | 1. Navigate to activity with multiple images 2. Scroll to gallery | Gallery renders as 2-column grid below description. Each image is a clickable button with 16/10 aspect ratio. Hover shows scale 1.05 with overlay darkening. | P0 | |
| FN-DET-010 | Image gallery — hidden for ≤1 image | Activity with 0 or 1 image | 1. Navigate to activity with 0 or 1 image | Gallery section is NOT rendered (component returns null). | P1 | |
| FN-DET-011 | Lightbox — open | Activity with 3+ images | 1. Navigate to activity detail 2. Click any gallery image | Lightbox modal opens: full-screen dark overlay (black/90), centered image (90vw × 80vh, max-w-5xl), image counter top-left, X close button top-right. | P0 | |
| FN-DET-012 | Lightbox — image counter | Activity with 4 images | 1. Open lightbox on 2nd image | Counter shows "2 / 4" in top-left. Updates correctly when navigating. | P1 | |
| FN-DET-013 | Lightbox — arrow navigation | Activity with 3+ images | 1. Open lightbox 2. Click right arrow 3. Click left arrow | Right arrow advances to next image. Left arrow goes to previous. Arrows positioned on left/right edges. | P0 | |
| FN-DET-014 | Lightbox — keyboard navigation | Lightbox is open | 1. Press → (right arrow key) 2. Press ← (left arrow key) 3. Press Escape | → advances, ← goes back, ESC closes lightbox. All keyboard shortcuts work correctly. | P0 | |
| FN-DET-015 | Lightbox — close button | Lightbox is open | 1. Click X button (top-right) | Lightbox closes. Page returns to normal state. | P1 | |
| FN-DET-016 | Lightbox — body scroll lock | Lightbox is open | 1. Open lightbox 2. Try scrolling the page | Body scroll is locked (overflow: hidden). Cannot scroll page content while lightbox is open. Scroll restores on close. | P1 | |
| FN-DET-017 | YouTube embed — valid URL | Activity with videoUrl | 1. Navigate to activity with YouTube video | Embedded YouTube player renders correctly. Supports URL formats: `youtube.com/watch?v=ID`, `youtu.be/ID`, `youtube.com/embed/ID`. | P0 | |
| FN-DET-018 | Video section — hidden when no URL | Activity without videoUrl | 1. Navigate to activity without video | Video/embed section is NOT rendered. No empty player or broken iframe. | P1 | |
| FN-DET-019 | Share bar buttons | Valid activity | 1. Navigate to activity detail 2. Observe share bar | Share bar shows buttons for: Facebook (#1877F2), WhatsApp (#25D366), Twitter/X (#1DA1F2), Copy Link. YouTube button shown only if videoUrl exists. | P1 | |
| FN-DET-020 | Copy link — clipboard + feedback | Valid activity | 1. Click "Copy Link" in share bar | URL copied to clipboard. Button text changes to "Copied!" for 2 seconds, then reverts. Verify clipboard contains correct activity URL. | P1 | |
| FN-DET-021 | Related activities | Activity with same-year siblings | 1. Navigate to activity detail 2. Scroll to "Related Activities" | Shows up to 3 other activities from the same year. Each shows thumbnail image, title, date. Cards link to correct detail pages. Current activity is NOT in related list. | P1 | |
| FN-DET-022 | Non-existent activity — 404 | None | 1. Navigate to `/activities/2024/nonexistent-id-12345` | 404 page rendered. No console errors or white screen. | P0 | |

---

## 1.4 Category Pages (`/activities/category/[slug]`)

| ID | Test Case | Preconditions | Steps | Expected Result | Priority | Status |
|----|-----------|---------------|-------|-----------------|----------|--------|
| FN-CAT-001 | All 10 categories render | Seed data | 1. Navigate to each: `/activities/category/annual-day`, `/activities/category/sports-day`, `/activities/category/art-craft`, `/activities/category/field-trip`, `/activities/category/festival`, `/activities/category/graduation`, `/activities/category/workshop`, `/activities/category/competition`, `/activities/category/cultural`, `/activities/category/other` | Each page loads without errors. Shows category name, icon, description at top. | P0 | |
| FN-CAT-002 | Category header content | None | 1. Navigate to `/activities/category/festival` | Page header shows: category icon (Phosphor, colored), category label "Festival", category description text. | P1 | |
| FN-CAT-003 | Activities filtered by category | Seed data | 1. Navigate to `/activities/category/festival` | Only activities with category="festival" displayed. No activities from other categories. | P0 | |
| FN-CAT-004 | Pagination within category | 7+ activities in one category | 1. Navigate to category with 7+ activities 2. Check pagination | Pagination works within category (6 per page). Page numbers correct for filtered count. | P1 | |
| FN-CAT-005 | Year filter within category | Multiple years in category | 1. Navigate to `/activities/category/festival` 2. Click year "2024" button | URL: `/activities/category/festival?year=2024`. Only festival activities from 2024 shown. | P1 | |
| FN-CAT-006 | Combined category + year | Seed data | 1. Navigate to `/activities/category/festival?year=2024` | Shows only activities matching BOTH category=festival AND year=2024. | P1 | |
| FN-CAT-007 | Breadcrumb | None | 1. Navigate to `/activities/category/festival` | Breadcrumb: Home → Activities → Festival. Last item bold, not a link. | P1 | |
| FN-CAT-008 | Empty category state | Category with 0 activities | 1. Navigate to category with no activities | Empty state message with category-specific color accent. No broken grid or errors. | P2 | |
| FN-CAT-009 | Invalid category — 404 | None | 1. Navigate to `/activities/category/invalid-category` | 404 page via `notFound()`. Not a white screen. | P0 | |
| FN-CAT-010 | Category icon in breadcrumb | None | 1. Navigate to any category page 2. Observe breadcrumb | Category icon renders alongside category name in breadcrumb or page header. | P2 | |
| FN-CAT-011 | Year selector uses query params | None | 1. Navigate to `/activities/category/festival` 2. Click "2024" year button | URL format is `/activities/category/festival?year=2024` (query param, not path segment). | P1 | |
| FN-CAT-012 | "All Years" clears filter | On `?year=2024` | 1. Navigate to `/activities/category/festival?year=2024` 2. Click "All Years" | Year filter cleared. URL: `/activities/category/festival` (no year param). All years of that category shown. | P1 | |

---

## 1.5 Year Pages (`/activities/[year]`)

| ID | Test Case | Preconditions | Steps | Expected Result | Priority | Status |
|----|-----------|---------------|-------|-----------------|----------|--------|
| FN-YR-001 | Valid year loads | Seed data (2024 activities) | 1. Navigate to `/activities/2024` | Page loads with all 2024 activities. Year highlighted in year selector. | P0 | |
| FN-YR-002 | Year selector active state | Seed data | 1. Navigate to `/activities/2024` | "2024" button has primary color bg + shadow. Other year buttons have inactive style (surface bg, border). | P1 | |
| FN-YR-003 | Breadcrumb | None | 1. Navigate to `/activities/2024` | Breadcrumb: Home → Activities → 2024. "2024" is bold, not a link. | P1 | |
| FN-YR-004 | Sorted by date descending | 2024 has 5+ activities | 1. Navigate to `/activities/2024` 2. Check activity order | Activities sorted newest first (December before January). | P1 | |
| FN-YR-005 | Empty year | No activities for year 2020 | 1. Navigate to `/activities/2020` | Appropriate empty state message. No broken layout. | P2 | |
| FN-YR-006 | Invalid year | None | 1. Navigate to `/activities/9999` or `/activities/abc` | Handles gracefully — either empty state or 404. No server crash or white screen. | P2 | |

---

## 1.6 Admin Login (`/admin/login`)

| ID | Test Case | Preconditions | Steps | Expected Result | Priority | Status |
|----|-----------|---------------|-------|-----------------|----------|--------|
| FN-AUTH-001 | Login page renders | None | 1. Navigate to `/admin/login` | Centered card with: gradient top bar, lock icon in colored circle, "Admin Login" heading, password input, "Login" button. | P0 | |
| FN-AUTH-002 | Password show/hide toggle | None | 1. Navigate to `/admin/login` 2. Type "test123" 3. Click eye icon to show 4. Click eye icon to hide | Initial: input type="password" (dots). Toggle to show: type="text" (visible). Toggle back: type="password" (dots). Icon changes between Eye/EyeSlash. | P1 | |
| FN-AUTH-003 | Correct password — success | None | 1. Navigate to `/admin/login` 2. Enter `kidzee2024` 3. Click "Login" | Redirects to `/admin`. Token stored in `sessionStorage.getItem('admin_token')`. | P0 | |
| FN-AUTH-004 | Wrong password — error | None | 1. Navigate to `/admin/login` 2. Enter `wrongpassword` 3. Click "Login" | Red error message box appears (e.g., "Invalid password"). Does NOT redirect. Input remains. | P0 | |
| FN-AUTH-005 | Empty password — validation | None | 1. Navigate to `/admin/login` 2. Leave password empty 3. Click "Login" | Validation prevents submission or shows error. No API call made with empty body. | P1 | |
| FN-AUTH-006 | Token in sessionStorage | Successful login | 1. Login with correct password 2. Open DevTools > Application > Session Storage | `admin_token` key exists with token value. | P1 | |
| FN-AUTH-007 | Gradient top bar styling | None | 1. Navigate to `/admin/login` 2. Observe card | Card has gradient bar at top (purple family). Matches brand design. | P2 | |
| FN-AUTH-008 | Enter key submits form | None | 1. Navigate to `/admin/login` 2. Type password 3. Press Enter key | Form submits (same as clicking "Login" button). | P1 | |
| FN-AUTH-009 | Password toggle input type | None | 1. Open DevTools 2. Inspect password input 3. Toggle show/hide | Input `type` attribute changes between `"password"` and `"text"`. | P2 | |
| FN-AUTH-010 | Login button styling | None | 1. Observe "Login" button | Full-width, gradient background (purple), blob radius. Hover effect visible. | P2 | |

---

## 1.7 Admin Dashboard (`/admin`)

| ID | Test Case | Preconditions | Steps | Expected Result | Priority | Status |
|----|-----------|---------------|-------|-----------------|----------|--------|
| FN-ADM-001 | Auth guard — no token | No sessionStorage token | 1. Clear sessionStorage 2. Navigate to `/admin` | Redirected to `/admin/login`. Dashboard not accessible. | P0 | |
| FN-ADM-002 | Three tabs visible | Logged in | 1. Navigate to `/admin` | Three tab buttons visible: "Activities", "Social Posts", "Analytics". Activities tab active by default. | P0 | |
| FN-ADM-003 | Tab switching | Logged in | 1. Click "Social Posts" tab 2. Click "Analytics" tab 3. Click "Activities" tab | Each tab shows its corresponding content. Active tab has distinct styling. No data loss between switches. | P0 | |
| FN-ADM-004 | Activities listed by year | Logged in, seed data exists | 1. Open Activities tab | All activities displayed, grouped by year (newest year first). Each year is a collapsible section. | P0 | |
| FN-ADM-005 | Year sections collapse/expand | Logged in | 1. Click on a year header to collapse 2. Click again to expand | Year section toggles visibility. Default state: expanded. Collapsed state hides activity rows. | P1 | |
| FN-ADM-006 | Add activity — form fields | Logged in | 1. Click "Add Activity" button | Form appears with fields: Title (text, required), Description (textarea), Date (date picker, required), Category (dropdown), Video URL (text, optional), Tags (text, comma-separated). | P0 | |
| FN-ADM-007 | Add activity — required fields | Logged in | 1. Open add form 2. Leave title and date empty 3. Click submit | Validation prevents submission. Error indication on required fields. | P0 | |
| FN-ADM-008 | Add activity — category dropdown | Logged in | 1. Open add form 2. Click category dropdown | Dropdown shows all 10 categories: Annual Day, Sports Day, Art & Craft, Field Trip, Festival, Graduation, Workshop, Competition, Cultural, Other. | P1 | |
| FN-ADM-009 | Add activity — tags parsing | Logged in | 1. Open add form 2. Enter tags: "dance, music, fun" 3. Submit valid form | Tags split by comma into array: ["dance", "music", "fun"]. Trimmed of whitespace. | P1 | |
| FN-ADM-010 | Add activity — success | Logged in | 1. Fill all required fields (Title: "Test Activity", Date: today, Category: "festival") 2. Submit | Activity created. Appears in activity list under correct year. POST to `/api/activities` returns 201. | P0 | |
| FN-ADM-011 | Edit activity — form prefill | Logged in, activity exists | 1. Click edit icon on any activity | Edit form opens with all fields pre-filled with current activity data (title, description, date, category, videoUrl, tags). | P0 | |
| FN-ADM-012 | Edit activity — save changes | Logged in | 1. Open edit form 2. Change title to "Updated Title" 3. Save | PATCH request sent. Activity list reflects updated title. API returns 200. | P0 | |
| FN-ADM-013 | Delete activity | Logged in | 1. Click delete icon on any activity 2. Confirm deletion | Activity removed from list. DELETE request with auth. Activity no longer visible on public pages. | P0 | |
| FN-ADM-014 | Activity row content | Logged in, seed data | 1. Observe any activity row | Row shows: thumbnail image (or placeholder icon), title, date, category badge (colored), image count indicator. | P1 | |
| FN-ADM-015 | View button — public page | Logged in | 1. Click view button/link on any activity | Opens the public activity detail page (`/activities/[year]/[id]`). | P1 | |
| FN-ADM-016 | Social posts — list | Logged in, social posts exist | 1. Click "Social Posts" tab | Posts listed with: activity title reference, caption, platform icon (Instagram/Facebook), status badge. | P1 | |
| FN-ADM-017 | Social post — status badges | Logged in, posts with different statuses | 1. Observe status badges | Queued: amber (#F59E0B) with Clock icon. Published: green (#10B981) with CheckCircle. Failed: red (#EF4444) with XCircle. | P1 | |
| FN-ADM-018 | Social post — edit caption | Logged in, post exists | 1. Click edit on a social post 2. Modify caption text 3. Save | Caption updated via PATCH. Updated caption visible in list. | P1 | |
| FN-ADM-019 | Social post — delete | Logged in, post exists | 1. Click delete on a social post 2. Confirm | Post removed from list. DELETE request successful. | P1 | |
| FN-ADM-020 | Social post — platform icons | Logged in | 1. Observe platform column | Instagram posts show Instagram icon. Facebook posts show Facebook icon. "Both" shows both icons. | P2 | |
| FN-ADM-021 | Analytics — total count | Logged in, seed data | 1. Click "Analytics" tab 2. Observe total activities | Displays correct total count matching actual number of activities. | P1 | |
| FN-ADM-022 | Analytics — by category | Logged in | 1. Observe category breakdown | Each category shows activity count. Visual bar represents proportion. Totals add up to total activities. | P1 | |
| FN-ADM-023 | Analytics — by year | Logged in | 1. Observe year distribution | Each year shows activity count. Visual bar or stat card. | P1 | |
| FN-ADM-024 | Analytics — social summary | Logged in, social posts exist | 1. Observe social post stats | Shows counts: queued, published, failed. Matches actual social post data. | P2 | |
| FN-ADM-025 | Analytics — bar percentages | Logged in | 1. Observe visual bars in analytics | Bar widths proportional to values. Percentages render correctly (no NaN, no overflow). | P2 | |

---

## 1.8 API Endpoints

| ID | Test Case | Preconditions | Steps | Expected Result | Priority | Status |
|----|-----------|---------------|-------|-----------------|----------|--------|
| FN-API-001 | GET /api/activities | Seed data | 1. `curl GET /api/activities` | 200 response. JSON array of all activities sorted by date DESC. Each has: id, title, description, date, year, category, images, tags, createdAt, updatedAt. | P0 | |
| FN-API-002 | GET /api/activities?year=2024 | Seed data | 1. `curl GET /api/activities?year=2024` | 200 response. Only activities where year=2024. | P1 | |
| FN-API-003 | POST /api/activities — auth success | Admin token | 1. `curl POST /api/activities -H "Authorization: Bearer kidzee2024" -d '{"title":"Test","description":"Desc","date":"2024-06-15","category":"festival"}'` | 201 response. New activity returned with auto-generated id, calculated year=2024, createdAt/updatedAt set. | P0 | |
| FN-API-004 | POST /api/activities — no auth | None | 1. `curl POST /api/activities -d '{"title":"Test",...}'` (no auth header) | 401 Unauthorized response. Activity NOT created. | P0 | |
| FN-API-005 | POST /api/activities — missing fields | Admin token | 1. `curl POST /api/activities -H "Auth..." -d '{"title":"Test"}'` (missing date, category) | 400 Bad Request. Error message indicates missing required fields. | P1 | |
| FN-API-006 | PATCH /api/activities — update | Admin token, activity exists | 1. `curl PATCH /api/activities -H "Auth..." -d '{"id":"<id>","title":"Updated"}'` | 200 response. Activity title updated. updatedAt timestamp refreshed. Other fields unchanged. | P0 | |
| FN-API-007 | PATCH — date change recalculates year | Admin token | 1. `curl PATCH /api/activities -d '{"id":"<id>","date":"2023-01-15"}'` | Year field recalculated to 2023 (from date). Activity moves to 2023 group. | P1 | |
| FN-API-008 | DELETE /api/activities — auth success | Admin token, activity exists | 1. `curl DELETE /api/activities?id=<id> -H "Auth..."` | 200 response. `{ success: true }`. Activity no longer returned by GET. | P0 | |
| FN-API-009 | DELETE /api/activities — no auth | Activity exists | 1. `curl DELETE /api/activities?id=<id>` (no auth) | 401 Unauthorized. Activity still exists. | P0 | |
| FN-API-010 | POST /api/auth — correct password | None | 1. `curl POST /api/auth -d '{"password":"kidzee2024"}'` | 200 response. `{ success: true, token: "..." }`. | P0 | |
| FN-API-011 | POST /api/auth — wrong password | None | 1. `curl POST /api/auth -d '{"password":"wrongpass"}'` | 401 or error response. `{ success: false }` or error message. | P0 | |
| FN-API-012 | POST /api/auth — empty body | None | 1. `curl POST /api/auth -d '{}'` | Error response. Does not return a token. | P1 | |
| FN-API-013 | GET /api/social | Social posts exist | 1. `curl GET /api/social` | 200 response. JSON array of social posts sorted by date DESC. Each has: id, activityId, activityTitle, caption, platform, status, createdAt. | P1 | |
| FN-API-014 | GET /api/social?activityId=X | Posts linked to activity | 1. `curl GET /api/social?activityId=<id>` | Only posts for that activityId returned. | P1 | |
| FN-API-015 | POST /api/social — create | Valid activity exists | 1. `curl POST /api/social -d '{"activityId":"<id>","activityTitle":"Title","description":"Desc","platform":"instagram","tags":["fun"]}'` | 201 response. Post created with auto-generated caption (emojis + hashtags + location), status="queued". | P1 | |
| FN-API-016 | POST /api/social — platform validation | None | 1. POST with `"platform":"tiktok"` | Error response. Only "instagram", "facebook", "both" accepted. | P1 | |
| FN-API-017 | PATCH /api/social — update caption | Admin token, post exists | 1. `curl PATCH /api/social -d '{"id":"<id>","caption":"New caption"}'` | 200 response. Caption updated. | P1 | |
| FN-API-018 | DELETE /api/social?id=X | Admin token, post exists | 1. `curl DELETE /api/social?id=<id> -H "Auth..."` | 200 response. Post removed. No longer in GET list. | P1 | |
| FN-API-019 | POST /api/seed — initial seed | Empty data | 1. Delete all activities 2. `curl POST /api/seed` | 200 response. 10 demo activities created. Message confirms count. | P1 | |
| FN-API-020 | POST /api/seed — no duplicate | Data already seeded | 1. `curl POST /api/seed` (already has data) | Does not duplicate. Either skips or returns message that data exists. Count remains at 10. | P1 | |

---

## 1.9 SEO & Metadata

| ID | Test Case | Preconditions | Steps | Expected Result | Priority | Status |
|----|-----------|---------------|-------|-----------------|----------|--------|
| FN-SEO-001 | Homepage metadata | None | 1. View page source of `/` 2. Check `<head>` tags | `<title>` contains "Kidzee Polichalur". `<meta name="description">` present. OG title, description, image, type, locale set. | P0 | |
| FN-SEO-002 | Activity detail — dynamic metadata | Valid activity | 1. View page source of activity detail | `<title>` contains activity title. Description is first 160 chars of activity description. | P0 | |
| FN-SEO-003 | Activity detail — OG image | Activity with images | 1. Check OG meta tags on activity detail | `og:image` set to first image from activity's images array. | P1 | |
| FN-SEO-004 | Category page metadata | None | 1. View source of `/activities/category/festival` | Title includes "Festival". Description includes category description text. | P1 | |
| FN-SEO-005 | Sitemap — valid XML | None | 1. Navigate to `/sitemap.xml` | Valid XML document. Parseable by XML validators. Contains `<urlset>` with `<url>` entries. | P0 | |
| FN-SEO-006 | Sitemap — all routes included | Seed data | 1. Parse `/sitemap.xml` | Contains: `/` (homepage), `/activities`, `/activities/2023`, `/activities/2024`, each activity detail URL, each category URL (10 categories). | P0 | |
| FN-SEO-007 | Sitemap — priorities | None | 1. Check priority values in sitemap | `/` = 1.0, `/activities` = 0.9, year pages = 0.8, activity details = 0.7, category pages = 0.6. | P2 | |
| FN-SEO-008 | Robots.txt | None | 1. Navigate to `/robots.txt` | Contains: `User-agent: *`, `Allow: /`, `Disallow: /admin`, `Disallow: /api/`. Sitemap URL present. | P0 | |
| FN-SEO-009 | JSON-LD — Organization | None | 1. View source of `/` 2. Find `<script type="application/ld+json">` | Contains EducationalOrganization schema with: name "Kidzee Polichalur", address (Polichalur, Tamil Nadu), URL. | P1 | |
| FN-SEO-010 | JSON-LD — Event | Valid activity | 1. View source of activity detail | Contains Event schema with: name (activity title), startDate, location, image, organizer. | P1 | |
| FN-SEO-011 | JSON-LD — Breadcrumb | Page with breadcrumb | 1. View source of activity detail or category page | Contains BreadcrumbList schema with itemListElement array, correct positions and URLs. | P2 | |
| FN-SEO-012 | Twitter card tags | None | 1. Check `<meta name="twitter:...">` tags | `twitter:card` = "summary_large_image". Twitter title and description present. | P2 | |

---

## 1.10 Navigation

| ID | Test Case | Preconditions | Steps | Expected Result | Priority | Status |
|----|-----------|---------------|-------|-----------------|----------|--------|
| FN-NAV-001 | Header sticky | None | 1. Navigate to any page 2. Scroll down 200+ pixels | Header remains fixed at top of viewport. z-index 50 (above all content). | P1 | |
| FN-NAV-002 | Header content | None | 1. Observe header on desktop (>768px) | Shows: Kidzee logo SVG (80×26), "Polichalur" text, 3 nav links: Home, Activities, Admin. | P0 | |
| FN-NAV-003 | Active nav link | On `/activities` | 1. Navigate to `/activities` 2. Observe nav links | "Activities" link highlighted: white background, primary color text. Other links: default styling. | P1 | |
| FN-NAV-004 | Home active — exact match | On `/activities` | 1. Navigate to `/activities` 2. Check "Home" link | "Home" is NOT highlighted (exact path match required — only active on `/`). | P2 | |
| FN-NAV-005 | Mobile hamburger menu | Viewport < 768px | 1. Resize to mobile 2. Observe header | Hamburger icon (Menu) visible. Desktop nav links hidden. | P0 | |
| FN-NAV-006 | Mobile menu — close on click | Mobile viewport | 1. Open hamburger menu 2. Click any nav link | Menu closes. Navigates to clicked page. | P1 | |
| FN-NAV-007 | Footer layout | Desktop viewport | 1. Scroll to footer on any page | 3-column grid: Column 1 (logo + "Polichalur" + mission), Column 2 (Quick Links: Home, Activities, Admin Portal), Column 3 (Contact: Polichalur, Tamil Nadu, India). | P1 | |
| FN-NAV-008 | Footer links navigate | None | 1. Click "Home" in footer 2. Click "Activities" in footer 3. Click "Admin Portal" in footer | Each navigates to correct route: `/`, `/activities`, `/admin`. | P1 | |
| FN-NAV-009 | Footer copyright year | None | 1. Observe copyright text in footer | Shows current year (2026). Uses `new Date().getFullYear()`. Not hardcoded. | P2 | |
| FN-NAV-010 | Footer gradient | None | 1. Observe footer background | Purple family gradient: `from-[var(--color-primary)] via-[var(--color-primary-dark)] to-[#2D1540]`. White text on gradient. | P2 | |

---

## 1.11 Activity Card Component

| ID | Test Case | Preconditions | Steps | Expected Result | Priority | Status |
|----|-----------|---------------|-------|-----------------|----------|--------|
| FN-CARD-001 | Hero image — aspect ratio | Activity with images | 1. Observe any activity card | Image area has 16/10 aspect ratio. Image fills area with `object-cover`. | P1 | |
| FN-CARD-002 | Image hover zoom | Desktop viewport | 1. Hover mouse over card image | Image scales to 1.05 over 500ms transition. Contained within card (overflow hidden). | P2 | |
| FN-CARD-003 | Image count badge | Activity with 3 images | 1. Observe card with multiple images | Badge shows "+3" (or appropriate count) overlaid on image area. | P1 | |
| FN-CARD-004 | Video indicator | Activity with videoUrl | 1. Observe card for activity with video | Red pill-style indicator on bottom-right of image area. | P2 | |
| FN-CARD-005 | Category badge color | Different categories | 1. Compare category badges across cards | Each category uses its COLOR_MAP hex: annual-day=#9B59B6, sports-day=#E67E22, art-craft=#E91E63, field-trip=#27AE60, festival=#F39C12, graduation=#2980B9, workshop=#8D6E63, competition=#D4AC0D, cultural=#C0392B, other=#7F8C8D. Opacity 70%. | P1 | |
| FN-CARD-006 | Description truncation | Activity with long description | 1. Observe card description | Text clamped to 2 lines with ellipsis. Full text visible only on detail page. | P1 | |
| FN-CARD-007 | Tags — overflow handling | Activity with 6+ tags | 1. Observe card tags | First 4 tags displayed as pills. "+2" (or correct overflow count) indicator for remaining. | P2 | |
| FN-CARD-008 | Share panel toggle | None | 1. Click share button on card 2. Click again | First click: share panel slides open (spring animation). Second click: panel slides closed. Background color of share button changes when panel is open. | P1 | |
| FN-CARD-009 | Share panel — social buttons | None | 1. Open share panel on a card with videoUrl | Shows: Facebook, YouTube, WhatsApp, Twitter/X, Copy Link buttons. YouTube button only when videoUrl exists. Each has correct platform color. | P1 | |
| FN-CARD-010 | Image error fallback | Activity with broken image URL | 1. Load card with invalid image URL | Colored header strip replaces broken image. Card content still renders correctly. No broken image icon. | P1 | |

---

## 1.12 Social Share

| ID | Test Case | Preconditions | Steps | Expected Result | Priority | Status |
|----|-----------|---------------|-------|-----------------|----------|--------|
| FN-SHARE-001 | Share button opens modal | Valid activity | 1. Click "Schedule Social Post" button (gradient purple→pink, globe icon) | Modal opens with: header (CategoryIcon + title), close button, platform selector, caption preview, action button. | P1 | |
| FN-SHARE-002 | Platform selector | Modal open | 1. Click "Instagram" 2. Click "Facebook" 3. Click "Both" | Each button toggles selected state. Only one option active at a time. Visual highlight on selected platform. | P1 | |
| FN-SHARE-003 | Caption preview | Modal open | 1. Observe caption preview area | Shows formatted text: "✨ {Title}\n\n{Description}\n\n🏫 Kidzee Polichalur — Where little minds bloom!\n\n#Kidzee #KidzeePolichalur {tag hashtags}". | P1 | |
| FN-SHARE-004 | Image count in modal | Activity with images | 1. Open modal for activity with 3 images | Shows badge indicating "3 images will be attached" or similar. | P2 | |
| FN-SHARE-005 | Submit — API call | Modal open, platform selected | 1. Select "Instagram" 2. Click "Schedule Post" | POST request to `/api/social`. Body includes: activityId, activityTitle, description, platform, tags. Status changes to loading. | P0 | |
| FN-SHARE-006 | Submit — success state | Successful POST | 1. Submit a social post via modal | Green success message with checkmark icon. Button disabled. Message: post scheduled successfully. | P1 | |
| FN-SHARE-007 | Submit — error state | API failure | 1. Simulate API error (e.g., network offline) 2. Submit | Red error message displayed. User can retry. | P1 | |
| FN-SHARE-008 | Loading spinner | During submission | 1. Click submit 2. Observe button during API call | Loading spinner replaces button text. Button disabled during request. | P2 | |

---

# SECTION 2: UX/UI TEST CASES

---

## 2.1 Brand DNA Compliance

| ID | Test Case | Steps | Expected Result | Priority | Status |
|----|-----------|-------|-----------------|----------|--------|
| UI-BRAND-001 | Sniglet body font | 1. Open DevTools 2. Inspect body or paragraph text 3. Check computed `font-family` | Body text uses Sniglet font (loaded from Google Fonts). Fallback chain present. | P0 | |
| UI-BRAND-002 | Fredoka display headings | 1. Inspect any h1/h2 heading 2. Check computed `font-family` | Display headings use Fredoka (or var(--font-display)). | P0 | |
| UI-BRAND-003 | Primary purple palette | 1. Inspect hero gradient 2. Check CTA button colors 3. Inspect header background | Primary: #65318E. Dark: #4A2366 (hero start). Light: #8B5CB8 (hero end). Consistent across hero, header, footer, buttons. | P0 | |
| UI-BRAND-004 | Lavender section backgrounds | 1. Inspect section backgrounds (activities section, category areas) | Sections with content use `#EBE1FF` (lavender) or `var(--color-bg-brand)`. ~40% of page sections have lavender bg. | P1 | |
| UI-BRAND-005 | Asymmetric blob radius | 1. Inspect primary CTA buttons ("Explore Activities", "Login") 2. Check `border-radius` | Computed border-radius is `15px 5px` (or var(--radius-blob)). Not uniform border-radius. | P1 | |
| UI-BRAND-006 | Purple-tinted shadows | 1. Inspect card shadows 2. Check `box-shadow` color | Shadow color includes purple RGB (e.g., `rgba(101, 49, 142, 0.1)` or similar). Not pure black/gray. | P2 | |
| UI-BRAND-007 | Kidzee logo SVG | 1. Check header logo 2. Check footer logo | Both use `/kidzee-logo.svg`. Logo renders crisply at all sizes. Not a raster image. | P0 | |
| UI-BRAND-008 | Chennai illustrations — hero | 1. View homepage on desktop 2. Inspect hero decorations | Auto-rickshaw SVG (bottom-left, ~20% opacity), palm tree SVG (bottom-right, ~12% opacity), kolam pattern SVG (top-right, ~10% opacity). Chennai-specific, not generic. | P1 | |
| UI-BRAND-009 | Illustrations — decorative | 1. Inspect each illustration element | All illustrations have `aria-hidden="true"`. Not read by screen readers. | P2 | |
| UI-BRAND-010 | Category color accuracy | 1. Inspect each category badge across the app | Colors match: annual-day=#9B59B6, sports-day=#E67E22, art-craft=#E91E63, field-trip=#27AE60, festival=#F39C12, graduation=#2980B9, workshop=#8D6E63, competition=#D4AC0D, cultural=#C0392B, other=#7F8C8D. | P1 | |
| UI-BRAND-011 | Social platform colors | 1. Inspect share buttons | Facebook=#1877F2, WhatsApp=#25D366, Twitter=#1DA1F2, YouTube=#FF0000. Consistent everywhere. | P2 | |
| UI-BRAND-012 | Warm cream background | 1. Inspect `<body>` or `<html>` background | Background is #FFFBF5 (warm cream), NOT #FFFFFF (pure white). Verified via computed style. | P1 | |

---

## 2.2 Responsive Design

### Mobile (<640px)

| ID | Test Case | Steps | Expected Result | Priority | Status |
|----|-----------|-------|-----------------|----------|--------|
| UI-RESP-001 | Activity grid — 1 column | 1. Set viewport to 375px 2. Navigate to `/activities` | Activity cards stack in single column. Full-width cards. | P0 | |
| UI-RESP-002 | Hamburger menu visible | 1. Set viewport to 375px 2. Observe header | Hamburger icon (Menu/X) visible. Desktop nav links hidden. | P0 | |
| UI-RESP-003 | Hero text sizing | 1. Set viewport to 375px 2. Observe hero heading | Text is `text-4xl` (2.25rem). Not overflowing container. | P1 | |
| UI-RESP-004 | Illustrations hidden | 1. Set viewport to 375px 2. Check hero for illustrations | Auto-rickshaw, palm tree, kolam, peacock are hidden on mobile. No overflow. | P1 | |
| UI-RESP-005 | Stats grid — 2 columns | 1. Set viewport to 375px 2. Scroll to stats | Stats display in 2-column grid (2 rows of 2). Not overflowing. | P1 | |
| UI-RESP-006 | Footer stacks | 1. Set viewport to 375px 2. Scroll to footer | Footer columns stack vertically (1 column). All content readable. | P1 | |
| UI-RESP-007 | Category filter scrollable | 1. Set viewport to 375px 2. Observe category pills | Horizontal scroll enabled. All categories accessible via scroll. Scrollbar hidden. | P1 | |
| UI-RESP-008 | Content padding | 1. Set viewport to 375px 2. Inspect content containers | Horizontal padding is `px-4` (1rem). Content doesn't touch screen edges. | P2 | |

### Tablet (640px–767px)

| ID | Test Case | Steps | Expected Result | Priority | Status |
|----|-----------|-------|-----------------|----------|--------|
| UI-RESP-009 | Activity grid — 2 columns | 1. Set viewport to 640px 2. Navigate to `/activities` | Activity cards in 2-column grid. Cards evenly sized. | P1 | |
| UI-RESP-010 | Hero text sizing | 1. Set viewport to 640px | Hero heading is `text-5xl` (3rem). | P2 | |
| UI-RESP-011 | Content padding | 1. Set viewport to 640px | Horizontal padding increases to `px-6` (1.5rem). | P2 | |

### Desktop (768px+)

| ID | Test Case | Steps | Expected Result | Priority | Status |
|----|-----------|-------|-----------------|----------|--------|
| UI-RESP-012 | Activity grid — 2-3 columns | 1. Set viewport to 768px+ 2. Navigate to `/activities` | Grid transitions to `sm:grid-cols-2` → `lg:grid-cols-3`. | P1 | |
| UI-RESP-013 | Desktop nav visible | 1. Set viewport to 768px+ 2. Observe header | Full nav links visible (Home, Activities, Admin). Hamburger hidden. | P0 | |
| UI-RESP-014 | Stats grid — 4 columns | 1. Set viewport to 768px+ 2. Scroll to stats | Stats display in 4-column grid (1 row). | P1 | |
| UI-RESP-015 | Footer — 3 columns | 1. Set viewport to 768px+ 2. Observe footer | Footer displays in 3-column grid. All columns side by side. | P1 | |
| UI-RESP-016 | Content padding | 1. Set viewport to 768px+ | Horizontal padding is `px-8` (2rem). | P2 | |

### Large Desktop (1024px+)

| ID | Test Case | Steps | Expected Result | Priority | Status |
|----|-----------|-------|-----------------|----------|--------|
| UI-RESP-017 | Hero text sizing | 1. Set viewport to 1024px+ | Hero heading is `text-6xl` (3.75rem). | P2 | |
| UI-RESP-018 | Container max-width | 1. Set viewport to 1024px+ 2. Inspect main container | Container has `max-w-6xl` (72rem). Content centered. | P2 | |

### XL Desktop (1280px+)

| ID | Test Case | Steps | Expected Result | Priority | Status |
|----|-----------|-------|-----------------|----------|--------|
| UI-RESP-019 | Hero text sizing | 1. Set viewport to 1280px+ | Hero heading is `text-7xl` (4.5rem). | P2 | |
| UI-RESP-020 | Container max-width | 1. Set viewport to 1280px+ | Container has `max-w-7xl` (80rem). Large screen content doesn't stretch too wide. | P2 | |

---

## 2.3 Animations & Transitions

| ID | Test Case | Steps | Expected Result | Priority | Status |
|----|-----------|-------|-----------------|----------|--------|
| UI-ANIM-001 | Card stagger entrance | 1. Navigate to `/activities` 2. Observe cards loading | Cards appear sequentially with spring animation. Delay: index × 0.06s. Physics: stiffness 260, damping 24. Smooth, no jank. | P1 | |
| UI-ANIM-002 | Share panel spring | 1. Click share button on activity card | Panel expands from height:0 to auto with spring physics. Smooth expansion, slight overshoot (spring characteristic). | P1 | |
| UI-ANIM-003 | Lightbox scale entrance | 1. Click gallery image to open lightbox | Image enters with scale animation: 0.9→1.0 + fade in. Spring: stiffness 300, damping 30. | P1 | |
| UI-ANIM-004 | Hero shimmer sweep | 1. Navigate to `/` 2. Watch hero for 10 seconds | Gradient sweeps from left (-100%) to right (200%) over 4 seconds. Repeats after 3-second pause. | P2 | |
| UI-ANIM-005 | Hero radial glow | 1. Navigate to `/` 2. Watch hero center | Radial glow pulsates: scale 1→1.15→1, opacity 0.03→0.06→0.03. 6-second cycle. Continuous. | P2 | |
| UI-ANIM-006 | Stats count-up | 1. Navigate to `/` 2. Scroll stats into view | Numbers animate from 0 to final value over 1200ms. Ease-out cubic curve (fast start, slow finish). | P1 | |
| UI-ANIM-007 | Stats — one-time animation | 1. Trigger count-up 2. Scroll away 3. Scroll back | Animation does NOT replay. IntersectionObserver threshold: 0.3 (30% visible). `hasAnimated` ref prevents re-trigger. | P2 | |
| UI-ANIM-008 | Card image hover zoom | 1. Hover over activity card image (desktop) | Image scales to 1.05 over 500ms. Contained within card bounds (overflow hidden). | P2 | |
| UI-ANIM-009 | Button hover effects | 1. Hover over CTA buttons, category pills, pagination | Buttons show: translate-y (-1px lift), subtle scale, or background color change. Smooth 300ms transitions. | P2 | |
| UI-ANIM-010 | Category pill transition | 1. Navigate between category pages | Active category pill transitions from inactive to active style (bg color, icon weight change). Smooth visual feedback. | P2 | |
| UI-ANIM-011 | Mobile menu transition | 1. Toggle hamburger menu open/close | Menu appears/disappears with smooth animation. Backdrop blur applies. No layout jump. | P1 | |
| UI-ANIM-012 | Copy "Copied!" feedback | 1. Click "Copy Link" 2. Wait 2 seconds | Button text immediately shows "Copied!" → reverts to original after exactly 2 seconds. | P1 | |

---

## 2.4 Visual Consistency

| ID | Test Case | Steps | Expected Result | Priority | Status |
|----|-----------|-------|-----------------|----------|--------|
| UI-VIS-001 | Card border-radius | 1. Inspect activity cards, admin cards, stat cards | All cards use `rounded-2xl` (1rem) consistently. No mixed border-radius values. | P1 | |
| UI-VIS-002 | Shadow consistency | 1. Compare shadows on: cards, buttons, badges, modals | Consistent shadow treatment. Cards: `shadow-md` or `shadow-lg`. Hover states: enhanced shadow. No conflicting shadow systems. | P2 | |
| UI-VIS-003 | Typography hierarchy | 1. Compare h1, h2, h3, body text across pages | Clear size hierarchy maintained. h1 > h2 > h3 > body. Same heading level = same size/weight across pages. | P1 | |
| UI-VIS-004 | Phosphor icon sizing | 1. Compare icon sizes across components | Icons sized consistently within context. Nav icons: same size. Card icons: same size. Badge icons: same size. | P2 | |
| UI-VIS-005 | Spacing patterns | 1. Inspect gaps between cards, sections, elements | Consistent spacing: gap-4 (cards), gap-6 (sections), gap-8 (major sections). No random spacing values. | P2 | |
| UI-VIS-006 | Color token usage | 1. Inspect multiple elements 2. Check if hardcoded hex or CSS variables | Colors use CSS custom properties (var(--color-*)). Hardcoded hex only for brand-specific values (category colors, social platform colors). | P1 | |
| UI-VIS-007 | Wave divider seamless | 1. Inspect junction between hero and stats section | Wave SVG top matches hero gradient color. Bottom matches next section color. No visible line or gap at edges. Negative margin-top (-1px) eliminates gap. | P2 | |
| UI-VIS-008 | Gradient consistency | 1. Compare: hero gradient, footer gradient, admin login gradient | All use purple family. Hero: 4A2366→65318E→8B5CB8. Footer: var(--color-primary)→primary-dark→#2D1540. Consistent brand feel. | P1 | |
| UI-VIS-009 | Badge styling | 1. Compare category badges, status badges, count badges | All badges: consistent padding, border-radius, font-size. Category badges use COLOR_MAP. Status badges use status colors. | P2 | |
| UI-VIS-010 | Empty state consistency | 1. View: empty search results, empty category, empty year | All empty states: centered text, muted color, optional icon. Consistent styling across pages. No broken layouts. | P2 | |

---

## 2.5 Image Handling

| ID | Test Case | Steps | Expected Result | Priority | Status |
|----|-----------|-------|-----------------|----------|--------|
| UI-IMG-001 | Next/Image with sizes | 1. Inspect `<img>` elements in DevTools | All images use Next.js `<Image>` component. `sizes` prop set (e.g., `(max-width: 768px) 50vw, 25vw`). `srcset` generated. | P1 | |
| UI-IMG-002 | Lazy loading below fold | 1. Open Network tab 2. Load page 3. Check which images loaded | Only above-fold images loaded initially. Below-fold images load on scroll (lazy loading). | P1 | |
| UI-IMG-003 | Image error fallback | 1. Break an image URL (e.g., modify seed data) 2. View card | Card shows colored header strip instead of broken image. No broken image icon. Card content intact. | P1 | |
| UI-IMG-004 | Gallery aspect ratio | 1. Open activity detail with gallery 2. Inspect thumbnail dimensions | All gallery thumbnails maintain 16/10 (1.6:1) aspect ratio. Images use `object-cover` — no distortion. | P1 | |
| UI-IMG-005 | Lightbox image sizing | 1. Open lightbox 2. Check image dimensions | Image constrained to: width 90vw, height 80vh, max-width 5xl (64rem). Maintains aspect ratio within bounds. | P1 | |
| UI-IMG-006 | Placeholder images load | 1. Check seed data images (picsum.photos URLs) | All placeholder images from picsum.photos load correctly. Seed-based URLs generate consistent images. | P1 | |

---

## 2.6 Loading & Error States

| ID | Test Case | Steps | Expected Result | Priority | Status |
|----|-----------|-------|-----------------|----------|--------|
| UI-STATE-001 | Admin loading spinner | 1. Login to admin 2. Observe initial data fetch | Loading spinner displayed while activities/social posts fetch. Spinner styled in brand colors. | P1 | |
| UI-STATE-002 | Form button disabled | 1. Open add activity form 2. Click submit 3. Observe button during API call | Button shows disabled state (reduced opacity, cursor not-allowed) during submission. Prevents double-click. | P1 | |
| UI-STATE-003 | Saving text change | 1. Submit activity form 2. Observe button text | Button text changes from "Add Activity" → "Saving..." during API call. Reverts on completion. | P2 | |
| UI-STATE-004 | Error message styling | 1. Trigger an error (wrong password, API failure) | Error displayed in red background (#EF4444 or similar), white or dark text. Clearly visible. | P1 | |
| UI-STATE-005 | Success message styling | 1. Trigger success (create activity, schedule post) | Success displayed in green background (#10B981 or similar). Checkmark icon. | P1 | |
| UI-STATE-006 | 404 page | 1. Navigate to `/nonexistent-route` | 404 page renders. Styled consistently with app. Not a blank white page or Next.js default error. | P1 | |

---

# SECTION 3: ACCESSIBILITY TEST CASES

---

## 3.1 Keyboard Navigation

| ID | Test Case | Steps | Expected Result | Priority | Status |
|----|-----------|-------|-----------------|----------|--------|
| A11Y-KB-001 | Tab through all interactive elements | 1. Start at top of any page 2. Press Tab repeatedly through entire page | Every button, link, input, and interactive element receives focus in logical order. Nothing skipped. No focus traps (except intentional: lightbox modal). | P0 | |
| A11Y-KB-002 | Focus indicators visible | 1. Tab through page elements | Every focused element shows a visible focus indicator (ring, outline, or border change). Not invisible focus. Primary color ring preferred. | P0 | |
| A11Y-KB-003 | Lightbox keyboard shortcuts | 1. Open lightbox (click or Enter on gallery image) 2. Press → 3. Press ← 4. Press Escape | →: next image. ←: previous image. Escape: closes lightbox. All work from keyboard without mouse. | P0 | |
| A11Y-KB-004 | Mobile menu via keyboard | 1. Tab to hamburger menu button 2. Press Enter 3. Tab through menu items 4. Press Escape or Enter on a link | Menu opens on Enter. All menu links focusable. Navigation works. Menu closes. | P1 | |
| A11Y-KB-005 | Form navigation | 1. Tab to login form password field 2. Type password 3. Tab to Login button 4. Press Enter | All form fields navigable via Tab. Enter submits form (same as clicking Login). | P1 | |
| A11Y-KB-006 | Share panel via keyboard | 1. Tab to share button on activity card 2. Press Enter 3. Tab through share options | Share panel opens. Social share buttons focusable and activatable via Enter/Space. | P1 | |
| A11Y-KB-007 | Admin tabs via keyboard | 1. Tab to admin tab buttons 2. Press Enter or Space on each tab | Tabs switchable via keyboard. Active tab indicated. Tab content updates. | P1 | |

---

## 3.2 Screen Reader

| ID | Test Case | Steps | Expected Result | Priority | Status |
|----|-----------|-------|-----------------|----------|--------|
| A11Y-SR-001 | Navigation landmark | 1. Inspect `<nav>` elements | Header navigation has `<nav>` with `aria-label` (e.g., "Main navigation"). Breadcrumb has `aria-label="Breadcrumb"`. | P1 | |
| A11Y-SR-002 | Search form label | 1. Inspect search input | Search input has associated `<label>` or `aria-label`. Screen reader announces purpose. | P1 | |
| A11Y-SR-003 | Breadcrumb aria | 1. Inspect breadcrumb container | `<nav aria-label="Breadcrumb">`. Items use `<ol>` or `<li>` list structure. | P1 | |
| A11Y-SR-004 | Image alt text | 1. Inspect activity card images 2. Check `alt` attributes | All `<img>` elements have meaningful `alt` text (e.g., activity title). Not empty alt="" (unless decorative). | P0 | |
| A11Y-SR-005 | Decorative elements hidden | 1. Inspect: illustrations (auto-rickshaw, palm tree, kolam, peacock), hero shimmer | All decorative elements have `aria-hidden="true"`. Not announced by screen readers. | P1 | |
| A11Y-SR-006 | Semantic HTML landmarks | 1. Check page structure | Page uses: `<header>` (site header), `<main>` (page content), `<footer>` (site footer), `<nav>` (navigation), `<section>` (content sections). Proper landmark structure. | P0 | |
| A11Y-SR-007 | Form labels | 1. Inspect admin forms (login, add activity) | Every `<input>`, `<select>`, `<textarea>` has associated `<label>` or `aria-label`. Placeholder alone is NOT sufficient. | P1 | |
| A11Y-SR-008 | Status announcements | 1. Trigger: successful login, share success, copy link, error message | Status messages (success, error) are announced to screen readers via `role="alert"`, `aria-live="polite"`, or equivalent. | P2 | |

---

## 3.3 Color & Contrast

| ID | Test Case | Steps | Expected Result | Priority | Status |
|----|-----------|-------|-----------------|----------|--------|
| A11Y-CC-001 | Normal text contrast | 1. Use DevTools or axe to check body text contrast 2. Verify against background | All normal text (<18pt) meets 4.5:1 contrast ratio minimum (WCAG AA). Compute: `(L1 + 0.05) / (L2 + 0.05)`. | P0 | |
| A11Y-CC-002 | Large text contrast | 1. Check headings and large text against backgrounds | All large text (≥18pt or ≥14pt bold) meets 3:1 contrast ratio minimum. | P0 | |
| A11Y-CC-003 | Category badge text | 1. For each category color, verify white text readability | White text on each category color background meets 3:1 minimum. Flag any failing combinations (e.g., yellow #F39C12 may need dark text). | P1 | |
| A11Y-CC-004 | Hero text contrast | 1. Check white text on purple gradient (#4A2366→#8B5CB8) | White (#FFFFFF) on darkest purple (#4A2366) ≥ 4.5:1. White on lightest purple (#8B5CB8) ≥ 3:1 (large text). | P0 | |
| A11Y-CC-005 | Non-color indicators | 1. Check status badges, active states, error/success | Color is NOT the sole indicator. Each status also has: icon (CheckCircle, XCircle, Clock), text label, or shape change. | P1 | |

---

## 3.4 Touch & Interaction

| ID | Test Case | Steps | Expected Result | Priority | Status |
|----|-----------|-------|-----------------|----------|--------|
| A11Y-TOUCH-001 | Touch target minimum size | 1. Set viewport to 375px 2. Inspect button/link dimensions | All interactive elements (buttons, links, pills) have minimum 44×44px touch target area (including padding). | P1 | |
| A11Y-TOUCH-002 | Touch target spacing | 1. Check spacing between adjacent buttons | At least 8px gap between adjacent touch targets. No overlapping hit areas. | P1 | |
| A11Y-TOUCH-003 | No hover-only interactions | 1. Test on touch device (or simulate) | Every hover interaction also works on tap. No content accessible only via hover. Share panel: tap to toggle. | P1 | |
| A11Y-TOUCH-004 | Scroll indicators | 1. Set viewport to 375px 2. Observe category filter | Horizontal scroll areas provide visual cue that more content exists (fade edge, partial pill visible, or scrollbar). | P2 | |
| A11Y-TOUCH-005 | Lightbox touch navigation | 1. Open lightbox on mobile 2. Tap left/right areas | Arrow buttons large enough for touch. Positioned for easy thumb reach. | P1 | |

---

# SECTION 4: USER ACCEPTANCE TEST (UAT) SCENARIOS

---

## UAT-001: Parent Browsing Activities

**Priority**: P0
**Persona**: Parent of a Kidzee Polichalur student, using mobile phone (iPhone 14, Safari)
**Goal**: See what activities their child participated in and share with family

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Open https://kidzee-polichalur.vercel.app on mobile Safari | Homepage loads. Hero visible with "Kidzee Polichalur" heading. | |
| 2 | Scroll down past hero | Wave divider → stats section with animated count-up → recent activities grid (1 column on mobile) | |
| 3 | Tap on "Annual Day Celebrations 2024" activity card | Navigates to `/activities/2024/[id]`. Detail page loads with hero image, breadcrumb, full description. | |
| 4 | Scroll to photo gallery | 2-column grid of activity photos visible. | |
| 5 | Tap on a gallery photo | Lightbox opens. Dark overlay, centered image, counter "1 / 3", arrows for navigation. | |
| 6 | Swipe/tap right arrow to see next photo | Next photo loads with smooth animation. Counter updates "2 / 3". | |
| 7 | Tap X or press back to close lightbox | Lightbox closes. Returns to detail page. Scroll position preserved. | |
| 8 | Scroll to share bar | Social share buttons visible: Facebook, WhatsApp, Twitter, Copy Link. | |
| 9 | Tap WhatsApp share button | WhatsApp opens (or prompts to open) with pre-filled message containing activity title and URL. | |
| 10 | Tap "Copy Link" button | Link copied. Button text shows "Copied!" for 2 seconds. | |
| 11 | Tap "Home" in breadcrumb | Returns to homepage. | |
| 12 | Scroll to category pills | All 10 categories visible (horizontally scrollable). | |
| 13 | Tap "Festival" category pill | Navigates to `/activities/category/festival`. Only festival activities shown. | |
| 14 | Tap "2024" in year selector | URL: `/activities/category/festival?year=2024`. Only 2024 festivals shown. | |
| 15 | Tap "All Years" button | Year filter cleared. All festival activities shown. | |

---

## UAT-002: Admin Managing Content

**Priority**: P0
**Persona**: School administrator (teacher or principal), using desktop Chrome
**Goal**: Add a new activity, edit an existing one, schedule social media posts, review analytics

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Navigate to `/admin` | Redirected to `/admin/login`. Login form visible. | |
| 2 | Enter password `kidzee2024`, click "Login" | Redirected to `/admin`. Dashboard loads with Activities tab active. | |
| 3 | Observe Activities tab | All activities listed, grouped by year. Year sections expandable/collapsible. | |
| 4 | Click "Add Activity" button | Form appears with: Title, Description, Date, Category, Video URL, Tags fields. | |
| 5 | Fill: Title="Republic Day Celebration", Date=2024-01-26, Category="cultural", Description="Students performed patriotic songs...", Tags="patriotic, performance, cultural" | All fields filled. Tags comma-separated. | |
| 6 | Click "Add" / submit button | Loading state → success. New activity appears in 2024 year group. | |
| 7 | Navigate to `/activities/2024` in a new tab | "Republic Day Celebration" visible in the activity list. | |
| 8 | Return to admin. Click edit icon on the new activity. | Edit form opens with pre-filled values: Title="Republic Day Celebration", Date=2024-01-26, etc. | |
| 9 | Change title to "Republic Day Celebration 2024". Click save. | Activity updated. List reflects new title. | |
| 10 | Click delete icon on an old unwanted activity | Confirmation prompt. Confirm → activity removed from list. | |
| 11 | Click "Social Posts" tab | Social posts tab content loads. Shows any existing queued/published posts. | |
| 12 | Return to Activities tab. Click share/schedule button on an activity. | Social share modal opens: platform selector, caption preview. | |
| 13 | Select "Instagram" platform | Instagram button highlighted. Caption preview shows formatted text with hashtags. | |
| 14 | Click "Schedule Post" | Loading → success. Green success message. | |
| 15 | Click "Social Posts" tab | New post visible with status "Queued", platform "Instagram", auto-generated caption. | |
| 16 | Click edit on the social post. Modify caption. Save. | Caption updated inline. | |
| 17 | Click "Analytics" tab | Analytics content loads: total activities, by-category breakdown, by-year chart, social post stats. | |
| 18 | Verify total activities count | Count matches actual number of activities in Activities tab. | |
| 19 | Verify category breakdown | All categories listed with correct counts. Bars proportional. | |
| 20 | Close browser. Reopen. Navigate to `/admin`. | Redirected to login (sessionStorage cleared). Must re-authenticate. | |

---

## UAT-003: First-Time Visitor Discovery

**Priority**: P0
**Persona**: Prospective parent considering Kidzee Polichalur, using iPad (768px)
**Goal**: Explore the school's activities and decide if it's a good fit

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Open homepage on iPad | Full layout: hero with illustrations, desktop-like nav, 2-column activity grid. | |
| 2 | Read hero section | "Kidzee Polichalur — Where every day is an adventure!" clearly visible. Professional design with Kidzee branding. | |
| 3 | Scroll to stats | 4 stat cards in row: years active, activities, students, events/year. Numbers animate up on scroll. | |
| 4 | Continue scrolling to recent activities | 4 recent activity cards. Each with image, category badge, title, date, short description. | |
| 5 | Click "Explore Activities" CTA (or scroll to full list link) | Navigates to `/activities`. Full listing with search and filters. | |
| 6 | Type "sports" in search bar, submit | Search results show sports-related activities. Result count displayed. | |
| 7 | Click on "Sports Day 2024" | Detail page: hero image, full description, tags, photos (if any), related activities. | |
| 8 | Click "Art & Craft" in category filter | Navigates to `/activities/category/art-craft`. Only art activities shown. | |
| 9 | Use year selector to view 2023 activities | `/activities/category/art-craft?year=2023` or `/activities/2023`. Filtered results. | |
| 10 | Navigate back to homepage via header logo or "Home" link | Returns to `/`. Consistent navigation throughout. | |

---

## UAT-004: Mobile-First Experience

**Priority**: P1
**Persona**: Parent on Android phone, Chrome (360px viewport)
**Goal**: Browse activities smoothly on a small screen

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Open homepage on mobile | Hero text readable (4xl). Single-column layout. No horizontal overflow. | |
| 2 | Tap hamburger menu icon | Mobile menu slides open. Shows: Home, Activities, Admin. Backdrop blur effect. | |
| 3 | Tap "Activities" | Menu closes. Navigates to `/activities`. | |
| 4 | Scroll through activities | Single-column cards with entrance animation. Smooth scrolling. | |
| 5 | Tap pagination "Next" or page 2 | Page 2 loads. URL updates. New set of 6 activities. | |
| 6 | Tap on an activity card | Detail page loads. Full-width hero image. Readable text. | |
| 7 | Scroll to gallery | 2-column grid. Thumbnails fill width. | |
| 8 | Tap a gallery image to open lightbox | Lightbox: full-screen, touch-friendly arrow buttons, image counter visible. | |
| 9 | Navigate through lightbox images using arrows | Smooth transitions. Images load quickly. Counter updates. | |
| 10 | Close lightbox | Returns to detail page. Scroll position preserved. | |
| 11 | Tap share button on card | Share panel expands with spring animation. Social buttons visible and tappable. | |
| 12 | Verify all touch targets ≥44px | Buttons, links, pills all comfortably tappable. No accidental taps on adjacent elements. | |

---

## UAT-005: SEO Crawler Validation

**Priority**: P1
**Persona**: Search engine bot (Googlebot)
**Goal**: Validate all SEO elements for proper indexing

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Fetch `/robots.txt` | Valid robots.txt. Allows: `/`. Disallows: `/admin`, `/api/`. Sitemap URL present. | |
| 2 | Fetch `/sitemap.xml` | Valid XML. Contains all public URLs: `/`, `/activities`, year pages, activity details, category pages. | |
| 3 | Validate sitemap structure | Each URL has: `<loc>`, `<lastmod>`, `<changefreq>`, `<priority>`. Priorities descending from 1.0 (homepage) to 0.6 (categories). | |
| 4 | Fetch homepage, check `<head>` | `<title>`, `<meta description>`, OG tags (title, description, image, type, locale), Twitter card tags present. | |
| 5 | Fetch activity detail, check metadata | Dynamic `<title>` with activity name. Dynamic description (first 160 chars). OG image = first activity image. | |
| 6 | Check JSON-LD on homepage | `<script type="application/ld+json">` with EducationalOrganization schema. Valid JSON. | |
| 7 | Check JSON-LD on detail page | Event schema with: name, startDate, location, image, organizer. BreadcrumbList schema. | |
| 8 | Verify no `/admin` or `/api/` URLs in sitemap | Sitemap excludes all admin and API routes. | |

---

## UAT-006: Social Media Sharing Flow

**Priority**: P1
**Persona**: School admin creating social media content
**Goal**: Schedule multiple activity posts across platforms

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Login to admin dashboard | Dashboard loads with Activities tab. | |
| 2 | Find "Diwali Celebration 2024" activity | Activity visible in 2024 year group. | |
| 3 | Click schedule/share button on the activity | Modal opens: platform selector, caption preview. | |
| 4 | Select "Instagram" | Instagram button highlighted. Caption shows: title, description, hashtags (#Kidzee, #KidzeePolichalur, activity-specific tags), location text. | |
| 5 | Review caption preview | Caption formatted correctly with emojis, structured paragraphs, relevant hashtags. | |
| 6 | Click "Schedule Post" | Loading spinner → green success message. | |
| 7 | Open same activity's share modal again | Modal opens fresh (idle state). | |
| 8 | Select "Facebook" this time | Facebook platform selected. Caption similar but may differ. | |
| 9 | Click "Schedule Post" | Second post created successfully. | |
| 10 | Navigate to Social Posts tab | Both posts visible: one Instagram, one Facebook. Both status "Queued". Correct activity title. | |

---

## UAT-007: Search & Discovery Flow

**Priority**: P1
**Persona**: Parent searching for a specific event
**Goal**: Find a particular activity using search and filters

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Navigate to `/activities` | Full activity listing with search bar at top. | |
| 2 | Search "Diwali" | Results filtered. Only Diwali-related activities shown. Result count displayed. | |
| 3 | Verify search results | All results contain "Diwali" in title, description, or tags. No false positives. | |
| 4 | Clear search (empty query, submit) | All activities restored. Default pagination. | |
| 5 | Click "Festival" category pill | Navigates to `/activities/category/festival`. Only festivals shown. | |
| 6 | Click "2024" year button | URL: `/activities/category/festival?year=2024`. Only 2024 festivals. | |
| 7 | Paginate if results > 6 | Pagination works within filtered view. Correct subset on each page. | |
| 8 | Click on a result to view detail | Activity detail page loads with complete information. Breadcrumb accurate. | |

---

## UAT-008: Cross-Browser Validation

**Priority**: P2
**Persona**: QA tester
**Goal**: Ensure consistent rendering across major browsers

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Open site in Chrome (latest) | All features work. Animations smooth. Layout correct. No console errors. | |
| 2 | Open site in Safari (latest, macOS) | Same rendering as Chrome. Backdrop-filter (blur) works. Fonts render correctly. | |
| 3 | Open site in Firefox (latest) | Layout matches. Scrollbar styling may differ (acceptable). Animations work. | |
| 4 | Open site in Edge (latest) | Matches Chrome (same engine). Verify no Edge-specific issues. | |
| 5 | Compare specific elements | Hero gradient, card shadows, blob radius, font rendering, lightbox — all consistent across browsers. | |
| 6 | Test mobile browsers | Safari iOS, Chrome Android — responsive layout correct, touch interactions work. | |

---

# APPENDIX

## A. Test Data Reference

### Seed Activities (10 total)

| # | Title | Category | Year | Images | Video |
|---|-------|----------|------|--------|-------|
| 1 | Annual Day Celebrations 2024 | annual-day | 2024 | 3 | Yes (YouTube) |
| 2 | Sports Day 2024 | sports-day | 2024 | 2 | No |
| 3 | Diwali Celebration 2024 | festival | 2024 | 4 | No |
| 4 | Independence Day 2024 | cultural | 2024 | 2 | No |
| 5 | Art & Craft Exhibition 2024 | art-craft | 2024 | 3 | No |
| 6 | Graduation Ceremony 2023 | graduation | 2023 | 2 | No |
| 7 | Field Trip to Zoo 2023 | field-trip | 2023 | 3 | No |
| 8 | Christmas Carnival 2023 | festival | 2023 | 2 | No |
| 9 | Science Workshop 2023 | workshop | 2023 | 2 | No |
| 10 | Fancy Dress Competition 2023 | competition | 2023 | 3 | No |

### All 10 Categories

| Slug | Label | Icon | Color |
|------|-------|------|-------|
| annual-day | Annual Day | MaskHappy | #9B59B6 |
| sports-day | Sports Day | Trophy | #E67E22 |
| art-craft | Art & Craft | PaintBrush | #E91E63 |
| field-trip | Field Trip | Bus | #27AE60 |
| festival | Festival | Confetti | #F39C12 |
| graduation | Graduation | GraduationCap | #2980B9 |
| workshop | Workshop | Wrench | #8D6E63 |
| competition | Competition | Medal | #D4AC0D |
| cultural | Cultural | MusicNotes | #C0392B |
| other | Other | Star | #7F8C8D |

---

## B. Environment Variables

| Variable | Value | Where |
|----------|-------|-------|
| `ADMIN_PASSWORD` | `kidzee2024` | `.env.local` + Vercel |
| `NEXT_PUBLIC_BASE_URL` | `https://kidzee-polichalur.vercel.app` | `.env.local` + Vercel |

---

## C. Quick Reference — All Routes

| Route | Type | Auth | Purpose |
|-------|------|------|---------|
| `/` | Page | No | Homepage |
| `/activities` | Page | No | Activity listing with search + pagination |
| `/activities/[year]` | Page | No | Year-filtered activities |
| `/activities/[year]/[id]` | Page | No | Activity detail with gallery + share |
| `/activities/category/[slug]` | Page | No | Category-filtered activities |
| `/admin` | Page | Yes | Admin dashboard (3 tabs) |
| `/admin/login` | Page | No | Admin login form |
| `/api/activities` | API | Write: Yes | GET/POST/PATCH/DELETE activities |
| `/api/auth` | API | No | POST login |
| `/api/social` | API | Write: Yes | GET/POST/PATCH/DELETE social posts |
| `/api/seed` | API | No | POST seed demo data |
| `/sitemap.xml` | Route | No | Dynamic XML sitemap |
| `/robots.txt` | Route | No | Crawler directives |

---

## D. Known Limitations (MVP 1)

These are **not bugs** — they are known MVP 1 scope boundaries:

| # | Limitation | Impact | Planned Fix |
|---|-----------|--------|-------------|
| 1 | JSON file storage (not persistent on Vercel) | Data resets on cold start/redeploy | MVP 2: Supabase migration |
| 2 | No image upload UI | Activities can't have user-uploaded photos | MVP 2: Upload form + Supabase Storage |
| 3 | Social posts queue-only | Posts marked "queued" but not auto-published | MVP 2: Meta Graph API integration |
| 4 | Auth = raw password as token | Security concern for production | MVP 2: JWT + httpOnly cookies |
| 5 | Single admin account | Shared password, no audit trail | Future: User accounts + roles |
| 6 | No API rate limiting | Write endpoints unprotected from abuse | Future: Rate limiting middleware |
| 7 | Placeholder images (picsum.photos) | Not real activity photos | Replace when Imtiaz provides photos |

---

*Document generated: 2026-03-29 | Kidzee Polichalur v1.1.0 | 267 test cases*
