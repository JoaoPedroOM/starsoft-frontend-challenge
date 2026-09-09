import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins, IBM_Plex_Sans } from "next/font/google";
import "../styles/globals.css";
import ReduxProvider from "@/providers/ReduxProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://starsoft.games/"),
  title: {
    default: "Starsoft | Marketplace Exclusivo de NFTs",
    template: "Starsoft",
  },
  description:
    "Explore e colecione artes digitais exclusivas em Ethereum no marketplace Starsoft. A melhor plataforma de NFTs do Brasil.",
  keywords: [
    "NFT",
    "Marketplace NFT",
    "Ethereum",
    "ETH",
    "Crypto Art",
    "Arte Digital",
    "Web3",
    "Blockchain",
    "Starsoft",
  ],
  authors: [{ name: "Starsoft", url: "https://starsoft.games/" }],
  creator: "Starsoft",
  publisher: "Starsoft",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://starsoft.games/",
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${ibmPlexSans.variable}`}>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
