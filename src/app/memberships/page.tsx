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

      <section className="max-w-5xl mx-auto px-6 py-14">
        {roster.length === 0 ? (
          <p className="text-white/40 text-center py-20">No memberships available at this time.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roster.map((tier, i) => (
              <div
                key={tier.name}
                data-animate
                data-animate-delay={String(i * 100)}
                className={`flex flex-col p-8 transition-transform duration-200 hover:-translate-y-1 ${
                  tier.highlight ? "bg-bka-red" : "bg-surface border border-white/10"
                }`}
              >
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
