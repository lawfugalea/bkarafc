import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { client, urlFor } from "@/lib/sanity.client";
import { siteSettingsQuery } from "@/lib/queries";

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Birkirkara FC | Official Website",
  description: "Official website of Birkirkara FC — Malta's Maltese Premier League club.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await client.fetch(siteSettingsQuery);
  const crestUrl = settings?.crest
    ? urlFor(settings.crest).width(32).height(38).url()
    : undefined;

  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${inter.variable}`}
    >
      <body className="min-h-full flex flex-col bg-background text-white font-body antialiased">
        <Navbar
          crestUrl={crestUrl}
          clubName={settings?.clubName}
          clubTagline={settings?.clubTagline}
          seasonLabel={settings?.seasonLabel}
          facebook={settings?.facebook}
          instagram={settings?.instagram}
          twitter={settings?.twitter}
        />
        {children}
      </body>
    </html>
  );
}
