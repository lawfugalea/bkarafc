import Image from "next/image";
import Footer from "@/components/Footer";
import { client, urlFor } from "@/lib/sanity.client";
import { allMembershipsQuery, siteSettingsQuery } from "@/lib/queries";

export const revalidate = 60;

interface SanityImage {
  asset: { _ref: string };
}

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
    name: "Supporter",
    price: 25,
    period: "per season",
    features: ["Digital membership card", "Monthly newsletter", "10% merchandise discount"],
    highlight: false,
  },
  {
    name: "Gold Member",
    price: 65,
    period: "per season",
    features: ["Physical membership card", "Priority ticket access", "15% merchandise discount", "Exclusive member events"],
    highlight: true,
  },
  {
    name: "Stripes Club",
    price: 120,
    period: "per season",
    features: ["VIP membership card", "Reserved matchday seating", "20% merchandise discount", "End-of-season dinner", "Meet the squad event"],
    highlight: false,
  },
];

function cleanTierName(name: string) {
  return name.replace(/\s*2026\/27\s*/i, "").trim();
}

function cardTheme(name: string, highlighted?: boolean) {
  const lower = name.toLowerCase();

  if (lower.includes("platinum")) {
    return "from-zinc-100 via-zinc-300 to-zinc-500 text-black";
  }

  if (lower.includes("corporate")) {
    return "from-[#3b2600] via-bka-gold to-[#9a6a0a] text-black";
  }

  if (lower.includes("gold") || highlighted) {
    return "from-[#b87310] via-bka-gold to-[#ffe199] text-black";
  }

  if (lower.includes("junior")) {
    return "from-bka-red via-[#e94b4b] to-bka-gold text-white";
  }

  return "from-[#88111c] via-bka-red to-bka-gold text-white";
}

function MembershipCardPreview({
  tier,
  seasonLabel,
  crest,
}: {
  tier: SanityMembership;
  seasonLabel: string;
  crest?: SanityImage;
}) {
  const tierName = cleanTierName(tier.name);
  const isLight = tier.name.toLowerCase().includes("gold") || tier.name.toLowerCase().includes("platinum") || tier.name.toLowerCase().includes("corporate");

  return (
    <div className="mb-7 rounded-[22px] bg-black/25 p-3 shadow-2xl shadow-black/30">
      <div
        className={`relative aspect-[1.58/1] overflow-hidden rounded-[18px] bg-gradient-to-br ${cardTheme(
          tier.name,
          tier.highlight,
        )} p-5 ring-1 ring-white/30`}
      >
        <div className="absolute inset-0 opacity-35 bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.35)_45%,transparent_46%),radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.45),transparent_20%)]" />
        <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full border border-white/35" />
        <div className="absolute -right-5 top-12 h-16 w-16 rounded-full border border-white/30" />

        <div className="relative flex h-full flex-col items-center justify-center text-center">
          <div className="mb-3 grid h-14 w-14 place-items-center rounded-full bg-white/90 p-1.5 shadow-lg shadow-black/20">
            {crest ? (
              <Image
                src={urlFor(crest).width(96).height(96).url()}
                alt="Birkirkara FC crest"
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="font-display text-xl font-black italic text-bka-red">B</span>
            )}
          </div>

          <div className={`font-display text-2xl font-extrabold italic uppercase tracking-wide ${isLight ? "text-black" : "text-white"}`}>
            Birkirkara FC
          </div>
          <div className={`mt-1 text-[10px] font-bold uppercase tracking-[0.28em] ${isLight ? "text-black/65" : "text-white/75"}`}>
            Revived | Refined | Ready
          </div>
          <div className={`mt-2 text-[10px] font-extrabold uppercase tracking-[0.22em] ${isLight ? "text-black/70" : "text-white/85"}`}>
            {tierName} · {seasonLabel}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function MembershipsPage() {
  const [tiers, settings] = await Promise.all([
    client.fetch<SanityMembership[]>(allMembershipsQuery).catch(() => [] as SanityMembership[]),
    client.fetch(siteSettingsQuery).catch(() => null),
  ]);

  const roster = tiers.length > 0 ? tiers : fallbackTiers;
  const seasonLabel = settings?.seasonLabel ?? "2024/25 Season";
  const pageSubtitle = settings?.membershipsPageSubtitle ?? "Support the Stripes and get exclusive benefits — matchday tickets, merchandise discounts, and priority access to club events.";

  return (
    <main className="flex-1 bg-background">
      {/* Page header */}
      <section className="border-b border-white/10 bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="text-bka-gold text-xs font-semibold uppercase tracking-widest mb-2">
            {seasonLabel}
          </div>
          <h1 className="font-display font-extrabold italic text-white uppercase text-5xl tracking-wide">
            Memberships
          </h1>
          <p className="text-white/50 text-base mt-3 max-w-xl">
            {pageSubtitle}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        {roster.length === 0 ? (
          <p className="text-white/40 text-center py-20">No memberships available at this time.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {roster.map((tier, i) => (
              <div
                key={tier.name}
                data-animate
                data-animate-delay={String(i * 100)}
                className={`flex flex-col p-7 transition-transform duration-200 hover:-translate-y-1 ${
                  tier.highlight ? "bg-bka-red" : "bg-surface border border-white/10"
                }`}
              >
                <MembershipCardPreview tier={tier} seasonLabel={seasonLabel} crest={settings?.crest} />

                <div className="font-display font-extrabold italic uppercase text-2xl tracking-wide text-white mb-1">
                  {tier.name}
                </div>
                <div className="flex items-baseline gap-1.5 mb-6">
                  <span className="text-4xl font-bold text-white">€{tier.price}</span>
                  <span className="text-white/50 text-sm">{tier.period ?? "per season"}</span>
                </div>
                {(tier.features ?? []).length > 0 && (
                  <ul className="space-y-3 flex-1 mb-8">
                    {(tier.features ?? []).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-white/75">
                        <span className={`mt-0.5 shrink-0 ${tier.highlight ? "text-white" : "text-bka-gold"}`}>
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                {tier.description && (tier.features ?? []).length === 0 && (
                  <p className="text-white/65 text-sm leading-relaxed flex-1 mb-8">{tier.description}</p>
                )}
                <button
                  className={`w-full py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                    tier.highlight
                      ? "bg-white text-bka-red hover:bg-white/90"
                      : "bg-bka-red text-white hover:bg-[#b00217]"
                  }`}
                >
                  Join Now
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
