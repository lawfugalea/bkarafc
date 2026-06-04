import Image from "next/image";
import Footer from "@/components/Footer";
import { client, urlFor } from "@/lib/sanity.client";
import { allGalleryItemsQuery } from "@/lib/queries";

export const revalidate = 60;

interface SanityImage {
  asset: { _ref: string };
}

interface SanityGalleryItem {
  title: string;
  image: SanityImage;
  aspectRatio?: string;
}

const aspectClass: Record<string, string> = {
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
};

// ── Fallback (shown when no gallery items in Sanity yet) ──────────────────────

const fallbackItems = [
  { id: 1, label: "Matchday vs Valletta", aspect: "aspect-[4/3]" },
  { id: 2, label: "Training Session", aspect: "aspect-square" },
  { id: 3, label: "Goal Celebration", aspect: "aspect-[3/4]" },
  { id: 4, label: "Pre-Season Camp", aspect: "aspect-[4/3]" },
  { id: 5, label: "Trophy Lift 2016", aspect: "aspect-[3/4]" },
  { id: 6, label: "Fan Day", aspect: "aspect-[4/3]" },
  { id: 7, label: "Keeper Training", aspect: "aspect-square" },
  { id: 8, label: "Away at Floriana", aspect: "aspect-[4/3]" },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function GalleryPage() {
  const items = await client
    .fetch<SanityGalleryItem[]>(allGalleryItemsQuery)
    .catch(() => [] as SanityGalleryItem[]);

  return (
    <main className="flex-1 bg-background">
      {/* Page header */}
      <section className="border-b border-white/10 bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="text-bka-red text-xs font-semibold uppercase tracking-widest mb-2">
            Birkirkara FC
          </div>
          <h1 className="font-display font-extrabold italic text-white uppercase text-5xl tracking-wide">
            Gallery
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        {items.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {items.map((item, i) => {
              const aspect = aspectClass[item.aspectRatio ?? "4/3"] ?? "aspect-[4/3]";
              const imgUrl = urlFor(item.image).width(800).url();
              return (
                <div
                  key={i}
                  data-animate
                  data-animate-delay={String((i % 4) * 75)}
                  className="break-inside-avoid mb-4 bg-surface group cursor-pointer overflow-hidden"
                >
                  <div className={`${aspect} relative overflow-hidden`}>
                    <Image
                      src={imgUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-bka-red/0 group-hover:bg-bka-red/10 transition-colors duration-200" />
                  </div>
                  <div className="px-3 py-2">
                    <span className="text-white/40 text-xs">{item.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Placeholder grid shown until gallery items are added in Sanity */
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {fallbackItems.map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid mb-4 bg-surface group cursor-pointer overflow-hidden"
              >
                <div className={`${item.aspect} bg-[#1c1c1c] flex items-center justify-center relative`}>
                  <span className="text-white/15 text-xs uppercase tracking-widest">Image</span>
                  <div className="absolute inset-0 bg-bka-red/0 group-hover:bg-bka-red/10 transition-colors duration-200" />
                </div>
                <div className="px-3 py-2">
                  <span className="text-white/40 text-xs">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
