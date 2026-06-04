import { notFound } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/Footer";
import { client, urlFor } from "@/lib/sanity.client";
import { playerByNumberQuery } from "@/lib/queries";

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

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number: numStr } = await params;
  const number = parseInt(numStr, 10);

  if (isNaN(number)) notFound();

  const player = await client
    .fetch<SanityPlayer | null>(playerByNumberQuery, { number })
    .catch(() => null);

  if (!player) notFound();

  return (
    <main className="flex-1 bg-background">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="flex flex-col sm:flex-row gap-10 items-start">
          {/* Photo */}
          <div className="w-full sm:w-64 shrink-0">
            <div className="aspect-[3/4] bg-[#1c1c1c] relative overflow-hidden">
              {player.photo ? (
                <Image
                  src={urlFor(player.photo).width(512).height(683).url()}
                  alt={player.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 256px"
                  className="object-cover object-top"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/10 text-xs uppercase tracking-widest">Photo</span>
                </div>
              )}
              {/* Squad number overlay */}
              <span className="font-display font-extrabold italic text-bka-gold text-7xl absolute top-4 right-4 leading-none drop-shadow-lg">
                {player.number}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 pt-2">
            <div className="text-bka-red text-xs font-semibold uppercase tracking-wider mb-2">
              {player.position}
            </div>
            <h1 className="font-display font-extrabold italic text-white uppercase text-5xl sm:text-6xl leading-tight mb-2">
              {player.name}
            </h1>
            {player.nationality && (
              <div className="text-white/40 text-sm uppercase tracking-widest mb-8">
                {player.nationality}
              </div>
            )}

            <div className="flex gap-8 mb-10">
              <div>
                <div className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Number</div>
                <div className="font-display font-extrabold italic text-bka-gold text-4xl">
                  {player.number}
                </div>
              </div>
              <div>
                <div className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Position</div>
                <div className="text-white font-semibold text-lg">{player.position}</div>
              </div>
            </div>

            {player.bio && (
              <div className="border-l-4 border-bka-gold pl-5">
                <p className="text-white/60 text-base leading-relaxed">{player.bio}</p>
              </div>
            )}
          </div>
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <a
            href="/squad"
            className="text-bka-gold text-sm font-semibold uppercase tracking-wider hover:underline"
          >
            ← Full Squad
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
