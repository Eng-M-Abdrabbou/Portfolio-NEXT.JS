// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import ThemeToggle from './components/ThemeToggle';
import ParticleBackground from './components/ParticleBackground';
import Footer from './components/Footer';
import CustomElasticCursor from '@/components/CustomElasticCursor'; 
import MusicPlayer from './components/MusicPlayer'; 

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
  title: "Mahmoud Abdrabbou | Software Engineer & Full-Stack Developer",
  description:
    "Explore the portfolio of Mahmoud Abdrabbou, Software Engineer & Full-Stack Developer. Discover my latest work and innovative projects. Let's build something amazing together!",
  keywords: [
    "Mahmoud Abdrabbou",
    "portfolio",
    "developer",
    "engineer",
    "web development",
    "software development",
    "projects",
    "skills",
  ],
  authors: [{ name: "Mahmoud Abdrabbou" }],
  openGraph: {
    title: "Your Portfolio | Software Engineer & Full-Stack Developer",
    description:
      "Discover the portfolio of Mahmoud Abdrabbou, Software Engineer & Full-Stack Developer.",
    url: "https://yourportfolio.site", // Replace with actual URL
    images: [
      {
        url: "/assets/seo/og-image.png", // Ensure this image exists
        width: 800,
        height: 600,
        alt: "Portfolio preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Portfolio | Software Engineer & Full-Stack Developer",
    description:
      "Explore Mahmoud Abdrabbou's portfolio of innovative projects.",
    images: ["/assets/seo/og-image.png"], // Ensure this image exists
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`} suppressHydrationWarning>
      <body className="relative">
        <CustomElasticCursor /> 
        <ParticleBackground />
        <div className="relative z-10">
          <ThemeToggle />
          {children}
          <MusicPlayer /> 
<div className="w-[85%] mx-auto">
<Footer />

</div>


</div>
      </body>
    </html>
  );
}