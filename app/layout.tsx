import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GVS Roulette",
  description: "A thrilling roulette game experience",
  keywords: ["roulette", "gambling", "casino"],
  openGraph:{
    images: [
      {
        url: "https://gvs-roulette.vercel.app/registerBg.svg",
        width: 1200,
        height: 630,
        alt: "GVS Roulette - A thrilling roulette game experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "https://gvs-roulette.vercel.app/registerBg.svg",
        width: 1200,
        height: 630,
        alt: "GVS Roulette - A thrilling roulette game experience",
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
