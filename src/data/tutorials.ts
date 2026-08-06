export interface Tutorial {
  id: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  estimatedTime: string;
  date: string;
  featured?: boolean;
}

export const TUTORIALS: Tutorial[] = [
  {
    id: "opencode-nvidia",
    slug: "install-opencode-and-connect-nvidia-free-models",
    category: "OPENCODE / AI",
    title: "Install OpenCode and Connect NVIDIA Free Models",
    description: "A simple terminal-based setup guide for installing OpenCode, finding available models, and connecting NVIDIA free endpoints.",
    estimatedTime: "5-10 minutes",
    date: "Aug 2026",
    featured: true,
  },
];

export function getTutorialBySlug(slug: string): Tutorial | undefined {
  return TUTORIALS.find((t) => t.slug === slug);
}
