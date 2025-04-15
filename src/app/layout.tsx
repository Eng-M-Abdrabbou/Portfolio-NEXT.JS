// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: '--font-fira-code',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Mahmoud Abdrabbou | Software Engineer",
  description: "Mahmoud Abdrabbou's Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <body className="bg-navy text-slate font-sans antialiased">
        {children}
      </body>
    </html>
  );
}