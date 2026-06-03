const footerLinks = [
  {
    heading: "Club",
    links: [
      { label: "History", href: "/club/history" },
      { label: "Board", href: "/club/board" },
      { label: "Stadium", href: "/club/stadium" },
      { label: "Partners", href: "/club/partners" },
    ],
  },
  {
    heading: "Football",
    links: [
      { label: "First Team", href: "/squad" },
      { label: "Fixtures", href: "/fixtures" },
      { label: "Results", href: "/results" },
      { label: "Academy", href: "/academy" },
    ],
  },
  {
    heading: "Fan Zone",
    links: [
      { label: "News", href: "/news" },
      { label: "Gallery", href: "/gallery" },
      { label: "Memberships", href: "/memberships" },
      { label: "Shop", href: "/shop" },
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

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/10 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FooterCrest />
              <div>
                <div className="font-display font-extrabold italic text-white text-lg leading-tight">
                  Birkirkara FC
                </div>
                <div className="text-[10px] text-white/40 tracking-widest uppercase">
                  Est. 1950 · Malta
                </div>
              </div>
            </div>
            <p className="text-white/40 text-xs leading-relaxed">
              Maltese Premier League football club based in Birkirkara, Malta. The Stripes.
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
          <span>© {new Date().getFullYear()} Birkirkara FC. All rights reserved.</span>
          <span>Maltese Premier League · Malta</span>
        </div>
      </div>
    </footer>
  );
}
