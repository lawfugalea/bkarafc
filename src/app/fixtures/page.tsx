import Footer from "@/components/Footer";

export const revalidate = 60;

const upcoming = [
  { opponent: "Hibernians FC", home: true, date: "Sat 7 Jun 2025", time: "19:30", venue: "National Stadium, Ta' Qali", competition: "Premier League" },
  { opponent: "Ħamrun Spartans", home: false, date: "Sat 14 Jun 2025", time: "19:30", venue: "Centenary Stadium, Ta' Qali", competition: "Premier League" },
  { opponent: "Valletta FC", home: false, date: "Sat 21 Jun 2025", time: "20:00", venue: "National Stadium, Ta' Qali", competition: "Premier League" },
  { opponent: "Floriana FC", home: true, date: "Sat 28 Jun 2025", time: "19:30", venue: "Centenary Stadium, Ta' Qali", competition: "Premier League" },
  { opponent: "Sliema Wanderers", home: false, date: "Sat 5 Jul 2025", time: "19:30", venue: "Centenary Stadium, Ta' Qali", competition: "Premier League" },
];

const results = [
  { opponent: "Valletta FC", home: true, goalsFor: 2, goalsAgainst: 1, result: "W" as const, competition: "Premier League", date: "2 Jun 2025" },
  { opponent: "Ħamrun Spartans", home: false, goalsFor: 1, goalsAgainst: 1, result: "D" as const, competition: "Premier League", date: "25 May 2025" },
  { opponent: "Floriana FC", home: false, goalsFor: 0, goalsAgainst: 0, result: "D" as const, competition: "Premier League", date: "18 May 2025" },
  { opponent: "Sliema Wanderers", home: true, goalsFor: 3, goalsAgainst: 0, result: "W" as const, competition: "Premier League", date: "11 May 2025" },
  { opponent: "Hibernians FC", home: false, goalsFor: 1, goalsAgainst: 2, result: "L" as const, competition: "Premier League", date: "4 May 2025" },
  { opponent: "Gżira United", home: true, goalsFor: 2, goalsAgainst: 0, result: "W" as const, competition: "Premier League", date: "27 Apr 2025" },
];

const resultBadge = {
  W: "bg-green-600 text-white",
  D: "bg-yellow-500 text-black",
  L: "bg-red-700 text-white",
} as const;

export default function FixturesPage() {
  return (
    <main className="flex-1 bg-background">
      {/* Page header */}
      <section className="border-b border-white/10 bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="text-bka-red text-xs font-semibold uppercase tracking-widest mb-2">
            2024/25 Season · Premier League
          </div>
          <h1 className="font-display font-extrabold italic text-white uppercase text-5xl tracking-wide">
            Fixtures &amp; Results
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-14 space-y-14">
        {/* Upcoming fixtures */}
        <section>
          <h2 className="font-display font-extrabold italic text-white uppercase text-3xl mb-6 tracking-wide">
            Upcoming Fixtures
          </h2>
          <div className="divide-y divide-white/10 bg-surface">
            {upcoming.map((f, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 px-6 py-5">
                <div className="shrink-0 text-white/40 text-xs w-28">{f.date}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-white font-semibold text-sm">
                      {f.home ? "Birkirkara FC" : f.opponent}
                    </span>
                    <span className="text-bka-gold font-bold text-base font-display italic">vs</span>
                    <span className="text-white font-semibold text-sm">
                      {f.home ? f.opponent : "Birkirkara FC"}
                    </span>
                  </div>
                  <div className="text-white/35 text-xs mt-1">{f.venue}</div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-white text-sm font-semibold">{f.time}</div>
                  <div className="text-white/40 text-xs">{f.competition}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent results */}
        <section>
          <h2 className="font-display font-extrabold italic text-white uppercase text-3xl mb-6 tracking-wide">
            Recent Results
          </h2>
          <div className="divide-y divide-white/10 bg-surface">
            {results.map((r, i) => (
              <div key={i} className="flex items-center gap-5 px-6 py-4">
                <span className={`text-xs font-bold px-2.5 py-1 shrink-0 ${resultBadge[r.result]}`}>
                  {r.result}
                </span>
                <div className="flex-1 flex items-center gap-3 flex-wrap">
                  <span className="text-white font-semibold text-sm">
                    {r.home ? "BKA" : r.opponent}
                  </span>
                  <span className="font-display font-extrabold italic text-white text-xl w-12 text-center shrink-0">
                    {r.goalsFor}–{r.goalsAgainst}
                  </span>
                  <span className="text-white font-semibold text-sm">
                    {r.home ? r.opponent : "BKA"}
                  </span>
                </div>
                <div className="text-white/40 text-xs text-right shrink-0 hidden sm:block leading-snug">
                  {r.competition}<br />{r.date}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
