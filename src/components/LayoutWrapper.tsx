"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { ContactSection } from "./ContactSection";
import { FooterSection } from "./FooterSection";
import { CustomCursor } from "./CustomCursor";
import { TestimonialsSection } from "./TestimonialsSection";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <CustomCursor />
      <Header />
      {children}
      <TestimonialsSection />
      <ContactSection />
      <FooterSection />
    </>
  );
}
