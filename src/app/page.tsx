const nextMatch = {
  home: "Birkirkara FC",
  away: "Hibernians FC",
  date: "Sat 7 Jun 2025",
  time: "19:30",
  venue: "National Stadium, Ta' Qali",
};

const newsItems = [
  {
    id: 1,
    category: "Match Report",
    title: "Stripes secure dramatic late winner against Valletta",
    excerpt:
      "A stoppage-time goal from captain Jhonnattan secured all three points in a pulsating derby clash at the National Stadium.",
    date: "2 Jun 2025",
  },
  {
    id: 2,
    category: "Transfer",
    title: "Club signs midfielder on season-long loan",
    date: "1 Jun 2025",
  },
  {
    id: 3,
    category: "Academy",
    title: "U17s reach national cup semi-final",
    date: "31 May 2025",
  },
  {
    id: 4,
    category: "Club",
    title: "Annual general meeting scheduled for July",
    date: "30 May 2025",
  },
  {
    id: 5,
    category: "Match Report",
    title: "Draw away to Floriana maintains top-four spot",
    date: "28 May 2025",
  },
];

const results = [
  { opponent: "Valletta FC", home: true, goalsFor: 2, goalsAgainst: 1, result: "W" as const, competition: "Premier League", date: "2 Jun 2025" },
  { opponent: "Ħamrun Spartans", home: false, goalsFor: 1, goalsAgainst: 1, result: "D" as const, competition: "Premier League", date: "25 May 2025" },
  { opponent: "Floriana FC", home: false, goalsFor: 0, goalsAgainst: 0, result: "D" as const, competition: "Premier League", date: "18 May 2025" },
  { opponent: "Sliema Wanderers", home: true, goalsFor: 3, goalsAgainst: 0, result: "W" as const, competition: "Premier League", date: "11 May 2025" },
];

const squad = [
  { number: 1, name: "Justin Haber", position: "GK" },
  { number: 4, name: "Ivan Woods", position: "DEF" },
  { number: 9, name: "Jhonnattan", position: "FWD" },
  { number: 10, name: "Paul Fenech", position: "MID" },
  { number: 7, name: "Ryan Darmanin", position: "MID" },
  { number: 11, name: "Edward Herrera", position: "FWD" },
  { number: 3, name: "Diego Aguiar", position: "DEF" },
  { number: 6, name: "Robert Muscat", position: "MID" },
];

const resultBadgeClass = {
  W: "bg-green-600 text-white",
  D: "bg-yellow-500 text-black",
  L: "bg-red-700 text-white",
} as const;

const footerLinks = [
  {
    heading: "Club",
    links: [
      { label: "History", href: "/club/history" },
      { label: "Board", href: "/club/board" },
      { label: "Stadium", href: "/club/stadium" },
      { label: "Partners", href: "/club/partners" },
    ],
  },
  {
    heading: "Football",
    links: [
      { label: "First Team", href: "/squad" },
      { label: "Fixtures", href: "/fixtures" },
      { label: "Results", href: "/results" },
      { label: "Academy", href: "/academy" },
    ],
  },
  {
    heading: "Fan Zone",
    links: [
      { label: "News", href: "/news" },
      { label: "Gallery", href: "/gallery" },
      { label: "Memberships", href: "/memberships" },
      { label: "Shop", href: "/shop" },
    ],
  },
];

function FooterCrest() {
  return (
    <svg
      viewBox="0 0 50 58"
      width="48"
      height="56"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="footer-shield-clip">
          <path d="M25 2 L48 10 L48 36 L25 56 L2 36 L2 10 Z" />
        </clipPath>
      </defs>
      <path d="M25 2 L48 10 L48 36 L25 56 L2 36 L2 10 Z" fill="#D0021B" stroke="#F5A623" strokeWidth="1.5" />
      <g clipPath="url(#footer-shield-clip)">
        <rect x="6" y="0" width="8" height="58" fill="white" opacity="0.2" />
        <rect x="22" y="0" width="8" height="58" fill="white" opacity="0.2" />
        <rect x="38" y="0" width="8" height="58" fill="white" opacity="0.2" />
      </g>
      <text
        x="25"
        y="36"
        textAnchor="middle"
        fill="white"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="13"
      >
        BK
      </text>
    </svg>
  );
}

export default function Home() {
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
              Live Season · Matchday 28
            </span>
          </div>

          <h1 className="font-display font-extrabold italic uppercase leading-none">
            <span className="block text-[clamp(4.5rem,13vw,10rem)] text-white leading-[0.9]">
              THE
            </span>
            <span className="block text-[clamp(4.5rem,13vw,10rem)] text-white leading-[0.9]">
              STRIPES
            </span>
            <span className="block text-[clamp(1.5rem,4vw,3rem)] text-bka-gold tracking-wide mt-2">
              Birkirkara FC
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
          <a href="/news/1" className="lg:col-span-2 bg-surface group block">
            <div className="aspect-video bg-[#1c1c1c] flex items-center justify-center">
              <span className="text-white/15 text-xs uppercase tracking-widest">
                Image
              </span>
            </div>
            <div className="p-6">
              <span className="text-bka-red text-xs font-semibold uppercase tracking-wider">
                {newsItems[0].category}
              </span>
              <h3 className="font-display font-bold italic text-white text-2xl mt-2 leading-tight group-hover:text-bka-gold transition-colors">
                {newsItems[0].title}
              </h3>
              <p className="text-white/50 text-sm mt-3 leading-relaxed line-clamp-2">
                {newsItems[0].excerpt}
              </p>
              <div className="text-white/30 text-xs mt-4">{newsItems[0].date}</div>
            </div>
          </a>

          {/* 2×2 smaller cards */}
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
            {newsItems.slice(1, 5).map((item) => (
              <a key={item.id} href={`/news/${item.id}`} className="bg-surface p-4 group block">
                <span className="text-bka-red text-[10px] font-semibold uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-white font-semibold text-sm mt-1.5 leading-snug group-hover:text-bka-gold transition-colors">
                  {item.title}
                </h3>
                <div className="text-white/30 text-[11px] mt-3">{item.date}</div>
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
          {squad.slice(0, 4).map((player) => (
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
            2024/25 Season
          </div>
          <h2 className="font-display font-extrabold italic text-white uppercase text-3xl leading-tight">
            Become a Member
          </h2>
          <p className="text-white/50 text-sm mt-2 max-w-md">
            Support the Stripes and get exclusive benefits — matchday tickets, merchandise
            discounts, and priority access to club events.
          </p>
        </div>
        <a
          href="/memberships"
          className="shrink-0 bg-bka-gold hover:bg-[#e09415] text-background font-bold uppercase tracking-wider text-sm px-8 py-3 transition-colors whitespace-nowrap"
        >
          Get Yours
        </a>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="bg-surface border-t border-white/10 pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Club identity */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FooterCrest />
                <div>
                  <div className="font-display font-extrabold italic text-white text-lg leading-tight">
                    Birkirkara FC
                  </div>
                  <div className="text-[10px] text-white/40 tracking-widest uppercase">
                    Est. 1950 · Malta
                  </div>
                </div>
              </div>
              <p className="text-white/40 text-xs leading-relaxed">
                Maltese Premier League football club based in Birkirkara, Malta. The Stripes.
              </p>
            </div>

            {/* Link columns */}
            {footerLinks.map((col) => (
              <div key={col.heading}>
                <h3 className="font-display font-bold italic text-bka-gold uppercase text-sm tracking-widest mb-4">
                  {col.heading}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-white/50 text-sm hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-white/30 text-xs">
            <span>© {new Date().getFullYear()} Birkirkara FC. All rights reserved.</span>
            <span>Maltese Premier League · Malta</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
