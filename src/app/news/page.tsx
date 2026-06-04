import Image from "next/image";
import Footer from "@/components/Footer";
import { client, urlFor } from "@/lib/sanity.client";
import { allPostsQuery } from "@/lib/queries";
import { catBadgeClass } from "@/lib/catBadge";

export const revalidate = 60;

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
  featured?: boolean;
}

const catLabel: Record<string, string> = {
  "match-report": "Match Report",
  "club-news": "Club",
  transfer: "Transfer",
  academy: "Academy",
  interview: "Interview",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function NewsPage() {
  const posts = await client
    .fetch<SanityPost[]>(allPostsQuery)
    .catch(() => [] as SanityPost[]);

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== featured);

  return (
    <main className="flex-1 bg-background">
      {/* ── Page header ───────────────────────────────────────── */}
      <section className="border-b border-white/10 bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="text-bka-red text-xs font-semibold uppercase tracking-widest mb-2">
            Birkirkara FC
          </div>
          <h1 className="heading-accent font-display font-extrabold italic text-white uppercase text-5xl tracking-wide">
            Latest News
          </h1>
        </div>
      </section>

      {posts.length === 0 ? (
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <p className="text-white/40 text-lg">No articles published yet. Check back soon.</p>
        </section>
      ) : (
        <>
          {/* ── Featured hero ──────────────────────────────────── */}
          {featured && (
            <div data-animate className="max-w-7xl mx-auto px-6 pt-10 pb-6">
              <a
                href={`/news/${featured.slug.current}`}
                className="card-interactive group relative overflow-hidden block"
                style={{ height: 'clamp(320px, 42vw, 520px)' }}
              >
                {/* Background image */}
                {featured.coverImage ? (
                  <Image
                    src={urlFor(featured.coverImage).width(1400).height(700).url()}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 bg-surface" />
                )}

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.6) 45%, rgba(8,8,8,0.2) 100%)',
                  }}
                />

                {/* Content — bottom left */}
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 ${catBadgeClass(featured.category)}`}>
                      {catLabel[featured.category] ?? featured.category}
                    </span>
                    <span className="text-white/30">·</span>
                    <span className="text-white/50 text-xs">{fmtDate(featured.publishedAt)}</span>
                  </div>
                  <h2 className="font-display font-extrabold italic text-white uppercase leading-[0.92] group-hover:text-bka-gold transition-colors duration-300"
                    style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', maxWidth: '680px' }}
                  >
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p className="text-white/55 text-sm mt-3 leading-relaxed line-clamp-2 max-w-xl hidden sm:block">
                      {featured.excerpt}
                    </p>
                  )}
                  <div className="mt-5 inline-flex items-center gap-2 text-bka-gold text-xs font-semibold uppercase tracking-widest">
                    Read More
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </div>
                </div>

                {/* Bottom red/gold accent bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[4px]"
                  style={{ background: 'linear-gradient(to right, #D0021B 60%, #F5A623 60%)' }}
                />
              </a>
            </div>
          )}

          {/* ── More stories grid ──────────────────────────────── */}
          {rest.length > 0 && (
            <section className="max-w-7xl mx-auto px-6 pb-16">
              <h2 data-animate className="heading-accent font-display font-extrabold italic text-white uppercase text-3xl tracking-wide mb-8">
                More Stories
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((item, i) => (
                  <div
                    key={item.slug.current}
                    data-animate
                    data-animate-delay={String(i * 60)}
                  >
                    <a
                      href={`/news/${item.slug.current}`}
                      className="card-interactive bg-surface group overflow-hidden flex flex-col"
                    >
                      {/* Image */}
                      <div className="aspect-[4/3] bg-[#1c1c1c] relative overflow-hidden flex items-center justify-center shrink-0">
                        {item.coverImage ? (
                          <Image
                            src={urlFor(item.coverImage).width(600).height(450).url()}
                            alt={item.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <span className="text-white/10 text-xs uppercase tracking-widest">Image</span>
                        )}
                      </div>

                      {/* Text */}
                      <div className="p-5 flex flex-col flex-1">
                        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 w-fit ${catBadgeClass(item.category)}`}>
                          {catLabel[item.category] ?? item.category}
                        </span>
                        <h3 className="text-white font-display font-bold italic uppercase text-xl leading-tight mt-3 group-hover:text-bka-gold transition-colors">
                          {item.title}
                        </h3>
                        {item.excerpt && (
                          <p className="text-white/45 text-sm mt-2 leading-relaxed line-clamp-2 flex-1">
                            {item.excerpt}
                          </p>
                        )}
                        <div className="text-white/30 text-xs mt-4 pt-4 border-t border-white/8">
                          {fmtDate(item.publishedAt)}
                        </div>
                      </div>

                      {/* Bottom border on hover */}
                      <div className="h-[3px] bg-bka-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <Footer />
    </main>
  );
}
