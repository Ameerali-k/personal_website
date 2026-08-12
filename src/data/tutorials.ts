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
  {
    id: "agent-router-inference",
    slug: "configure-agent-router-api-tokens-and-third-party-inference",
    category: "AGENT ROUTER / AI",
    title: "Configure Agent Router API Tokens and Third-Party Inference",
    description: "A complete step-by-step process of generating API tokens on Agent Router and configuring third-party inference within your application.",
    estimatedTime: "5-10 minutes",
    date: "Aug 2026",
    featured: true,
  },
];

export function getTutorialBySlug(slug: string): Tutorial | undefined {
  return TUTORIALS.find((t) => t.slug === slug);
}
