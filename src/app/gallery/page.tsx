import Footer from "@/components/Footer";

const items = [
  { id: 1, label: "Matchday vs Valletta", aspect: "aspect-[4/3]" },
  { id: 2, label: "Training Session", aspect: "aspect-square" },
  { id: 3, label: "Goal Celebration", aspect: "aspect-[3/4]" },
  { id: 4, label: "Pre-Season Camp", aspect: "aspect-[4/3]" },
  { id: 5, label: "Trophy Lift 2016", aspect: "aspect-[3/4]" },
  { id: 6, label: "Fan Day", aspect: "aspect-[4/3]" },
  { id: 7, label: "Keeper Training", aspect: "aspect-square" },
  { id: 8, label: "Away at Floriana", aspect: "aspect-[4/3]" },
  { id: 9, label: "Kit Launch", aspect: "aspect-[3/4]" },
  { id: 10, label: "Europa League Qualifier", aspect: "aspect-[4/3]" },
  { id: 11, label: "Academy Finals", aspect: "aspect-square" },
  { id: 12, label: "Matchday Atmosphere", aspect: "aspect-[3/4]" },
];

export default function GalleryPage() {
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
        {/* CSS columns masonry */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-0">
          {items.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid mb-4 bg-surface group cursor-pointer overflow-hidden"
            >
              <div
                className={`${item.aspect} bg-[#1c1c1c] flex items-center justify-center relative`}
              >
                <span className="text-white/15 text-xs uppercase tracking-widest">Image</span>
                <div className="absolute inset-0 bg-bka-red/0 group-hover:bg-bka-red/10 transition-colors duration-200" />
              </div>
              <div className="px-3 py-2">
                <span className="text-white/40 text-xs">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
