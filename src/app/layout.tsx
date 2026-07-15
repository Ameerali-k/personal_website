import type { Metadata } from "next";
import "../styles/index.css";
import LayoutWrapper from "../components/LayoutWrapper";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: {
    default: "Ameerali | Graphic Designer & Web Developer",
    template: "%s | Ameerali"
  },
  description: "Ameerali is a creative graphic designer and web developer specializing in branding, UI/UX design, and crafting engaging digital experiences.",
  keywords: ["Graphic Designer", "Web Developer", "UI/UX Design", "Branding", "Ameerali", "Portfolio", "Front-end Developer", "Creative Designer"],
  authors: [{ name: "Ameerali" }],
  creator: "Ameerali",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Ameerali | Graphic Designer & Web Developer",
    description: "Creative graphic designer and web developer specializing in branding, UI/UX design, and digital experiences.",
    siteName: "Ameerali Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ameerali | Graphic Designer & Web Developer",
    description: "Creative graphic designer and web developer specializing in branding, UI/UX design, and digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID!
const GA_ID = process.env.NEXT_PUBLIC_GA_ID!

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId={GTM_ID} />
      <GoogleAnalytics gaId={GA_ID} />
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
