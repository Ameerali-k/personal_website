import "../styles/index.css";
import LayoutWrapper from "../components/LayoutWrapper";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

export const metadata = {
  title: "Ameerali — Graphic Designer & Web Developer",
  description: "Ameerali is a creative graphic designer and web developer specialising in branding, UI/UX design, and digital experiences.",
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
