"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { ContactSection } from "./ContactSection";
import { FooterSection } from "./FooterSection";
import { CustomCursor } from "./CustomCursor";
import { TestimonialsSection } from "./TestimonialsSection";
import { RecentNewsSection } from "./RecentNewsSection";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  const isTutorial = pathname?.startsWith("/tutorials");
  const isTutorialDetail = pathname ? /^\/tutorials\/.+/.test(pathname) : false;

  if (isTutorial) {
    return (
      <>
        {!isTutorialDetail && <Header />}
        {children}
      </>
    );
  }

  return (
    <>
      {!pathname?.startsWith("/blog/") && <CustomCursor />}
      <Header />
      {children}
      {!pathname?.startsWith("/projects/") && !pathname?.startsWith("/blog/") && <TestimonialsSection />}
      {!pathname?.startsWith("/projects/") && !pathname?.startsWith("/blog/") && <RecentNewsSection />}
      {!pathname?.startsWith("/projects/") && !pathname?.startsWith("/blog/") && <ContactSection />}
      <FooterSection />
    </>
  );
}
