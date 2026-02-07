import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script, Dynalight } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const dancing = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing" });
const dynalight = Dynalight({ weight: "400", subsets: ["latin"], variable: "--font-dynalight" });

export const metadata: Metadata = {
  title: "BuKalpSana | Create a Romantic Digital Gift",
  description: "The perfect digital gift for Valentine's Day. Personalized, private, and forever.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${dancing.variable} ${dynalight.variable}`}>
        {children}
      </body>
    </html>
  );
}
