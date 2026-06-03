import Footer from "@/components/Footer";

export const revalidate = 60;

const newsItems = [
  { id: 1, category: "Match Report", title: "Stripes secure dramatic late winner against Valletta", excerpt: "A stoppage-time goal from captain Jhonnattan secured all three points in a pulsating derby clash at the National Stadium.", date: "2 Jun 2025" },
  { id: 2, category: "Transfer", title: "Club signs midfielder on season-long loan", excerpt: "Birkirkara FC have completed the signing of a highly rated central midfielder on a season-long loan arrangement.", date: "1 Jun 2025" },
  { id: 3, category: "Academy", title: "U17s reach national cup semi-final", excerpt: "The Under-17s produced a stunning performance to knock out Hibernians and book their place in the last four.", date: "31 May 2025" },
  { id: 4, category: "Club", title: "Annual general meeting scheduled for July", excerpt: "The club has confirmed the date for its annual general meeting, open to all registered members.", date: "30 May 2025" },
  { id: 5, category: "Match Report", title: "Draw away to Floriana maintains top-four spot", excerpt: "A resilient defensive display away at Floriana kept the Stripes in the top four as the season enters its final stretch.", date: "28 May 2025" },
  { id: 6, category: "Transfer", title: "Defender extends contract until 2027", excerpt: "Birkirkara FC are delighted to announce that key defender Diego Aguiar has signed a two-year contract extension.", date: "26 May 2025" },
  { id: 7, category: "Club", title: "New kit partnership announced for 2025/26", excerpt: "The club has revealed a new technical kit partnership ahead of the upcoming season.", date: "24 May 2025" },
  { id: 8, category: "Match Report", title: "Sliema Wanderers beaten 3–0 at Centenary Stadium", excerpt: "An emphatic home win over Sliema moved Birkirkara three points clear in fourth place.", date: "11 May 2025" },
  { id: 9, category: "Academy", title: "Youth academy open trials for 2025/26 season", excerpt: "Birkirkara FC are inviting talented youngsters aged 8–16 to attend open trials at the Birkirkara training ground.", date: "9 May 2025" },
];

export default function NewsPage() {
  const [featured, ...rest] = newsItems;

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

      {/* News grid */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        {/* Featured */}
        <a href={`/news/${featured.id}`} className="lg:flex gap-8 bg-surface group block mb-10">
          <div className="lg:w-1/2 aspect-video bg-[#1c1c1c] flex items-center justify-center shrink-0">
            <span className="text-white/15 text-xs uppercase tracking-widest">Image</span>
          </div>
          <div className="p-6 flex flex-col justify-center">
            <span className="text-bka-red text-xs font-semibold uppercase tracking-wider">
              {featured.category}
            </span>
            <h2 className="font-display font-bold italic text-white text-3xl mt-2 leading-tight group-hover:text-bka-gold transition-colors">
              {featured.title}
            </h2>
            <p className="text-white/50 text-sm mt-3 leading-relaxed">
              {featured.excerpt}
            </p>
            <div className="text-white/30 text-xs mt-4">{featured.date}</div>
          </div>
        </a>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rest.map((item) => (
            <a key={item.id} href={`/news/${item.id}`} className="bg-surface group block">
              <div className="aspect-video bg-[#1c1c1c] flex items-center justify-center">
                <span className="text-white/10 text-xs uppercase tracking-widest">Image</span>
              </div>
              <div className="p-4">
                <span className="text-bka-red text-[10px] font-semibold uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-white font-semibold text-sm mt-1.5 leading-snug group-hover:text-bka-gold transition-colors">
                  {item.title}
                </h3>
                <div className="text-white/30 text-[11px] mt-3">{item.date}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
