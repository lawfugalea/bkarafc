# Birkirkara FC — Architecture & Maintenance

This document is the single source of truth for how the site is built, deployed,
and maintained. Read it before changing anything.

## Stack

| Layer        | Tech                  | Why                                            |
|--------------|-----------------------|------------------------------------------------|
| Frontend     | Next.js 15 (App Router) | Fast, SEO-friendly, image optimisation built in |
| Styling      | Tailwind CSS          | Consistent, no runtime cost                    |
| CMS          | Sanity                | Media team edits content; free tier is plenty  |
| Payments     | Stripe                | Membership sales, address capture, fulfilment  |
| Hosting      | Vercel                | Zero-config Next.js deploy, free tier          |
| DNS / proxy  | Cloudflare            | In front of Vercel for the birkirkarafc.com domain |

## Separation of concerns (IMPORTANT)

- **Design** lives in `src/components` and `src/app`. Changing the look NEVER
  touches content or payments. Club wants a redesign? Only this layer changes.
- **Content** lives in Sanity (schemas in `src/sanity/schemas`). The media team
  owns this via Sanity Studio. Frontend only READS it.
- **Payments** live in Stripe + `src/app/api`. Isolated. Treat as critical.

## Content model (Sanity)

- `post`      — news articles / match reports (title, slug, cover image, body, category, date)
- `fixture`   — matches (home/away team, date, venue, competition, status, score)
- `player`    — squad (name, number, position, photo, bio)
- `membership`— products sold via shop (name, price, tier, description, image)
- `sponsor`   — partner logos + links

## Maintenance boundaries — who does what

### Safe for an agent (OpenClaw / Hermes) via scoped Sanity token:
- Create/update `fixture` documents (results, upcoming matches)
- Create/update `player` documents (squad changes)
- Draft `post` documents (NOT publish without review unless explicitly trusted)
- Read-only monitoring of the deployed site

### Human-only (do NOT let an agent do these unsupervised):
- `npm` dependency upgrades, Next.js / Sanity / Stripe major version bumps
- Anything in `src/app/api` (payment flows)
- Vercel deploy settings, environment variables
- Stripe dashboard config, webhook secrets
- Sanity dataset deletion or schema migrations

Rationale: content is reversible and low-blast-radius; framework/payment changes
are not. Agents operate the content layer; humans own the critical layer.

## Environment variables (never commit these)

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=          # read-only, for the frontend
SANITY_API_WRITE_TOKEN=         # scoped write, for the content agent ONLY
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

## Brand tokens (locked design)

- Red:    #D0021B
- Gold:   #F5A623
- Green:  #2E7D32  (crest banner only)
- Base:   #080808
- Surface:#111111
- Display font: Barlow Condensed (italic 800 for headlines)
- Body font:    Inter

## Ownership note

Vercel account, Sanity org, Stripe account, and the bank account behind Stripe
must all be in the CLUB's name under a club email — not a personal one. The
builder configures; the club owns. This keeps handover clean and keeps the
builder off the hook for the club's finances.
