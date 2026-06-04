import Image from "next/image";
import Footer from "@/components/Footer";
import { client, urlFor } from "@/lib/sanity.client";
import { allPostsQuery } from "@/lib/queries";

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

  if (posts.length === 0) {
    return (
      <main className="flex-1 bg-background">
        <section className="border-b border-white/10 bg-surface">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="text-bka-red text-xs font-semibold uppercase tracking-widest mb-2">
              Birkirkara FC
            </div>
            <h1 className="font-display font-extrabold italic text-white uppercase text-5xl tracking-wide">
              Latest News
            </h1>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <p className="text-white/40 text-lg">No articles published yet. Check back soon.</p>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex-1 bg-background">
      {/* Page header */}
      <section className="border-b border-white/10 bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="text-bka-red text-xs font-semibold uppercase tracking-widest mb-2">
            Birkirkara FC
          </div>
          <h1 className="font-display font-extrabold italic text-white uppercase text-5xl tracking-wide">
            Latest News
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        {/* Featured article */}
        {featured && (
          <a
            data-animate
            href={`/news/${featured.slug.current}`}
            className="lg:flex gap-8 bg-surface group block mb-10"
          >
            <div className="lg:w-1/2 aspect-video bg-[#1c1c1c] relative overflow-hidden flex items-center justify-center shrink-0">
              {featured.coverImage ? (
                <Image
                  src={urlFor(featured.coverImage).width(800).height(450).url()}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <span className="text-white/15 text-xs uppercase tracking-widest">Image</span>
              )}
            </div>
            <div className="p-6 flex flex-col justify-center">
              <span className="text-bka-red text-xs font-semibold uppercase tracking-wider">
                {catLabel[featured.category] ?? featured.category}
              </span>
              <h2 className="font-display font-bold italic text-white text-3xl mt-2 leading-tight group-hover:text-bka-gold transition-colors">
                {featured.title}
              </h2>
              {featured.excerpt && (
                <p className="text-white/50 text-sm mt-3 leading-relaxed line-clamp-3">
                  {featured.excerpt}
                </p>
              )}
              <div className="text-white/30 text-xs mt-4">{fmtDate(featured.publishedAt)}</div>
            </div>
          </a>
        )}

        {/* Remaining articles grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {rest.map((item, i) => (
              <a
                key={item.slug.current}
                data-animate
                data-animate-delay={String(i * 75)}
                href={`/news/${item.slug.current}`}
                className="bg-surface group block overflow-hidden"
              >
                <div className="aspect-video bg-[#1c1c1c] relative overflow-hidden flex items-center justify-center">
                  {item.coverImage ? (
                    <Image
                      src={urlFor(item.coverImage).width(400).height(225).url()}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-white/10 text-xs uppercase tracking-widest">Image</span>
                  )}
                </div>
                <div className="p-4">
                  <span className="text-bka-red text-[10px] font-semibold uppercase tracking-wider">
                    {catLabel[item.category] ?? item.category}
                  </span>
                  <h3 className="text-white font-semibold text-sm mt-1.5 leading-snug group-hover:text-bka-gold transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-white/30 text-[11px] mt-3">{fmtDate(item.publishedAt)}</div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
