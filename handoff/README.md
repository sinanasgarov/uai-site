# United Assets Investments SPC — Next.js Handoff

This package maps the working prototype in this project onto the requested production stack:
**Next.js (App Router) + TypeScript + Tailwind CSS**, CMS-ready, SEO-ready, analytics-ready.

Nothing here fabricates credentials or external services. Every integration point is an
environment variable with a documented setup step.

---

## 1. Source of truth

| Prototype file | Becomes |
| --- | --- |
| `content.js` | `src/content/*.ts` typed content modules + CMS schema (see §6) |
| `United Assets Investments.dc.html` | `src/app/layout.tsx` + `Navbar`, `Footer`, `SearchOverlay` |
| `Home.dc.html` | `src/app/page.tsx` + homepage section components |
| `Sectors.dc.html` | `src/app/business-sectors/page.tsx` and `[slug]/page.tsx` |
| `Solutions.dc.html` | `src/app/solutions/page.tsx` |
| `Industries.dc.html` | `src/app/industries/page.tsx` and `[slug]/page.tsx` |
| `Reach.dc.html` | `src/app/global-reach/page.tsx` |
| `Insights.dc.html` | `src/app/insights/page.tsx` and `[slug]/page.tsx` |
| `Catalogue.dc.html` | `src/app/catalogue/page.tsx`, `[sector]`, `[sector]/[category]`, `[sector]/[category]/[product]` |
| `Forms.dc.html` | `RFQForm`, `SupplierForm`, `PartnerForm` + `/api` routes |
| `Contact.dc.html` | `src/app/contact/page.tsx` + `ContactForm` |
| `Legal.dc.html` | `src/app/(legal)/privacy|terms|cookies/page.tsx` |
| `Admin.dc.html` | `src/app/admin/*` behind middleware auth |

---

## 2. Folder structure

```text
src/
  app/
    layout.tsx                 # fonts, <Navbar>, <Footer>, analytics, JSON-LD
    page.tsx                   # Home
    about/page.tsx
    business-sectors/page.tsx
    business-sectors/[slug]/page.tsx
    solutions/page.tsx
    industries/page.tsx
    industries/[slug]/page.tsx
    global-reach/page.tsx
    insights/page.tsx
    insights/[slug]/page.tsx
    catalogue/page.tsx
    catalogue/[sector]/page.tsx
    catalogue/[sector]/[category]/page.tsx
    catalogue/[sector]/[category]/[product]/page.tsx
    request-a-quote/page.tsx
    become-a-supplier/page.tsx
    partner-with-us/page.tsx
    contact/page.tsx
    (legal)/privacy/page.tsx
    (legal)/terms/page.tsx
    (legal)/cookies/page.tsx
    admin/page.tsx
    admin/leads/page.tsx
    admin/content/[type]/page.tsx
    not-found.tsx              # 404
    sitemap.ts  robots.ts  opengraph-image.tsx
    api/
      inquiries/route.ts       # POST — contact
      rfq/route.ts             # POST — request a quote
      suppliers/route.ts       # POST — supplier registration
      partnerships/route.ts    # POST — partnership enquiry
      upload/route.ts          # POST — presigned upload
      search/route.ts          # GET  — global search
      leads/route.ts           # GET  — admin list + CSV export (protected)
  components/
    layout/       Navbar.tsx MobileNav.tsx SectorMegaMenu.tsx Footer.tsx SearchOverlay.tsx
    sections/     Hero.tsx CompanyIntro.tsx SectorGrid.tsx WhatWeDo.tsx SolutionStrip.tsx
                  IndustryGrid.tsx ReachDiagram.tsx ProcessTimeline.tsx WhyUs.tsx
                  BusinessFinder.tsx EnquiryCTA.tsx InsightsTeaser.tsx ContactCTA.tsx
    cards/        SectorCard.tsx IndustryCard.tsx SolutionCard.tsx ProductCard.tsx ArticleCard.tsx
    forms/        RFQForm.tsx SupplierForm.tsx PartnerForm.tsx ContactForm.tsx
                  FieldText.tsx FieldArea.tsx FieldSelect.tsx FieldRadio.tsx FieldFile.tsx
                  FormStates.tsx      # loading / success / error / empty
    ui/           Button.tsx Plate.tsx Kicker.tsx Rule.tsx Tag.tsx Reveal.tsx Breadcrumb.tsx
  content/        sectors.ts solutions.ts industries.ts process.ts legal.ts site.ts images.ts
  lib/            seo.ts search.ts validation.ts reference.ts mailer.ts rateLimit.ts
                  analytics.ts cms.ts db.ts
  styles/         globals.css     # Tailwind + the Classical design tokens as CSS variables
```

---

## 3. Design system

The visual system is **Classical**: Cormorant Garamond headings over Lora body, ground
`#f3f2f2`, ink `#201f1d`, a single gold accent `#b68235`, deep near-black `#1b1a18` for
full-bleed industrial bands, hairline dividers, outlined (never filled) buttons, and
photographs matted in the `.plate` treatment.

Port the tokens into `tailwind.config.ts`:

```ts
// tailwind.config.ts (extract)
export default {
  theme: {
    extend: {
      colors: {
        bg: '#f3f2f2', surface: '#eae9e9', ink: '#201f1d', night: '#1b1a18',
        accent: { DEFAULT: '#b68235', 700: '#7d5411', 800: '#5a3b0a' },
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['Lora', 'serif'],
      },
      borderColor: { divider: 'color-mix(in srgb, #201f1d 16%, transparent)' },
    },
  },
} satisfies import('tailwindcss').Config;
```

Load both faces with `next/font/google` in `layout.tsx` (`display: 'swap'`,
weights 400/600) so there is no CLS.

Rules to preserve: no solid accent fills; elevation is a whisper; body copy justified at a
comfortable measure; every photograph goes through `<Plate>`.

---

## 4. Environment variables

Copy `.env.example` to `.env.local`. **No key in this repo is real.**

```ini
# Site
NEXT_PUBLIC_SITE_URL=https://www.example-domain.om

# Email (transactional) — Resend, SendGrid or SMTP
MAIL_PROVIDER=resend
RESEND_API_KEY=
MAIL_FROM="United Assets Investments <no-reply@yourdomain.om>"
MAIL_TO_RFQ=
MAIL_TO_SUPPLIERS=
MAIL_TO_PARTNERSHIPS=
MAIL_TO_CONTACT=

# Database (leads + CMS content) — Postgres via Prisma
DATABASE_URL=

# File uploads — S3-compatible (AWS S3, Cloudflare R2)
S3_ENDPOINT=
S3_REGION=
S3_BUCKET=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
UPLOAD_MAX_MB=10

# Spam protection
TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# Admin auth — NextAuth credentials or provider
NEXTAUTH_URL=
NEXTAUTH_SECRET=
ADMIN_EMAILS=

# Analytics
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GSC_VERIFICATION=

# CMS (optional — Sanity shown)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_READ_TOKEN=
```

### Setup order
1. **Database** — provision Postgres, set `DATABASE_URL`, run `npx prisma migrate deploy`.
2. **Email** — create the provider account, verify the sending domain (SPF + DKIM), set `MAIL_*`.
3. **Uploads** — create the bucket, block public reads, issue a scoped key, set `S3_*`.
4. **Spam** — register the domain with Cloudflare Turnstile, set `TURNSTILE_*`.
5. **Admin auth** — set `NEXTAUTH_SECRET` (`openssl rand -base64 32`) and `ADMIN_EMAILS`.
6. **Analytics** — create the GA4 property and Search Console entry, set the public IDs.
7. **CMS** — optional; until it is connected the typed content modules in `src/content` are the source.

Until a variable is set, the corresponding feature degrades honestly: forms validate and
report "submission channel not configured" rather than pretending to send.

---

## 5. Forms and conversion flows

All four forms share `lib/validation.ts` (Zod) so client and server enforce the same rules.

```ts
// src/lib/validation.ts (extract)
import { z } from 'zod';

export const rfqSchema = z.object({
  name: z.string().min(2), company: z.string().min(2), position: z.string().optional(),
  email: z.string().email(), phone: z.string().min(6), country: z.string().min(2),
  sector: z.string().min(2), product: z.string().min(2), quantity: z.string().min(1),
  spec: z.string().optional(), destination: z.string().min(2),
  requiredDate: z.string().optional(), notes: z.string().optional(),
  fileKeys: z.array(z.string()).max(10).optional(),
  consent: z.literal(true), token: z.string().min(1), // Turnstile
});
export type RFQInput = z.infer<typeof rfqSchema>;
```

```ts
// src/app/api/rfq/route.ts
import { NextResponse } from 'next/server';
import { rfqSchema } from '@/lib/validation';
import { rateLimit } from '@/lib/rateLimit';
import { verifyTurnstile } from '@/lib/spam';
import { createInquiry } from '@/lib/db';
import { sendCompanyNotification, sendUserConfirmation } from '@/lib/mailer';
import { makeReference } from '@/lib/reference';

export async function POST(req: Request) {
  const limited = await rateLimit(req, { key: 'rfq', max: 5, windowMs: 60_000 });
  if (limited) return NextResponse.json({ error: 'RATE_LIMITED' }, { status: 429 });

  const parsed = rfqSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'VALIDATION', issues: parsed.error.flatten() }, { status: 400 });
  }
  if (!(await verifyTurnstile(parsed.data.token))) {
    return NextResponse.json({ error: 'SPAM_CHECK' }, { status: 400 });
  }

  const reference = makeReference('RFQ');            // RFQ-2026-0412
  const inquiry = await createInquiry({ type: 'RFQ', reference, ...parsed.data });

  await Promise.allSettled([
    sendCompanyNotification('rfq', inquiry),
    sendUserConfirmation(parsed.data.email, 'rfq', inquiry),
  ]);

  return NextResponse.json({ ok: true, reference }, { status: 201 });
}
```

**Reference numbers:** `PREFIX-YYYY-NNNN` where prefix is `RFQ`, `SUP`, `PTR` or `MSG`.
In production make the sequence a database counter, not random, so references are unique.

**File uploads:** the browser never posts binaries to the API. `POST /api/upload` returns a
presigned PUT URL; the client uploads directly to the bucket and submits the returned keys.
Server-side restrictions: extension allowlist (`pdf doc docx xls xlsx jpg jpeg png`),
`UPLOAD_MAX_MB` size cap, content-type sniffing, randomised object keys, no public ACL.

**States:** every form implements idle / validating / submitting / success / error, plus
per-field inline errors and an upload row per file (`Ready`, `Over 10 MB`, `Type not allowed`).
The prototype already demonstrates all of them.

---

## 6. CMS model

Content types, exactly as specified:

```ts
// src/content/types.ts
export type SEO = { title: string; description: string; ogImage?: string };

export type BusinessSector = {
  title: string; slug: string; shortDescription: string; fullDescription: string;
  heroImage: string; gallery: string[];
  categories: { name: string; text: string; image?: string; subcategories?: string[] }[];
  services: { name: string; text: string }[];
  applications: string[]; seo: SEO;
};

export type Product = {
  name: string; slug: string; sector: string; category: string; subcategory?: string;
  images: string[]; description: string; applications: string[];
  specifications: { label: string; value: string }[];
  documents: { label: string; url: string }[];
  relatedProducts: string[]; seo: SEO;
};

export type Article = {
  title: string; slug: string; category: string; coverImage: string;
  content: string; author: string; publicationDate: string; seo: SEO;
};

export type Inquiry = {
  id: string; type: 'RFQ' | 'Supplier' | 'Partnership' | 'Contact';
  name: string; company: string; email: string; phone?: string; country: string;
  sector?: string; requirement?: string; files: string[];
  status: 'new' | 'in_review' | 'quoted' | 'won' | 'closed';
  createdAt: string; referenceNumber: string;
};
```

Recommended CMS: **Sanity** (structured, good for the sector → category → subcategory →
product tree) or **Payload** if the client wants CMS and database in one deployment.
`lib/cms.ts` is the single read boundary: swap its implementation from the typed content
modules to the CMS client and no page component changes.

**Content rules baked into the prototype — keep them:** no fabricated products, articles,
clients, certifications, offices or statistics; no commercial registration or licence
numbers, shareholder or personal identity data anywhere on the public site.

---

## 7. Email templates

Four notification pairs (company + user), all plain-HTML tables with the Classical palette:

- `rfq-company` / `rfq-user`
- `supplier-company` / `supplier-user`
- `partnership-company` / `partnership-user`
- `contact-company` / `contact-user`

Company notifications carry every submitted field plus signed download links to attachments.
User confirmations carry the reference number, a summary of what was submitted, and expected
response time. No marketing copy in transactional mail.

---

## 8. Security checklist

- Zod validation on the client **and** in every route handler.
- Rate limiting per IP and per email (Upstash Redis or the database).
- Cloudflare Turnstile on all four public forms.
- Presigned uploads, extension allowlist, size cap, private bucket, randomised keys.
- `/admin/*` and `/api/leads` behind `middleware.ts` session checks; `ADMIN_EMAILS` allowlist.
- CSRF-safe: same-origin JSON POSTs only; no cookie-authenticated GET mutations.
- Security headers via `next.config.ts`: HSTS, `X-Content-Type-Options`, `Referrer-Policy`,
  frame-ancestors and a CSP allowing only the image CDN, analytics and Turnstile.
- Secrets server-side only; the sole `NEXT_PUBLIC_*` values are the site URL, GA ID,
  Turnstile site key and CMS project ID.

---

## 9. SEO

- Per-route `generateMetadata` — unique title, description, canonical, OG title/description/image.
- One `<h1>` per page; section `<h2>`/`<h3>` hierarchy as built in the prototype.
- `app/sitemap.ts` generates entries from the content modules (sectors, industries,
  solutions, catalogue nodes, articles, legal). `app/robots.ts` allows all, disallows `/admin`.
- JSON-LD: `Organization` in `layout.tsx`; `BreadcrumbList` per deep page;
  `Service` per sector; `Article` per insight. Never mark up claims the company has not made.
- Descriptive `alt` text on every photograph (already written in the prototype).
- Themes to target: Oman trading company, Oman logistics, industrial supply GCC,
  machinery / building materials / steel / electrical equipment / chemical trading Oman,
  procurement Oman. No keyword stuffing.

---

## 10. Performance

- `next/image` with AVIF + WebP, `sizes` per breakpoint, `priority` on the hero only,
  `loading="lazy"` elsewhere (as in the prototype), blur placeholders from the CMS.
- Server components by default; `'use client'` only for the nav, search overlay, forms,
  business finder, flow steppers, catalogue accordions and the reach diagram.
- Route-level code splitting is automatic; keep the search index in a route handler rather
  than shipping it to the client once it exceeds a few hundred entries.
- Scroll reveals use a single IntersectionObserver and respect `prefers-reduced-motion`.
- Targets: LCP < 2.5s on 4G, CLS < 0.05, INP < 200ms.

---

## 11. Analytics

`lib/analytics.ts` exposes `track(event, payload)`, a no-op until `NEXT_PUBLIC_GA_ID` is set.
Events to fire: `rfq_submit`, `contact_submit`, `supplier_submit`, `partnership_submit`,
`cta_click`, `whatsapp_click`, `phone_click`, `email_click`, `catalogue_download`,
`product_enquiry`, `search_query`, `finder_select`.

---

## 12. Accessibility

Semantic landmarks, skip link, visible `:focus-visible` gold ring (never the browser default),
labelled form controls with `aria-invalid` and `role="alert"` messages, `aria-pressed` on
toggle buttons, `role="radiogroup"` on choice rows, keyboard-operable overlays with Escape,
44px minimum touch targets, and contrast held above 4.5:1 for body copy (accent text uses the
`accent-700` ramp step, never the base gold).

---

## 13. Localisation

The site ships **English only**, as specified — no language selector. The architecture stays
ready: keep all copy in `src/content`, wrap pages in an `app/[locale]` segment when a second
language is commissioned, and add `hreflang` at that point. Do not add Arabic or Russian now.

---

## 14. Definition of done

- [ ] All 23 routes render with unique metadata
- [ ] Four forms submit, notify, confirm and store, with a unique reference number
- [ ] Uploads land in a private bucket with type and size enforcement
- [ ] Admin console lists, filters, updates status and exports CSV behind auth
- [ ] Lighthouse ≥ 90 on Performance, Accessibility, Best Practices, SEO
- [ ] No fabricated company facts, and no registration or personal data on the public site
