import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTutorialBySlug } from "@/data/tutorials";
import { TUTORIAL_CONTENTS } from "@/data/tutorialContent";
import TutorialDetailClient from "./TutorialDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const tutorialMeta = getTutorialBySlug(slug);
  const content = TUTORIAL_CONTENTS[slug];

  if (!tutorialMeta || !content) {
    return {
      title: "Tutorial Not Found",
      description: "The requested tutorial could not be found.",
    };
  }

  // Construct description from the first few lines of the tutorial
  const partOneDesc = content.parts?.[0]?.description || "";
  const firstStepText = content.parts?.[0]?.steps?.[0]?.text || "";
  
  const tutorialLines = [tutorialMeta.description, partOneDesc, firstStepText]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ameeralik.com";
  const tutorialUrl = `${siteUrl}/tutorials/${slug}`;

  return {
    title: tutorialMeta.title,
    description: tutorialLines,
    openGraph: {
      title: tutorialMeta.title,
      description: tutorialLines,
      url: tutorialUrl,
      type: "article",
      siteName: "Ameer Alik — Portfolio & Tutorials",
    },
    twitter: {
      card: "summary_large_image",
      title: tutorialMeta.title,
      description: tutorialLines,
    },
  };
}

export default async function TutorialDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const tutorialMeta = getTutorialBySlug(slug);
  const content = TUTORIAL_CONTENTS[slug];

  if (!tutorialMeta || !content) {
    notFound();
  }

  return (
    <TutorialDetailClient
      slug={slug}
      tutorialMeta={tutorialMeta}
      content={content}
    />
  );
}
