import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';
import { TUTORIALS } from '@/data/tutorials';

export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ameeralik.com';

  // Fetch all projects to generate dynamic routes
  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('slug, created_at');

  let projectUrls: MetadataRoute.Sitemap = [];
  
  if (projects && !projectsError) {
    projectUrls = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: project.created_at || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  }

  // Fetch all blogs to generate dynamic routes
  const { data: blogs, error: blogsError } = await supabase
    .from('blogs')
    .select('slug, created_at')
    .eq('is_active', true);

  let blogUrls: MetadataRoute.Sitemap = [];
  
  if (blogs && !blogsError) {
    blogUrls = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blog.created_at || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  }

  // Generate dynamic tutorial URLs from tutorials registry
  const tutorialUrls: MetadataRoute.Sitemap = TUTORIALS.map((tutorial) => ({
    url: `${baseUrl}/tutorials/${tutorial.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Define static main routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tutorials`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  return [...routes, ...projectUrls, ...blogUrls, ...tutorialUrls];
}
