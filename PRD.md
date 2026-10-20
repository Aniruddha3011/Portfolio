# Product Requirements Document
## Aniruddha — Personal Developer Portfolio Website

**Document version:** 1.0
**Owner:** Aniruddha
**Status:** Draft for build

---

## 1. Overview

### 1.1 Product Name
Aniruddha — Personal Developer Portfolio

### 1.2 Product Type
Interactive, single-page (multi-route) personal portfolio and developer showcase, built to present real, shipped software products rather than a generic "skills list" resume site.

### 1.3 Core Positioning Statement
> "I build intelligent, secure and practical software products that solve real-world problems."

This must be communicated within the first 5–10 seconds of landing on the site — through the hero headline, not through a paragraph of biography.

### 1.4 Identity Statement
Aniruddha is positioned as a **Software Developer & Product Builder**, with specialties across:
- Android Development
- AI & Intelligent Systems
- Automation
- Backend Engineering
- Cloud & Firebase
- Full-Stack Product Development

This is intentionally broader than "Android Developer" — the portfolio's job is to prove that breadth through real projects (SafeHer, AURA, the automation lab), not through claims.

### 1.5 Design Philosophy
The single most important design principle for this build:

> The website should communicate **"this person actually builds things,"** not **"this person knows a lot of buzzwords."**

Concretely, this means:
- No emoji-tag skill soup (🚀 AI | 💻 Developer | 🔥 Coder)
- No wall-to-wall animation — motion is used with restraint and purpose
- Projects and architecture are the center of gravity of the site, not decoration
- Dark, futuristic, premium, professional — never gimmicky

---

## 2. Goals

### 2.1 Primary Goal
Present Aniruddha as a developer capable of designing, building, and shipping complete, real-world software systems — not just writing isolated code samples.

### 2.2 Secondary Goals
- Make SafeHer and AURA the emotional and technical centerpiece of the site
- Demonstrate systems-thinking through visual architecture diagrams, not just tech-tag lists
- Give recruiters/collaborators a fast path to GitHub, resume, and contact
- Make the site feel "alive" (Currently Building section) rather than static
- Keep performance, accessibility, and SEO at a professional bar

### 2.3 Non-Goals (for v1)
- No AI portfolio chat assistant in the initial build (explicitly a Phase 2 feature)
- No CMS/admin panel — content is managed via structured data files, not a database, at launch
- No blog/articles section unless added later

---

## 3. Target Audience

| Audience | What they need from the site |
|---|---|
| Recruiters | Fast signal of range + seniority within seconds; resume download |
| Software companies | Evidence of full-lifecycle product thinking, not just coding |
| Hackathon judges | Clear problem → solution → architecture per project |
| Fellow developers | Real tech stack detail, GitHub, code quality signals |
| Potential collaborators | A clear, low-friction way to reach out |
| Clients | Trust signals: shipped products, clean case studies |
| College/academic evaluators | Achievements, journey, and technical depth |

---

## 4. Primary User Journey

```
Visitor
  ↓
Hero (understands positioning in <10s)
  ↓
About / What I Build (understands range)
  ↓
Featured Projects
  ↓
Project Case Study (problem → solution → architecture → features → tech)
  ↓
Technology Stack (interactive)
  ↓
Journey / Achievements / Currently Building
  ↓
GitHub / Resume
  ↓
Contact
```

The site must support both a **linear scroll journey** (for a first-time visitor) and **direct jump navigation** (for a recruiter who wants only projects + resume), via a sticky nav, command palette (Ctrl+K), and anchor links.

---

## 5. Information Architecture

```
HOME
 │
 ├── Hero
 ├── About / Who I Am
 ├── What I Build
 ├── Featured Projects
 ├── Project Case Studies (dedicated routes)
 ├── Technology Stack
 ├── How I Build
 ├── My Journey
 ├── Currently Building
 ├── Achievements
 ├── GitHub / Open Source
 ├── Resume
 └── Contact
```

### 5.1 Routing
- `/` — single-page scroll experience containing all sections above except case studies
- `/projects/safeher` — full case study
- `/projects/aura` — full case study
- `/projects/automation-lab` — full case study
- `/projects/secure-desktop` — full case study
- `/projects/pdf-studio` — full case study (once the project exists)
- `/resume` — optional dedicated resume viewer route (in addition to download)

---

## 6. Detailed Section Requirements

### 6.1 Hero Section (Critical Path — highest priority)

**Purpose:** Communicate positioning in under 10 seconds.

**Content sequence (animated on load):**
1. Name: `ANIRUDDHA`
2. Headline (word-by-word reveal): `BUILDING SOFTWARE THAT SOLVES REAL PROBLEMS.`
3. Specialty tags fade in: `Android · AI · Automation · Backend`
4. Supporting line: "I don't just write code. I build complete products."
5. Two CTAs: `Explore My Work` (scrolls to Featured Projects) and `Download Resume`

**Background:** Subtle animated node/network grid, low opacity, nodes drifting slowly — must never compete with text for attention. Must degrade to a static or CSS-only version under `prefers-reduced-motion`.

**Acceptance criteria:**
- Headline is fully legible and finishes animating within ~2.5s
- CTAs are keyboard-focusable and have visible focus states
- Background animation has negligible CPU/GPU cost (no heavy WebGL required — CSS/SVG/Canvas at low particle count is sufficient)

---

### 6.2 About / Who I Am

**Content:** Short, interactive — not a biography wall.
- 2–3 sentence identity statement (full-lifecycle developer: idea → UI → backend → DB → auth → automation → deployment)
- "Currently exploring" tag list: AI, Automation, Mobile Applications, Intelligent Systems, Cloud Technologies
- Animated stat cards using **only real numbers** Aniruddha supplies (e.g., Projects, Technologies, Systems Built) — no placeholder/fake stats ship to production. One card may read "Always Learning" as a qualitative stat.

**Acceptance criteria:**
- All numeric stats are sourced from a single data file (`data/stats.ts`) so they're easy to update honestly over time
- Numbers animate (count-up) once on scroll into view, not on every re-render

---

### 6.3 What I Build

Four interactive cards, each expanding on hover/tap to reveal its technology list:

| Card | Technologies |
|---|---|
| 📱 Mobile Applications | Android, Kotlin, Jetpack Compose, Firebase, MVVM, Clean Architecture |
| 🤖 Intelligent Systems | AI, AI Agents, Automation, Decision Systems, APIs |
| ⚙️ Backend Systems | Node.js, Express, MongoDB, REST APIs, JWT, Firebase Admin |
| ☁️ Infrastructure & Automation | Docker, n8n, Cloudinary, Firebase, Deployment |

**Acceptance criteria:**
- Cards are usable via keyboard (tab + enter) and touch (tap-to-expand), not hover-only
- Expand/collapse animation respects reduced-motion

---

### 6.4 Featured Projects (Heart of the Site)

Ordered, numbered project cards (01–05+), each linking to a full case study:

1. **SafeHer** — women's safety platform (Android, Kotlin, Jetpack Compose, Firebase, Node.js, MongoDB, Cloudinary)
2. **AURA** — AI-powered operations assistant connecting business systems/databases/services into an intelligent automation layer (AI, Automation, APIs, n8n, Backend, Database) — flagship project, should include a visual system diagram (College Database / Healthcare Appointments / Business Systems → AI Engine)
3. **Automation Lab** — self-hosted Docker + n8n automation infrastructure (Docker, n8n, WSL2, Windows, APIs, Automation)
4. **Secure Desktop** — privacy-focused face-authentication desktop protection concept (Face Authentication, Computer Vision, Security, Windows)
5. **PDF Studio** — PDF editing/document productivity app (PDF, Document Processing, Android/Web, UI/UX) — include only once the project actually exists

**Card design requirements:**
- Numbered index (01, 02, …), project name, one-line category, tech pill row, "View Case Study →"
- Hover/focus state: slight lift, gradient glow, screenshot preview slide-in, animated arrow
- Must remain fully functional (tap to open case study) on touch devices without hover

**Acceptance criteria:**
- Every card links to a real case-study route
- Tech pills match the authoritative list in `data/projects.ts`
- No project is listed unless it genuinely exists in the described state

---

### 6.5 Project Case Studies

Each case study page follows a consistent template:

```
[Project Name]
[One-line category]

Problem
Solution
Architecture (diagram)
Key Features (bulleted)
Technology (tag list)
GitHub → (link)
Live Demo → (if available)
```

**Acceptance criteria:**
- Architecture is shown as a visual diagram (simple flow, not a paragraph)
- Each case study has a working back-link to the Featured Projects section
- GitHub link opens the correct repository; missing repos are omitted rather than linked to a 404

---

### 6.6 Technology Stack

Presented two ways:
1. **Interactive constellation/graph** centered on "Aniruddha," connected to top-level categories (Android, AI, Backend, Automation, Firebase, Docker); clicking a node reveals: which projects use it + specific experience within it
2. **Organized categorical list** as a fallback/accessible view: Mobile, Backend, Database, Automation, Tools

**Acceptance criteria:**
- Constellation view has a non-JS/reduced-motion fallback that is still fully readable (the categorical list satisfies this)
- Every technology shown maps to at least one real project in `data/projects.ts`

---

### 6.7 How I Build

An 8-step animated process line, revealed on scroll:

`Idea → Problem Research → System Design → UI/UX → Development → Testing → Deployment → Improvement`

**Purpose:** Signal an engineering process, not tutorial-copying. The connecting line should draw itself as the user scrolls past the section.

---

### 6.8 My Journey

A vertical timeline using **real dates only** — no invented years. Suggested real milestones based on stated history: started programming → Android development → Kotlin + Jetpack Compose → Firebase + Backend → SafeHer → AI & Automation → AURA → "Building what's next…"

**Acceptance criteria:** Every date/milestone is confirmed by Aniruddha before shipping; no placeholder years ship to production.

---

### 6.9 Currently Building

A "live" feeling widget showing the in-progress project (e.g., AURA) with a progress bar and a checklist (Architecture ✓ / Automation ✓ / Database integration ✓ / AI workflows ✓ / Production deployment ○).

**Acceptance criteria:** This section is designed to be trivially editable (single data object) so it can be updated whenever Aniruddha's active work changes — it should never go stale for more than a project cycle.

---

### 6.10 Achievements

Only real, confirmed items — e.g., Smart India Hackathon participation, SafeHer as a shipped product, AURA as a built system, published Android applications. No fabricated awards or certifications.

---

### 6.11 GitHub / Open Source

GitHub is presented as a first-class section, not a single outbound link:
- Contribution activity graph
- Repository count / top languages
- Optional: live GitHub API integration for auto-updating stats (Phase 2 if not in v1 scope)

**Acceptance criteria:** If GitHub API integration is out of scope for v1, this section still displays real, manually-maintained stats rather than a static mock chart with fake data.

---

### 6.12 Resume

- Primary CTA: `Download Resume` (direct PDF download)
- Secondary: `View Resume` (in-browser viewer, opens PDF in a new tab or embedded viewer)

**Acceptance criteria:** Resume PDF is version-controlled in `public/resume/` and the download always serves the latest file.

---

### 6.13 Contact

- Framing copy: "Let's build something." with links to GitHub, LinkedIn, Email
- Minimal form: Name, Email, Message, Send button
- Server-side validation and rate limiting required (see Security, §9.4)

---

### 6.14 Footer

Minimal: Name, one-line tagline, specialty tags, copyright year, closing line ("Built with curiosity + code.").

---

## 7. Interactive / Signature Features

| Feature | Description | Priority |
|---|---|---|
| Command Palette (Ctrl+K) | Quick-jump search: About, Projects, Skills, GitHub, Resume, Contact | Should-have (v1) |
| Custom cursor (desktop only) | Cursor shows "VIEW" over project cards, "→" over links | Nice-to-have |
| System Status widget | "● SYSTEM ONLINE — Currently building: [X] — Location: India — Status: Available for collaboration," manually controlled | Should-have (v1) |
| GitHub activity | Real contribution/repo data | Should-have (v1) |
| AI Portfolio Assistant | Chat-style Q&A about Aniruddha's work, answered from portfolio data | Phase 2 (post-launch) |

---

## 8. Design System

### 8.1 Theme
Dark, futuristic, minimal — one dark base, two accent colors only.

| Token | Value |
|---|---|
| Background | `#050505` |
| Primary accent (Electric Purple) | `#8B5CF6` |
| Secondary accent (Cyan) | `#22D3EE` |
| Primary text | `#FFFFFF` |
| Secondary text | `#A1A1AA` |

Gradients (purple → cyan) reserved for headline accents, primary CTAs, and key dividers — not overused.

### 8.2 Typography
Strong, confident type hierarchy. Large display headline in hero; consistent modular scale throughout. (Specific typeface to be selected during implementation — recommend a modern geometric sans for headings and a clean readable sans for body.)

### 8.3 Background Treatment
Subtle animated grid or scattered node/star field, low opacity, never interfering with text contrast or readability.

### 8.4 Glassmorphism
Used sparingly — card surfaces or nav bar only, not as a blanket effect across the page.

---

## 9. Animation System

### 9.1 Page Load Sequence
`ANIRUDDHA` (logo/name) → `BUILD` slides in → `IDEAS → PRODUCTS` → main page reveals.

### 9.2 Scroll Animations
- Headings fade upward into view
- Project images/screenshots reveal on scroll
- Architecture/process lines draw themselves
- Cards shift slightly on entry
- Technology nodes appear progressively
- Stat numbers count upward once, on first entry into viewport

### 9.3 Constraints
- Animation should support, never distract from, content
- All motion must respect `prefers-reduced-motion: reduce` — fall back to instant/fade-only states
- No more than one "hero-level" animated moment per section

---

## 10. Functional Requirements

| ID | Requirement |
|---|---|
| FR-01 | Website must be fully responsive across mobile, tablet, and desktop breakpoints |
| FR-02 | Website must contain an animated hero section per §6.1 |
| FR-03 | Website must display featured projects per §6.4 |
| FR-04 | Each major project must have a detailed case-study page per §6.5 |
| FR-05 | Technology stack must be displayed interactively per §6.6 |
| FR-06 | Resume must be downloadable and viewable per §6.12 |
| FR-07 | GitHub and professional social links must be accessible from nav, footer, and contact |
| FR-08 | Contact form must allow visitors to send messages, with validation and delivery confirmation |
| FR-09 | Navigation must support smooth scrolling to in-page anchors |
| FR-10 | Project cards must support hover (desktop) and tap (touch) interactions equivalently |
| FR-11 | All animations must respect reduced-motion accessibility preferences |
| FR-12 | Website must be optimized and tested for mobile-first usage, not a shrunk desktop layout |
| FR-13 | Command palette (Ctrl+K) must provide quick navigation to all major sections |
| FR-14 | Currently Building and System Status content must be editable via a single structured data source |

---

## 11. Non-Functional Requirements

### 11.1 Performance
- Target Lighthouse Performance score > 90 on key pages (home, case studies)
- Images optimized/served responsively (e.g., Next.js Image component)
- Heavy animation libraries (GSAP) loaded only where genuinely needed, not globally

### 11.2 Accessibility
- WCAG-friendly color contrast (verify purple/cyan-on-dark combinations meet AA where used for text)
- Full keyboard navigation support (nav, cards, command palette, form)
- Visible focus states throughout
- Reduced-motion support across all animated sections

### 11.3 SEO
- Descriptive `<title>` and meta description per page
- OpenGraph image and metadata for social sharing
- Structured metadata (JSON-LD `Person`/`CreativeWork` where relevant)
- `sitemap.xml` and `robots.txt`

### 11.4 Security
- No API keys or secrets exposed client-side
- Contact form: server-side input validation and sanitization
- Contact/API endpoints rate-limited to prevent abuse
- Server-side credentials (e.g., email service keys) kept strictly server-side (API routes / environment variables)

---

## 12. Recommended Technical Architecture

### 12.1 Stack
| Layer | Choice |
|---|---|
| Frontend framework | Next.js + TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion (primary), GSAP (only for complex scroll-driven sequences, e.g., "How I Build" line-draw) |
| Icons | Lucide |
| Contact backend | Next.js API route + transactional email service (e.g., Resend/SendGrid) |
| Hosting/CI | GitHub → Vercel |

### 12.2 Deployment Flow
```
GitHub (source of truth)
   ↓
Next.js build
   ↓
Vercel (hosting + CI/CD)
```

### 12.3 Suggested Project Structure
```
portfolio/
├── app/
│   ├── page.tsx
│   ├── about/
│   ├── projects/
│   │   ├── safeher/
│   │   ├── aura/
│   │   ├── automation-lab/
│   │   ├── secure-desktop/
│   │   └── pdf-studio/
│   └── contact/
├── components/
│   ├── Navbar
│   ├── Hero
│   ├── About
│   ├── ProjectCard
│   ├── ProjectCaseStudy
│   ├── Skills
│   ├── Timeline
│   ├── GitHub
│   ├── Contact
│   └── Footer
├── data/
│   ├── projects.ts
│   ├── skills.ts
│   ├── stats.ts
│   └── experience.ts
├── public/
│   ├── projects/
│   ├── resume/
│   └── images/
└── styles/
```

### 12.4 Content Data Model (illustrative)
```ts
// data/projects.ts
type Project = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  problem: string;
  solution: string;
  architecture: string[]; // ordered steps for diagram rendering
  features: string[];
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: "shipped" | "in-progress" | "concept";
};
```
Keeping all project/skill/stat content in typed data files (rather than hardcoded JSX) makes the site easy to update honestly over time and is a prerequisite for the future GitHub-stat and AI-assistant integrations.

---

## 13. Content Governance

To avoid the single biggest risk in a portfolio like this — **exaggeration** — every quantitative or achievement-based claim on the site must trace back to something real:
- Stats (§6.2), journey dates (§6.8), and achievements (§6.10) are sourced from Aniruddha directly, never invented as placeholders
- "Currently Building" (§6.9) must be updated to reflect true current status, not left stale
- Projects not yet built (e.g., PDF Studio) are excluded from Featured Projects until they exist, or clearly marked as "concept/in-progress" if included early

---

## 14. Phased Roadmap

### Phase 1 — Core Site (Launch)
Hero, About, What I Build, Featured Projects, Case Studies (SafeHer, AURA, Automation Lab, Secure Desktop), Technology Stack, How I Build, Journey, Achievements, Resume, Contact, Footer. Command palette and System Status widget included if feasible within timeline.

### Phase 2 — Enhancements
Live GitHub API integration for real-time activity stats; PDF Studio case study once built; custom cursor polish; refined scroll choreography.

### Phase 3 — AI Portfolio Assistant
Conversational "Ask about Aniruddha" widget that answers visitor questions using the same structured project/skills data as the rest of the site — built only after the core site is stable, since it is itself a showcase of Aniruddha's AI/automation skill set.

---

## 15. Acceptance Criteria Summary (Definition of Done for v1)

- [ ] Hero communicates positioning within 10 seconds, animated, reduced-motion safe
- [ ] All Featured Projects link to complete, real case studies
- [ ] Technology stack section works via both constellation and accessible list view
- [ ] Resume is downloadable and current
- [ ] Contact form validates input, is rate-limited, and delivers messages reliably
- [ ] Site is mobile-first responsive, not a shrunk desktop layout
- [ ] Lighthouse Performance > 90 on home and at least one case-study page
- [ ] No fabricated stats, dates, or achievements anywhere on the site
- [ ] All animations respect `prefers-reduced-motion`
- [ ] SEO metadata, OpenGraph image, sitemap, and robots.txt are in place

---

## 16. Final Concept Summary

```
                 ANIRUDDHA
                     │
                     ↓
          BUILDING REAL PRODUCTS
                     │
        ┌────────────┼────────────┐
        ↓            ↓            ↓
      MOBILE        AI         AUTOMATION
        │            │            │
        └────────────┼────────────┘
                     ↓
               REAL PROJECTS
                     │
        ┌────────────┼────────────┐
        ↓            ↓            ↓
     SAFEHER       AURA       OTHER BUILDS
        │            │
        └────────────┼────────────┘
                     ↓
              HOW I BUILD
                     │
                     ↓
              TECHNOLOGIES
                     │
                     ↓
              GITHUB / RESUME
                     │
                     ↓
             LET'S BUILD TOGETHER
```

**Target feeling:** Dark → futuristic → intelligent → technically impressive → clean → personal.