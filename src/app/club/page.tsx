import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import Footer from "@/components/Footer";
import { client } from "@/lib/sanity.client";
import { clubPageQuery, siteSettingsQuery } from "@/lib/queries";

export const revalidate = 60;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PortableTextBlock = any[];

interface SanityHonour {
  title: string;
  years?: string[];
}

interface SanityClubPage {
  historyBody?: PortableTextBlock;
  honours?: SanityHonour[];
  stadiumBody?: PortableTextBlock;
}

// ── Fallbacks ─────────────────────────────────────────────────────────────────

const fallbackHistory: PortableTextBlock = [
  { _type: "block", _key: "h1", style: "normal", children: [{ _type: "span", text: "Birkirkara FC was founded in 1950 in the town of Birkirkara, the most populous town on the island of Malta. The club quickly established itself as one of the cornerstones of Maltese football, rising through the divisions and reaching the top flight of Maltese football." }] },
  { _type: "block", _key: "h2", style: "normal", children: [{ _type: "span", text: "Known as The Stripes for their distinctive red and white vertically striped kit, Birkirkara became one of the dominant forces in the Maltese Premier League during the 2000s and 2010s, winning the league title on seven occasions." }] },
  { _type: "block", _key: "h3", style: "normal", children: [{ _type: "span", text: "The club has represented Malta in UEFA club competition on numerous occasions, competing in the UEFA Champions League qualifying rounds and the UEFA Europa League, showcasing Maltese football on the European stage." }] },
  { _type: "block", _key: "h4", style: "normal", children: [{ _type: "span", text: "Birkirkara has been central to the development of Maltese football talent, producing numerous players who have gone on to represent the Maltese national team. The club's academy continues to be one of the most respected in the country." }] },
];

const fallbackHonours: SanityHonour[] = [
  { title: "Maltese Premier League", years: ["2002/03", "2005/06", "2009/10", "2010/11", "2012/13", "2014/15", "2015/16"] },
  { title: "FA Trophy", years: ["1998/99", "2001/02", "2002/03", "2005/06", "2008/09", "2010/11", "2012/13", "2014/15"] },
  { title: "FA Cup", years: ["2005/06", "2010/11", "2013/14"] },
  { title: "Super Cup", years: ["2003", "2010", "2011", "2013", "2015", "2016"] },
];

const fallbackStadium: PortableTextBlock = [
  { _type: "block", _key: "s1", style: "normal", children: [{ _type: "span", text: "Birkirkara FC play their home matches at the Centenary Stadium in Ta' Qali, Malta, which is also the national stadium of Malta. The stadium has a capacity of approximately 17,000 and has hosted some of Malta's most memorable footballing occasions." }] },
  { _type: "block", _key: "s2", style: "normal", children: [{ _type: "span", text: "The club's training facility is located in Birkirkara and serves both the first team and the club's well-regarded youth academy." }] },
];

// ── Portable Text components ──────────────────────────────────────────────────

const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-white/65 text-base leading-relaxed">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <span className="text-white font-medium">{children}</span>
    ),
  },
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ClubPage() {
  const [data, settings] = await Promise.all([
    client.fetch<SanityClubPage | null>(clubPageQuery).catch(() => null),
    client.fetch(siteSettingsQuery).catch(() => null),
  ]);

  const historyBody = data?.historyBody?.length ? data.historyBody : fallbackHistory;
  const honours = data?.honours?.length ? data.honours : fallbackHonours;
  const stadiumBody = data?.stadiumBody?.length ? data.stadiumBody : fallbackStadium;

  return (
    <main className="flex-1 bg-background">
      {/* Page header */}
      <section className="border-b border-white/10 bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="text-bka-red text-xs font-semibold uppercase tracking-widest mb-2">
            {settings?.clubTagline ?? "Est. 1950 · Birkirkara, Malta"}
          </div>
          <h1 className="font-display font-extrabold italic text-white uppercase text-5xl tracking-wide">
            About Birkirkara FC
          </h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-14">
        {/* History */}
        <section className="mb-14">
          <h2 className="font-display font-extrabold italic text-white uppercase text-3xl tracking-wide mb-6">
            Club History
          </h2>
          <div className="space-y-5">
            <PortableText value={historyBody} components={ptComponents} />
          </div>
        </section>

        {/* Honours */}
        <section className="mb-14">
          <h2 className="font-display font-extrabold italic text-white uppercase text-3xl tracking-wide mb-6">
            Honours
          </h2>
          <div className="space-y-6">
            {honours.map((h) => (
              <div key={h.title} className="bg-surface p-6">
                <h3 className="font-display font-bold italic text-bka-gold uppercase text-lg tracking-wider mb-3">
                  {h.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(h.years ?? []).map((year) => (
                    <span
                      key={year}
                      className="text-white/70 text-sm border border-white/15 px-3 py-1"
                    >
                      {year}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stadium */}
        <section>
          <h2 className="font-display font-extrabold italic text-white uppercase text-3xl tracking-wide mb-6">
            Stadium
          </h2>
          <div className="bg-surface p-6 space-y-4">
            <PortableText value={stadiumBody} components={ptComponents} />
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
