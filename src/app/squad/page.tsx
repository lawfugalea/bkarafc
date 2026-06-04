import Image from "next/image";
import Footer from "@/components/Footer";
import { client, urlFor } from "@/lib/sanity.client";
import { allPlayersQuery, siteSettingsQuery } from "@/lib/queries";

export const revalidate = 60;

interface SanityImage {
  asset: { _ref: string };
}

interface SanityPlayer {
  name: string;
  number: number;
  position: string;
  nationality?: string;
  photo?: SanityImage;
  bio?: string;
}

const positionGroups = [
  { label: "Goalkeepers", key: "Goalkeeper" },
  { label: "Defenders", key: "Defender" },
  { label: "Midfielders", key: "Midfielder" },
  { label: "Forwards", key: "Forward" },
];

const fallbackPlayers: SanityPlayer[] = [
  { number: 1, name: "Justin Haber", position: "Goalkeeper", nationality: "Malta" },
  { number: 13, name: "Matthew Callus", position: "Goalkeeper", nationality: "Malta" },
  { number: 2, name: "Kyle Azzopardi", position: "Defender", nationality: "Malta" },
  { number: 3, name: "Diego Aguiar", position: "Defender", nationality: "Brazil" },
  { number: 4, name: "Ivan Woods", position: "Defender", nationality: "Malta" },
  { number: 5, name: "Joseph Borg", position: "Defender", nationality: "Malta" },
  { number: 16, name: "Stefan Cassar", position: "Defender", nationality: "Malta" },
  { number: 6, name: "Robert Muscat", position: "Midfielder", nationality: "Malta" },
  { number: 7, name: "Ryan Darmanin", position: "Midfielder", nationality: "Malta" },
  { number: 8, name: "Joseph Zerafa", position: "Midfielder", nationality: "Malta" },
  { number: 10, name: "Paul Fenech", position: "Midfielder", nationality: "Malta" },
  { number: 17, name: "Ayrton Attard", position: "Midfielder", nationality: "Malta" },
  { number: 9, name: "Jhonnattan", position: "Forward", nationality: "Brazil" },
  { number: 11, name: "Edward Herrera", position: "Forward", nationality: "Spain" },
  { number: 14, name: "Triston Caruana", position: "Forward", nationality: "Malta" },
  { number: 19, name: "Luke Montebello", position: "Forward", nationality: "Malta" },
];

export default async function SquadPage() {
  const [players, settings] = await Promise.all([
    client.fetch<SanityPlayer[]>(allPlayersQuery).catch(() => [] as SanityPlayer[]),
    client.fetch(siteSettingsQuery).catch(() => null),
  ]);

  const roster = players.length > 0 ? players : fallbackPlayers;
  const seasonLabel = settings?.seasonLabel ?? "2024/25 Season";

  return (
    <main className="flex-1 bg-background">
      {/* Page header */}
      <section className="border-b border-white/10 bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="text-bka-red text-xs font-semibold uppercase tracking-widest mb-2">
            {seasonLabel}
          </div>
          <h1 className="font-display font-extrabold italic text-white uppercase text-5xl tracking-wide">
            The Squad
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-14 space-y-14">
        {positionGroups.map((group) => {
          const groupPlayers = roster.filter((p) => p.position === group.key);
          if (groupPlayers.length === 0) return null;
          return (
            <section key={group.key}>
              <h2 className="font-display font-extrabold italic text-bka-gold uppercase text-2xl tracking-widest mb-6 border-b border-white/10 pb-3">
                {group.label}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {groupPlayers.map((player) => (
                  <a
                    key={player.number}
                    href={`/squad/${player.number}`}
                    className="bg-surface group block relative overflow-hidden"
                  >
                    <div className="aspect-[3/4] bg-[#1c1c1c] relative overflow-hidden flex items-center justify-center">
                      {player.photo ? (
                        <Image
                          src={urlFor(player.photo).width(400).height(533).url()}
                          alt={player.name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <span className="text-white/10 text-xs uppercase tracking-widest absolute">
                          Photo
                        </span>
                      )}
                      <span className="font-display font-extrabold italic text-bka-gold text-5xl absolute top-3 right-3 leading-none drop-shadow-lg">
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
                      {player.nationality && (
                        <div className="text-white/30 text-[10px] mt-0.5">{player.nationality}</div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <Footer />
    </main>
  );
}
