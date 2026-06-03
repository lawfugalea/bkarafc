import Footer from "@/components/Footer";

export const revalidate = 60;

const positions = [
  {
    label: "Goalkeepers",
    players: [
      { number: 1, name: "Justin Haber", nationality: "Malta" },
      { number: 13, name: "Matthew Callus", nationality: "Malta" },
    ],
  },
  {
    label: "Defenders",
    players: [
      { number: 2, name: "Kyle Azzopardi", nationality: "Malta" },
      { number: 3, name: "Diego Aguiar", nationality: "Brazil" },
      { number: 4, name: "Ivan Woods", nationality: "Malta" },
      { number: 5, name: "Joseph Borg", nationality: "Malta" },
      { number: 16, name: "Stefan Cassar", nationality: "Malta" },
    ],
  },
  {
    label: "Midfielders",
    players: [
      { number: 6, name: "Robert Muscat", nationality: "Malta" },
      { number: 7, name: "Ryan Darmanin", nationality: "Malta" },
      { number: 8, name: "Joseph Zerafa", nationality: "Malta" },
      { number: 10, name: "Paul Fenech", nationality: "Malta" },
      { number: 17, name: "Ayrton Attard", nationality: "Malta" },
    ],
  },
  {
    label: "Forwards",
    players: [
      { number: 9, name: "Jhonnattan", nationality: "Brazil" },
      { number: 11, name: "Edward Herrera", nationality: "Spain" },
      { number: 14, name: "Triston Caruana", nationality: "Malta" },
      { number: 19, name: "Luke Montebello", nationality: "Malta" },
    ],
  },
];

export default function SquadPage() {
  return (
    <main className="flex-1 bg-background">
      {/* Page header */}
      <section className="border-b border-white/10 bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="text-bka-red text-xs font-semibold uppercase tracking-widest mb-2">
            2024/25 Season
          </div>
          <h1 className="font-display font-extrabold italic text-white uppercase text-5xl tracking-wide">
            The Squad
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-14 space-y-14">
        {positions.map((group) => (
          <section key={group.label}>
            <h2 className="font-display font-extrabold italic text-bka-gold uppercase text-2xl tracking-widest mb-6 border-b border-white/10 pb-3">
              {group.label}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {group.players.map((player) => (
                <a
                  key={player.number}
                  href={`/squad/${player.number}`}
                  className="bg-surface group block relative overflow-hidden"
                >
                  <div className="aspect-[3/4] bg-[#1c1c1c] flex items-center justify-center relative">
                    <span className="text-white/10 text-xs uppercase tracking-widest absolute">
                      Photo
                    </span>
                    <span className="font-display font-extrabold italic text-bka-gold text-5xl absolute top-3 right-3 leading-none">
                      {player.number}
                    </span>
                  </div>
                  <div className="p-3">
                    <div className="text-white/40 text-[10px] uppercase tracking-widest">
                      {group.label.slice(0, -1)}
                    </div>
                    <div className="text-white font-semibold text-sm mt-0.5 group-hover:text-bka-gold transition-colors">
                      {player.name}
                    </div>
                    <div className="text-white/30 text-[10px] mt-0.5">{player.nationality}</div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Footer />
    </main>
  );
}
