import Image from "next/image";
import { client, urlFor } from "@/lib/sanity.client";
import { siteSettingsQuery } from "@/lib/queries";

const footerLinks = [
  {
    heading: "Club",
    links: [
      { label: "About", href: "/club" },
      { label: "Squad", href: "/squad" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    heading: "Football",
    links: [
      { label: "Fixtures & Results", href: "/fixtures" },
      { label: "News", href: "/news" },
    ],
  },
  {
    heading: "Fan Zone",
    links: [
      { label: "Memberships", href: "/memberships" },
    ],
  },
];

function FooterCrest() {
  return (
    <svg
      viewBox="0 0 50 58"
      width="48"
      height="56"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="footer-shield-clip">
          <path d="M25 2 L48 10 L48 36 L25 56 L2 36 L2 10 Z" />
        </clipPath>
      </defs>
      <path d="M25 2 L48 10 L48 36 L25 56 L2 36 L2 10 Z" fill="#D0021B" stroke="#F5A623" strokeWidth="1.5" />
      <g clipPath="url(#footer-shield-clip)">
        <rect x="6" y="0" width="8" height="58" fill="white" opacity="0.2" />
        <rect x="22" y="0" width="8" height="58" fill="white" opacity="0.2" />
        <rect x="38" y="0" width="8" height="58" fill="white" opacity="0.2" />
      </g>
      <text
        x="25"
        y="36"
        textAnchor="middle"
        fill="white"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="13"
      >
        BK
      </text>
    </svg>
  );
}

export default async function Footer() {
  const settings = await client.fetch(siteSettingsQuery).catch(() => null);

  const clubName = settings?.clubName ?? "Birkirkara FC";
  const clubTagline = settings?.clubTagline ?? "Est. 1950 · Malta";
  const description = settings?.footerDescription ?? "Maltese Premier League football club based in Birkirkara, Malta. The Stripes.";
  const crestUrl = settings?.crest ? urlFor(settings.crest).width(96).height(112).url() : null;

  return (
    <footer className="bg-surface border-t-[3px] border-bka-red pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              {crestUrl ? (
                <Image src={crestUrl} width={48} height={56} alt="Club Crest" />
              ) : (
                <FooterCrest />
              )}
              <div>
                <div className="font-display font-extrabold italic text-white text-lg leading-tight">
                  {clubName}
                </div>
                <div className="text-[10px] text-white/40 tracking-widest uppercase">
                  {clubTagline}
                </div>
              </div>
            </div>
            <p className="text-white/40 text-xs leading-relaxed">
              {description}
            </p>
          </div>

          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h3 className="font-display font-bold italic text-bka-gold uppercase text-sm tracking-widest mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-white/50 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-white/30 text-xs">
          <span>© {new Date().getFullYear()} {clubName}. All rights reserved.</span>
          <span>Maltese Premier League · Malta</span>
        </div>
      </div>
    </footer>
  );
}
