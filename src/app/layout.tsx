import "../styles/index.css";
import { CustomCursor } from "../components/CustomCursor";
import LayoutWrapper from "../components/LayoutWrapper";

export const metadata = {
  title: "Ameerali — Graphic Designer & Web Developer",
  description: "Ameerali is a creative graphic designer and web developer specialising in branding, UI/UX design, and digital experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
