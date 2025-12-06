import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BG Wealth Sharing - Lee Meadows Team",
  description: "Invest Once, Benefit for Life. Join the Lee Meadows Team in the BG Wealth Sharing Project.",
  keywords: ["BG Wealth", "DSJEX", "Lee Meadows", "Investment", "Trading", "Wealth Sharing"],
  openGraph: {
    title: "BG Wealth Sharing - Lee Meadows Team",
    description: "Invest Once, Benefit for Life. Join the Lee Meadows Team in the BG Wealth Sharing Project.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
