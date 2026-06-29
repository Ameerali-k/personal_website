import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use the site URL from environment variables, fallback to production URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ameeralik.com';

  // Fetch all projects to generate dynamic routes
  const { data: projects, error } = await supabase
    .from('projects')
    .select('slug, updated_at, created_at');

  let projectUrls: MetadataRoute.Sitemap = [];
  
  if (projects && !error) {
    projectUrls = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: project.updated_at || project.created_at || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  }

  // Define static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    }
  ];

  return [...routes, ...projectUrls];
}
