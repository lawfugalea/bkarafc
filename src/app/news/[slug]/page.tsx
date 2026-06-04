import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import Footer from "@/components/Footer";
import { client, urlFor } from "@/lib/sanity.client";
import { postBySlugQuery } from "@/lib/queries";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
  publishedAt: string;
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
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await client
    .fetch<SanityPost | null>(postBySlugQuery, { slug })
    .catch(() => null);

  if (!post) notFound();

  return (
    <main className="flex-1 bg-background">
      {/* Hero — cover image with title/meta overlaid at the bottom */}
      {post.coverImage ? (
        <div className="relative h-[380px] sm:h-[480px] bg-[#1c1c1c] overflow-hidden">
          <Image
            src={urlFor(post.coverImage).width(1400).height(600).url()}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Gradient: transparent top → solid background at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />

          {/* Title overlaid on image */}
          <div className="absolute bottom-0 left-0 right-0 pb-8 pt-20">
            <div className="max-w-3xl mx-auto px-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-bka-red text-xs font-semibold uppercase tracking-wider">
                  {catLabel[post.category] ?? post.category}
                </span>
                <span className="text-white/30">·</span>
                <span className="text-white/50 text-xs">{fmtDate(post.publishedAt)}</span>
              </div>
              <h1 className="font-display font-extrabold italic text-white uppercase text-4xl sm:text-5xl leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      ) : (
        /* No cover image — plain header */
        <div className="border-b border-white/10 bg-surface">
          <div className="max-w-3xl mx-auto px-6 py-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-bka-red text-xs font-semibold uppercase tracking-wider">
                {catLabel[post.category] ?? post.category}
              </span>
              <span className="text-white/20">·</span>
              <span className="text-white/40 text-xs">{fmtDate(post.publishedAt)}</span>
            </div>
            <h1 className="font-display font-extrabold italic text-white uppercase text-4xl sm:text-5xl leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      )}

      {/* Article body — starts immediately after hero */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        {post.excerpt && (
          <p className="text-white/60 text-lg leading-relaxed border-l-4 border-bka-gold pl-5 mb-10">
            {post.excerpt}
          </p>
        )}

        {post.body && (
          <div className="prose prose-invert prose-lg max-w-none
            prose-headings:font-display prose-headings:italic prose-headings:uppercase
            prose-headings:text-white prose-p:text-white/70 prose-p:leading-relaxed
            prose-a:text-bka-gold prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-blockquote:border-bka-gold
            prose-blockquote:text-white/60 prose-img:rounded-none
          ">
            <PortableText value={post.body} />
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-white/10">
          <a
            href="/news"
            className="text-bka-gold text-sm font-semibold uppercase tracking-wider hover:underline"
          >
            ← All News
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
