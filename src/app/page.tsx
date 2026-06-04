import Image from "next/image";
import Footer from "@/components/Footer";
import { client, urlFor } from "@/lib/sanity.client";
import {
  homepageQuery,
  featuredPostQuery,
  recentPostsQuery,
  nextFixtureQuery,
  recentResultsQuery,
  squadPreviewQuery,
} from "@/lib/queries";

export const revalidate = 60;

// ── Types ─────────────────────────────────────────────────────────────────────

interface SanityImage {
  asset: { _ref: string };
}

interface SanityPost {
  title: string;
  slug: { current: string };
  category: string;
  coverImage?: SanityImage;
  excerpt?: string;
  publishedAt: string;
}

interface SanityFixture {
  homeTeam: string;
  awayTeam: string;
  competition: string;
  kickoff: string;
  venue?: string;
  homeScore?: number;
  awayScore?: number;
}

interface SanityPlayer {
  name: string;
  number: number;
  position: string;
}

interface SanityHomepage {
  heroSeasonLabel?: string;
  heroLine1?: string;
  heroLine2?: string;
  heroSubline?: string;
  membershipSeason?: string;
  membershipHeading?: string;
  membershipBody?: string;
  membershipButtonLabel?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const catLabel: Record<string, string> = {
  "match-report": "Match Report",
  "club-news": "Club",
  transfer: "Transfer",
  academy: "Academy",
  interview: "Interview",
};

const compLabel: Record<string, string> = {
  MPL: "Premier League",
  "FA Trophy": "FA Trophy",
  "Super Cup": "Super Cup",
  Friendly: "Friendly",
};

const posAbbr: Record<string, string> = {
  Goalkeeper: "GK",
  Defender: "DEF",
  Midfielder: "MID",
  Forward: "FWD",
};

const BKA = "Birkirkara FC";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function fmtKickoff(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    time: d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
  };
}

// ── Fallbacks ─────────────────────────────────────────────────────────────────

const fallbackNextMatch = {
  home: "Birkirkara FC",
  away: "Hibernians FC",
  date: "Sat 7 Jun 2025",
  time: "19:30",
  venue: "National Stadium, Ta' Qali",
};

const fallbackFeatured = {
  href: "/news",
  category: "Match Report",
  title: "Stripes secure dramatic late winner against Valletta",
  excerpt:
    "A stoppage-time goal from captain Jhonnattan secured all three points in a pulsating derby clash at the National Stadium.",
  date: "2 Jun 2025",
  coverImage: undefined as SanityImage | undefined,
};

const fallbackSmallCards = [
  { href: "/news", category: "Transfer", title: "Club signs midfielder on season-long loan", date: "1 Jun 2025", coverImage: undefined as SanityImage | undefined },
  { href: "/news", category: "Academy", title: "U17s reach national cup semi-final", date: "31 May 2025", coverImage: undefined as SanityImage | undefined },
  { href: "/news", category: "Club", title: "Annual general meeting scheduled for July", date: "30 May 2025", coverImage: undefined as SanityImage | undefined },
  { href: "/news", category: "Match Report", title: "Draw away to Floriana maintains top-four spot", date: "28 May 2025", coverImage: undefined as SanityImage | undefined },
];

const fallbackResults = [
  { opponent: "Valletta FC", home: true, goalsFor: 2, goalsAgainst: 1, result: "W" as const, competition: "Premier League", date: "2 Jun 2025" },
  { opponent: "Ħamrun Spartans", home: false, goalsFor: 1, goalsAgainst: 1, result: "D" as const, competition: "Premier League", date: "25 May 2025" },
  { opponent: "Floriana FC", home: false, goalsFor: 0, goalsAgainst: 0, result: "D" as const, competition: "Premier League", date: "18 May 2025" },
  { opponent: "Sliema Wanderers", home: true, goalsFor: 3, goalsAgainst: 0, result: "W" as const, competition: "Premier League", date: "11 May 2025" },
];

const fallbackSquad = [
  { number: 1, name: "Justin Haber", position: "GK" },
  { number: 4, name: "Ivan Woods", position: "DEF" },
  { number: 9, name: "Jhonnattan", position: "FWD" },
  { number: 10, name: "Paul Fenech", position: "MID" },
];

const resultBadgeClass = {
  W: "bg-green-600 text-white",
  D: "bg-yellow-500 text-black",
  L: "bg-red-700 text-white",
} as const;

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function Home() {
  const [homepageData, featuredPost, recentPosts, nextFixture, recentResults, squadPlayers] =
    await Promise.all([
      client.fetch<SanityHomepage | null>(homepageQuery).catch(() => null),
      client.fetch<SanityPost | null>(featuredPostQuery).catch(() => null),
      client.fetch<SanityPost[]>(recentPostsQuery).catch(() => []),
      client.fetch<SanityFixture | null>(nextFixtureQuery).catch(() => null),
      client.fetch<SanityFixture[]>(recentResultsQuery).catch(() => []),
      client.fetch<SanityPlayer[]>(squadPreviewQuery).catch(() => []),
    ]);

  // Hero — Sanity values with hardcoded fallbacks
  const hero = {
    seasonLabel: homepageData?.heroSeasonLabel ?? "Live Season · Matchday 28",
    line1: homepageData?.heroLine1 ?? "THE",
    line2: homepageData?.heroLine2 ?? "STRIPES",
    subline: homepageData?.heroSubline ?? "Birkirkara FC",
  };

  // Membership CTA — Sanity values with hardcoded fallbacks
  const cta = {
    season: homepageData?.membershipSeason ?? "2024/25 Season",
    heading: homepageData?.membershipHeading ?? "Become a Member",
    body: homepageData?.membershipBody ??
      "Support the Stripes and get exclusive benefits — matchday tickets, merchandise discounts, and priority access to club events.",
    buttonLabel: homepageData?.membershipButtonLabel ?? "Get Yours",
  };

  // Normalize: next match
  const nextMatch = nextFixture
    ? {
        home: nextFixture.homeTeam,
        away: nextFixture.awayTeam,
        venue: nextFixture.venue ?? "",
        ...fmtKickoff(nextFixture.kickoff),
      }
    : fallbackNextMatch;

  // Normalize: featured news card
  const featuredCard = featuredPost
    ? {
        href: `/news/${featuredPost.slug.current}`,
        category: catLabel[featuredPost.category] ?? featuredPost.category,
        title: featuredPost.title,
        excerpt: featuredPost.excerpt ?? "",
        date: fmtDate(featuredPost.publishedAt),
        coverImage: featuredPost.coverImage,
      }
    : fallbackFeatured;

  // Normalize: small news cards
  const smallCards =
    recentPosts.length > 0
      ? recentPosts.map((p) => ({
          href: `/news/${p.slug.current}`,
          category: catLabel[p.category] ?? p.category,
          title: p.title,
          date: fmtDate(p.publishedAt),
          coverImage: p.coverImage,
        }))
      : fallbackSmallCards;

  // Normalize: results
  const results =
    recentResults.length > 0
      ? recentResults.map((r) => {
          const bkaHome = r.homeTeam === BKA;
          const goalsFor = (bkaHome ? r.homeScore : r.awayScore) ?? 0;
          const goalsAgainst = (bkaHome ? r.awayScore : r.homeScore) ?? 0;
          const result: "W" | "D" | "L" =
            goalsFor > goalsAgainst ? "W" : goalsFor === goalsAgainst ? "D" : "L";
          return {
            opponent: bkaHome ? r.awayTeam : r.homeTeam,
            home: bkaHome,
            goalsFor,
            goalsAgainst,
            result,
            competition: compLabel[r.competition] ?? r.competition,
            date: fmtDate(r.kickoff),
          };
        })
      : fallbackResults;

  // Normalize: squad preview
  const squad =
    squadPlayers.length > 0
      ? squadPlayers.slice(0, 4).map((p) => ({
          number: p.number,
          name: p.name,
          position: posAbbr[p.position] ?? p.position,
        }))
      : fallbackSquad;

  return (
    <main className="flex-1">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-background overflow-hidden min-h-[580px] flex items-center">
        <div
          className="absolute inset-y-0 right-0 w-1/2 md:w-2/5 flex"
          aria-hidden="true"
        >
          <div style={{ flex: 3, background: "#D0021B", opacity: 0.07 }} />
          <div style={{ flex: 2, background: "#F5A623", opacity: 0.09 }} />
          <div style={{ flex: 1, background: "#D0021B", opacity: 0.05 }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bka-red opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-bka-red" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
              {hero.seasonLabel}
            </span>
          </div>

          <h1 className="font-display font-extrabold italic uppercase leading-none">
            <span className="block text-[clamp(4.5rem,13vw,10rem)] text-white leading-[0.9]">
              {hero.line1}
            </span>
            <span className="block text-[clamp(4.5rem,13vw,10rem)] text-white leading-[0.9]">
              {hero.line2}
            </span>
            <span className="block text-[clamp(1.5rem,4vw,3rem)] text-bka-gold tracking-wide mt-2">
              {hero.subline}
            </span>
          </h1>

          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href="/news"
              className="bg-bka-red text-white font-semibold uppercase tracking-wider text-sm px-8 py-3 hover:bg-[#b00217] transition-colors"
            >
              Latest News
            </a>
            <a
              href="/squad"
              className="border border-white text-white font-semibold uppercase tracking-wider text-sm px-8 py-3 hover:border-bka-gold hover:text-bka-gold transition-colors"
            >
              View Squad
            </a>
          </div>
        </div>
      </section>

      {/* ── Fixture band ─────────────────────────────────────── */}
      <section className="bg-surface border-b-2 border-bka-gold">
        <div className="max-w-7xl mx-auto flex items-stretch min-h-[80px]">
          <div className="bg-bka-red px-6 py-4 flex items-center shrink-0">
            <span className="font-display font-extrabold italic text-white uppercase text-sm tracking-widest whitespace-nowrap">
              Next Match
            </span>
          </div>
          <div className="flex-1 px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-5 flex-wrap">
              <span className="font-semibold text-white text-base">{nextMatch.home}</span>
              <span className="text-bka-gold font-bold text-lg font-display italic">VS</span>
              <span className="font-semibold text-white text-base">{nextMatch.away}</span>
            </div>
            <div className="text-sm text-white/50 sm:text-right">
              <div>
                {nextMatch.date} · {nextMatch.time}
              </div>
              <div>{nextMatch.venue}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── News grid ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="font-display font-extrabold italic text-white uppercase text-4xl mb-8 tracking-wide">
          Latest News
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured card — spans 2 columns */}
          <a href={featuredCard.href} className="lg:col-span-2 bg-surface group block">
            <div className="aspect-video bg-[#1c1c1c] relative overflow-hidden flex items-center justify-center">
              {featuredCard.coverImage ? (
                <Image
                  src={urlFor(featuredCard.coverImage).width(900).height(506).url()}
                  alt={featuredCard.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <span className="text-white/15 text-xs uppercase tracking-widest">
                  Image
                </span>
              )}
            </div>
            <div className="p-6">
              <span className="text-bka-red text-xs font-semibold uppercase tracking-wider">
                {featuredCard.category}
              </span>
              <h3 className="font-display font-bold italic text-white text-2xl mt-2 leading-tight group-hover:text-bka-gold transition-colors">
                {featuredCard.title}
              </h3>
              <p className="text-white/50 text-sm mt-3 leading-relaxed line-clamp-2">
                {featuredCard.excerpt}
              </p>
              <div className="text-white/30 text-xs mt-4">{featuredCard.date}</div>
            </div>
          </a>

          {/* 2×2 smaller cards */}
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
            {smallCards.slice(0, 4).map((item) => (
              <a
                key={item.href + item.title}
                href={item.href}
                className="bg-surface group block overflow-hidden"
              >
                <div className="aspect-video bg-[#1c1c1c] relative overflow-hidden flex items-center justify-center">
                  {item.coverImage ? (
                    <Image
                      src={urlFor(item.coverImage).width(400).height(225).url()}
                      alt={item.title}
                      fill
                      sizes="25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-white/10 text-[10px] uppercase tracking-widest">
                      Image
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <span className="text-bka-red text-[10px] font-semibold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-white font-semibold text-sm mt-1.5 leading-snug group-hover:text-bka-gold transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-white/30 text-[11px] mt-3">{item.date}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results strip ────────────────────────────────────── */}
      <section className="bg-surface py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display font-extrabold italic text-white uppercase text-3xl mb-6 tracking-wide">
            Recent Results
          </h2>
          <div className="divide-y divide-white/10">
            {results.map((r, i) => (
              <div key={i} className="flex items-center gap-4 py-3">
                <span className={`text-xs font-bold px-2 py-0.5 shrink-0 ${resultBadgeClass[r.result]}`}>
                  {r.result}
                </span>
                <span className="flex-1 text-white/80 text-sm">
                  BKA {r.home ? "vs" : "at"} {r.opponent}
                </span>
                <span className="font-display font-extrabold italic text-white text-lg w-14 text-center shrink-0">
                  {r.goalsFor}–{r.goalsAgainst}
                </span>
                <span className="text-white/40 text-xs text-right shrink-0 hidden sm:block leading-snug">
                  {r.competition}<br />{r.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Squad preview ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display font-extrabold italic text-white uppercase text-4xl tracking-wide">
            The Squad
          </h2>
          <a
            href="/squad"
            className="text-bka-gold text-sm font-semibold uppercase tracking-wider hover:underline"
          >
            Full Squad →
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {squad.map((player) => (
            <a key={player.number} href="/squad" className="bg-surface group block relative overflow-hidden">
              <div className="aspect-[3/4] bg-[#1c1c1c] flex items-end justify-center pb-4 relative">
                <span className="text-white/10 text-xs uppercase tracking-widest absolute top-1/2 -translate-y-1/2">
                  Photo
                </span>
                <span className="font-display font-extrabold italic text-bka-gold text-4xl absolute top-3 right-3 leading-none">
                  {player.number}
                </span>
              </div>
              <div className="p-3">
                <div className="text-white/40 text-[10px] uppercase tracking-widest">
                  {player.position}
                </div>
                <div className="text-white font-semibold text-sm mt-0.5 group-hover:text-bka-gold transition-colors">
                  {player.name}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Membership CTA ───────────────────────────────────── */}
      <section className="bg-surface border-l-4 border-bka-gold mx-6 max-w-7xl lg:mx-auto mb-16 px-8 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <div className="text-bka-gold text-xs font-semibold uppercase tracking-widest mb-2">
            {cta.season}
          </div>
          <h2 className="font-display font-extrabold italic text-white uppercase text-3xl leading-tight">
            {cta.heading}
          </h2>
          <p className="text-white/50 text-sm mt-2 max-w-md">
            {cta.body}
          </p>
        </div>
        <a
          href="/memberships"
          className="shrink-0 bg-bka-gold hover:bg-[#e09415] text-background font-bold uppercase tracking-wider text-sm px-8 py-3 transition-colors whitespace-nowrap"
        >
          {cta.buttonLabel}
        </a>
      </section>

      <Footer />
    </main>
  );
}
