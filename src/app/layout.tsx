import type { Metadata } from "next";
import "../styles/index.css";
import LayoutWrapper from "../components/LayoutWrapper";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: {
    default: "Freelance Graphic Designer & Web Developer | Ameer Alik",
    template: "%s | Ameer Alik"
  },
  description: "Freelance graphic designer and web developer creating standout brands and fast, modern websites. View my portfolio and get a free quote today.",
  keywords: ["Graphic Designer", "Web Developer", "UI/UX Design", "Branding", "Ameerali", "Portfolio", "Front-end Developer", "Creative Designer"],
  authors: [{ name: "Ameerali" }],
  creator: "Ameerali",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Freelance Graphic Designer & Web Developer | Ameer Alik",
    description: "Freelance graphic designer and web developer creating standout brands and fast, modern websites. View my portfolio and get a free quote today.",
    siteName: "Ameer Alik — Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Graphic Designer & Web Developer | Ameer Alik",
    description: "Freelance graphic designer and web developer creating standout brands and fast, modern websites. View my portfolio and get a free quote today.",
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
