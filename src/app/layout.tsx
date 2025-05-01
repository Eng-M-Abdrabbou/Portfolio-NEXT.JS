// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import ThemeToggle from './components/ThemeToggle';
import ParticleBackground from './components/ParticleBackground';
import Footer from './components/Footer';

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
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`} suppressHydrationWarning>
      <body className="relative">
        <ParticleBackground />
        <div className="relative z-10">
          <ThemeToggle />
          {children}
<div className="w-[85%] mx-auto">
<Footer />

</div>
        

        </div>
      </body>
    </html>
  );
}