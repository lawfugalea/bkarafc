import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import Footer from "@/components/Footer";
import { client, urlFor } from "@/lib/sanity.client";
import { postBySlugQuery } from "@/lib/queries";
import { catBadgeClass } from "@/lib/catBadge";

export const revalidate = 60;

interface SanityImage {
  asset: { _ref: string };
  alt?: string;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function readingTime(body: any[]): number {
  const text = body
    .filter((b) => b._type === "block")
    .flatMap((b) => b.children ?? [])
    .map((c: { text?: string }) => c.text ?? "")
    .join(" ")
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

// ── Custom PortableText components ────────────────────────────────────────────

const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-white/70 text-base sm:text-[17px] leading-[1.8] mb-6">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="heading-accent font-display font-extrabold italic text-white uppercase text-3xl sm:text-4xl leading-tight mt-12 mb-6">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display font-extrabold italic text-white uppercase text-2xl leading-tight mt-10 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-display font-bold italic text-bka-gold uppercase text-lg tracking-wider mt-8 mb-3">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-bka-gold pl-6 my-8 italic">
        <div className="text-white/65 text-lg sm:text-xl leading-relaxed">{children}</div>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-white font-semibold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-white/80">{children}</em>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-bka-gold underline underline-offset-2 hover:text-white transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 space-y-2.5">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 space-y-2.5 list-decimal pl-5 marker:text-bka-gold">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-3 text-white/70 text-base leading-relaxed">
        <span className="text-bka-red mt-[6px] shrink-0 text-xs">◆</span>
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="text-white/70 text-base leading-relaxed pl-1">{children}</li>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-10 -mx-6 sm:mx-0">
          <div className="relative aspect-video bg-[#1c1c1c] overflow-hidden sm:rounded-none">
            <Image
              src={urlFor(value).width(1200).url()}
              alt={value.alt ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
          {value.alt && (
            <figcaption className="text-white/35 text-xs text-center mt-3 uppercase tracking-widest px-6 sm:px-0">
              {value.alt}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

// ── Page ──────────────────────────────────────────────────────────────────────

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

  const mins = post.body ? readingTime(post.body) : null;

  return (
    <main className="flex-1 bg-background">
      {/* ── Hero ──────────────────────────────────────────────── */}
      {post.coverImage ? (
        <div className="relative h-[380px] sm:h-[500px] bg-[#1c1c1c] overflow-hidden">
          <Image
            src={urlFor(post.coverImage).width(1400).height(600).url()}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.7) 40%, rgba(8,8,8,0.3) 100%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 pb-8">
            <div className="max-w-3xl mx-auto px-6">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 ${catBadgeClass(post.category)}`}>
                  {catLabel[post.category] ?? post.category}
                </span>
                <span className="text-white/25">·</span>
                <span className="text-white/45 text-xs">{fmtDate(post.publishedAt)}</span>
                {mins && (
                  <>
                    <span className="text-white/25">·</span>
                    <span className="text-white/45 text-xs">{mins} min read</span>
                  </>
                )}
              </div>
              <h1 className="font-display font-extrabold italic text-white uppercase text-4xl sm:text-5xl leading-[0.95]">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-surface border-b border-white/10">
          <div className="max-w-3xl mx-auto px-6 py-12">
            <div className="flex items-center flex-wrap gap-3 mb-5">
              <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 ${catBadgeClass(post.category)}`}>
                {catLabel[post.category] ?? post.category}
              </span>
              <span className="text-white/25">·</span>
              <span className="text-white/45 text-xs">{fmtDate(post.publishedAt)}</span>
              {mins && (
                <>
                  <span className="text-white/25">·</span>
                  <span className="text-white/45 text-xs">{mins} min read</span>
                </>
              )}
            </div>
            <h1 className="font-display font-extrabold italic text-white uppercase text-4xl sm:text-5xl leading-[0.95]">
              {post.title}
            </h1>
          </div>
        </div>
      )}

      {/* ── Article body ──────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 pt-10 pb-16">

        {/* Excerpt — styled as a pull quote */}
        {post.excerpt && (
          <p className="text-white/65 text-lg sm:text-xl leading-relaxed border-l-4 border-bka-gold pl-5 mb-10 italic">
            {post.excerpt}
          </p>
        )}

        {/* Divider before body */}
        {post.excerpt && post.body && (
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-white/10" />
            <div className="flex gap-1">
              <div className="w-3 h-[3px] bg-bka-red" />
              <div className="w-2 h-[3px] bg-bka-gold" />
            </div>
          </div>
        )}

        {/* Body */}
        {post.body && (
          <div>
            <PortableText value={post.body} components={ptComponents} />
          </div>
        )}

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
          <a
            href="/news"
            className="text-bka-gold text-sm font-semibold uppercase tracking-wider hover:underline"
          >
            ← All News
          </a>
          <span className="text-white/25 text-xs uppercase tracking-widest">
            {catLabel[post.category] ?? post.category}
          </span>
        </div>
      </div>

      <Footer />
    </main>
  );
}
