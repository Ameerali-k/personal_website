import "../styles/index.css";
import { CustomCursor } from "../components/CustomCursor";
import LayoutWrapper from "../components/LayoutWrapper";

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
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
