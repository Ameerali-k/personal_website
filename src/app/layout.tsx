import "../styles/index.css";
import { CustomCursor } from "../components/CustomCursor";
import LayoutWrapper from "../components/LayoutWrapper";
import { GTMScript, GTMNoScript } from "@/components/GoogleTagManager";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

export const metadata = {
  title: "Ameerali — Graphic Designer & Web Developer",
  description: "Ameerali is a creative graphic designer and web developer specialising in branding, UI/UX design, and digital experiences.",
};

const GTM_ID = "GTM-P3D854TX";
const GA_ID = "G-V38KWQP2JT";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <GTMScript gtmId={GTM_ID} />
        <GoogleAnalytics gaId={GA_ID} />
      </head>
      <body>
        <GTMNoScript gtmId={GTM_ID} />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
