"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "News", href: "/news" },
  { label: "Fixtures", href: "/fixtures" },
  { label: "Squad", href: "/squad" },
  { label: "Club", href: "/club" },
  { label: "Gallery", href: "/gallery" },
];

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function Crest({ size = 44 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 50 58"
      width={size}
      height={Math.round(size * 1.16)}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="shield-clip">
          <path d="M25 2 L48 10 L48 36 L25 56 L2 36 L2 10 Z" />
        </clipPath>
      </defs>
      <path d="M25 2 L48 10 L48 36 L25 56 L2 36 L2 10 Z" fill="#D0021B" stroke="#F5A623" strokeWidth="1.5" />
      <g clipPath="url(#shield-clip)">
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

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      {/* Topbar */}
      <div className="bg-surface border-b border-white/10 px-6 py-1.5 flex items-center justify-between text-xs text-white/50">
        <span className="tracking-wide">2024/25 Season · Maltese Premier League</span>
        <div className="flex items-center gap-5">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-bka-gold transition-colors"
          >
            <FacebookIcon />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-bka-gold transition-colors"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (formerly Twitter)"
            className="hover:text-bka-gold transition-colors"
          >
            <XIcon />
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-background border-b border-white/10 px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Crest size={44} />
          <div>
            <div className="font-display font-extrabold italic text-white text-xl leading-tight">
              Birkirkara FC
            </div>
            <div className="text-[10px] text-white/40 tracking-widest uppercase">
              Est. 1950 · Malta
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  "relative text-sm font-medium uppercase tracking-wider transition-colors pb-0.5 " +
                  "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:transition-transform after:duration-200 " +
                  (isActive
                    ? "text-white after:bg-bka-red after:scale-x-100"
                    : "text-white/60 hover:text-white after:bg-bka-gold after:scale-x-0 hover:after:scale-x-100")
                }
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/memberships"
            className="bg-bka-red hover:bg-[#b00217] text-white text-sm font-semibold uppercase tracking-wider px-5 py-2 transition-colors"
          >
            Memberships
          </Link>
        </div>
      </nav>

      {/* Stripe bar */}
      <div
        className="h-[4px] w-full"
        style={{
          background:
            "linear-gradient(to right, #D0021B 0%, #D0021B 23.08%, #F5A623 23.08%, #F5A623 30.77%, #D0021B 30.77%, #D0021B 46.15%, #F5A623 46.15%, #F5A623 53.85%, #0d0d0d 53.85%, #0d0d0d 100%)",
        }}
      />
    </header>
  );
}
