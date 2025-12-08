import type { Metadata } from "next";
import { Cinzel, Lato } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({ 
  subsets: ["latin"],
  variable: '--font-cinzel', // Ini kuncinya
  display: 'swap',
});

const lato = Lato({ 
  weight: ['300', '400', '700'],
  subsets: ["latin"], 
  variable: '--font-lato', // Ini kuncinya
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Identifikasi Kopi Nusantara",
  description: "AI Coffee Identification",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${cinzel.variable} ${lato.variable}`}>
      <body className="font-body min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}