import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecaptchaProvider from "@/components/RecaptchaProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abundant Blessing AI Trade - BG Wealth Sharing",
  description: "Invest Once, Benefit for Life. Join Abundant Blessing AI Trade in the BG Wealth Sharing Project.",
  keywords: ["BG Wealth", "DSJEX", "Abundant Blessing", "AI Trade", "Investment", "Trading", "Wealth Sharing"],
  openGraph: {
    title: "Abundant Blessing AI Trade - BG Wealth Sharing",
    description: "Invest Once, Benefit for Life. Join Abundant Blessing AI Trade in the BG Wealth Sharing Project.",
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
        <RecaptchaProvider>
          {children}
        </RecaptchaProvider>
      </body>
    </html>
  );
}
