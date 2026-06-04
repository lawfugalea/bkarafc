import Footer from "@/components/Footer";
import { client } from "@/lib/sanity.client";
import { allMembershipsQuery, siteSettingsQuery } from "@/lib/queries";

export const revalidate = 60;

interface SanityMembership {
  name: string;
  price: number;
  period?: string;
  features?: string[];
  highlight?: boolean;
  description?: string;
}

// ── Fallbacks ─────────────────────────────────────────────────────────────────

const fallbackTiers: SanityMembership[] = [
  {
    name: "Regular Membership 2026/27",
    price: 30,
    period: "per season",
    features: ["Club updates", "Priority tickets", "Access to the official communication channel"],
    highlight: false,
  },
  {
    name: "Gold Membership 2026/27",
    price: 100,
    period: "per season",
    features: ["Priority access", "Merchandise discounts", "Exclusive commemorative token"],
    highlight: true,
  },
  {
    name: "Corporate Membership 2026/27",
    price: 500,
    period: "per season",
    features: ["MPL Club season ticket", "Home kit with business name", "2027 calendar feature"],
    highlight: false,
  },
];

function getTierDesign(name: string, highlighted?: boolean) {
  const lower = name.toLowerCase();

  if (lower.includes("corporate")) {
    return {
      eyebrow: "Corporate",
      accent: "from-zinc-100 via-bka-gold to-amber-500",
      shell: "border-bka-gold/70 bg-[radial-gradient(circle_at_top_right,rgba(245,166,35,0.22),transparent_32%),linear-gradient(145deg,#1b1305,#070707_58%)]",
      button: "bg-bka-gold text-black hover:bg-[#ffd067]",
      badge: "bg-bka-gold text-black",
    };
  }

  if (lower.includes("platinum")) {
    return {
      eyebrow: "Platinum",
      accent: "from-white via-zinc-300 to-bka-gold",
      shell: "border-white/35 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_34%),linear-gradient(145deg,#202020,#080808_60%)]",
      button: "bg-white text-black hover:bg-white/90",
      badge: "bg-white text-black",
    };
  }

  if (lower.includes("gold") || highlighted) {
    return {
      eyebrow: "Gold",
      accent: "from-bka-gold via-yellow-300 to-bka-red",
      shell: "border-bka-gold/60 bg-[radial-gradient(circle_at_top_right,rgba(245,166,35,0.24),transparent_35%),linear-gradient(145deg,#d0021b,#111111_66%)]",
      button: "bg-white text-bka-red hover:bg-white/90",
      badge: "bg-bka-gold text-black",
    };
  }

  if (lower.includes("junior")) {
    return {
      eyebrow: "Junior",
      accent: "from-bka-red via-bka-gold to-bka-red",
      shell: "border-bka-red/45 bg-[radial-gradient(circle_at_top_right,rgba(208,2,27,0.18),transparent_35%),linear-gradient(145deg,#151515,#080808_64%)]",
      button: "bg-bka-red text-white hover:bg-[#b00217]",
      badge: "bg-bka-red text-white",
    };
  }

  if (lower.includes("couple")) {
    return {
      eyebrow: "Couple",
      accent: "from-bka-red via-pink-200 to-bka-gold",
      shell: "border-white/15 bg-[radial-gradient(circle_at_top_right,rgba(208,2,27,0.18),transparent_35%),linear-gradient(145deg,#151515,#080808_64%)]",
      button: "bg-bka-red text-white hover:bg-[#b00217]",
      badge: "bg-white/12 text-white",
    };
  }

  return {
    eyebrow: "Regular",
    accent: "from-bka-red via-bka-gold to-bka-red",
    shell: "border-white/15 bg-[radial-gradient(circle_at_top_right,rgba(245,166,35,0.13),transparent_34%),linear-gradient(145deg,#141414,#080808_62%)]",
    button: "bg-bka-red text-white hover:bg-[#b00217]",
    badge: "bg-white/12 text-white",
  };
}

function cleanTierName(name: string) {
  return name.replace(/\s*2026\/27\s*/i, "").trim();
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function MembershipsPage() {
  const [tiers, settings] = await Promise.all([
    client.fetch<SanityMembership[]>(allMembershipsQuery).catch(() => [] as SanityMembership[]),
    client.fetch(siteSettingsQuery).catch(() => null),
  ]);

  const roster = tiers.length > 0 ? tiers : fallbackTiers;
  const seasonLabel = settings?.seasonLabel ?? "2026/27 Season";
  const pageSubtitle = settings?.membershipsPageSubtitle ?? "Official Birkirkara FC memberships for the 2026/27 season are available across Junior, Regular, Couple, Gold, Platinum and Corporate tiers.";

  return (
    <main className="flex-1 bg-background">
      {/* Page header */}
      <section className="relative overflow-hidden border-b border-white/10 bg-surface">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_left,rgba(208,2,27,0.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(245,166,35,0.22),transparent_32%)]" />
        <div className="relative max-w-7xl mx-auto px-6 py-14">
          <div className="text-bka-gold text-xs font-semibold uppercase tracking-[0.32em] mb-3">
            {seasonLabel}
          </div>
          <h1 className="font-display font-extrabold italic text-white uppercase text-5xl sm:text-7xl tracking-wide">
            Memberships
          </h1>
          <p className="text-white/60 text-base mt-4 max-w-2xl leading-relaxed">
            {pageSubtitle}
          </p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-bka-gold/30 bg-black/30 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/75">
            <span className="h-2 w-2 rounded-full bg-bka-red" />
            Revived · Refined · Ready
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        {roster.length === 0 ? (
          <p className="text-white/40 text-center py-20">No memberships available at this time.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {roster.map((tier, i) => {
              const design = getTierDesign(tier.name, tier.highlight);
              const tierName = cleanTierName(tier.name);

              return (
                <article
                  key={tier.name}
                  data-animate
                  data-animate-delay={String(i * 75)}
                  className={`group relative min-h-[520px] overflow-hidden border ${design.shell} p-6 shadow-2xl shadow-black/30 transition-transform duration-200 hover:-translate-y-1`}
                >
                  <div className={`absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r ${design.accent}`} />
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-white/10" />
                  <div className="absolute -right-8 top-16 h-20 w-20 rounded-full border border-bka-gold/20" />

                  <div className="relative flex h-full flex-col">
                    <div className="mb-8 flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.34em] text-white/45">
                          Birkirkara FC
                        </div>
                        <h2 className="mt-2 font-display text-4xl font-extrabold italic uppercase leading-none tracking-wide text-white">
                          {tierName}
                        </h2>
                      </div>
                      <span className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest ${design.badge}`}>
                        {design.eyebrow}
                      </span>
                    </div>

                    <div className="mb-7 rounded-2xl border border-white/10 bg-black/25 p-5 backdrop-blur">
                      <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-bka-gold/80">
                        Membership fee
                      </div>
                      <div className="mt-2 flex items-end gap-2">
                        <span className="font-display text-7xl font-extrabold italic leading-[0.85] text-white">
                          €{tier.price}
                        </span>
                        <span className="pb-2 text-sm text-white/45">{tier.period ?? "per season"}</span>
                      </div>
                    </div>

                    {(tier.features ?? []).length > 0 && (
                      <ul className="mb-8 flex-1 space-y-3">
                        {(tier.features ?? []).map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed text-white/78">
                            <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-bka-gold text-[11px] font-black text-black">
                              ✓
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {tier.description && (tier.features ?? []).length === 0 && (
                      <p className="mb-8 flex-1 text-sm leading-relaxed text-white/65">{tier.description}</p>
                    )}

                    <button className={`mt-auto w-full rounded-full py-3.5 text-sm font-extrabold uppercase tracking-[0.22em] transition-colors ${design.button}`}>
                      Join Now
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
