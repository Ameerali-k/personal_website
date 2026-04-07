import "../styles/index.css";
import { CustomCursor } from "../components/CustomCursor";
import { Header } from "../components/Header";
import { ContactSection } from "../components/ContactSection";
import { FooterSection } from "../components/FooterSection";

export const metadata = {
  title: "My React App is now Next.js",
  description: "Migrated from Vite to Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <Header />
        {children}
        <ContactSection />
        <FooterSection />
      </body>
    </html>
  );
}
