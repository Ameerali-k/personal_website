export type CmsProjectSummary = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  iconUrl: string;
  iconAlt: string;
};

export type CmsProject = CmsProjectSummary & {
  content: string;
  date: string;
};

const endpoint = (process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL || "").trim();

export function hasWordPressEndpoint(): boolean {
  return endpoint.length > 0;
}

async function wpGraphQL<T>(query: string, variables?: Record<string, unknown>): Promise<T | null> {
  if (!endpoint) return null;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!response.ok) return null;

  const json = await response.json();
  if (json?.errors) return null;
  return (json?.data as T) || null;
}

function mapNodeToProject(node: any): CmsProject {
  return {
    id: Number(node?.databaseId || 0),
    title: node?.title || "Untitled",
    slug: node?.slug || "",
    excerpt: node?.excerpt || "",
    content: node?.content || "",
    date: node?.date || "",
    iconUrl: node?.featuredImage?.node?.sourceUrl || "",
    iconAlt: node?.featuredImage?.node?.altText || node?.title || "Project",
  };
}

export async function fetchProjects(): Promise<CmsProjectSummary[]> {
  const query = `
    query ProjectsList {
      projects(first: 50, where: { status: PUBLISH }) {
        nodes {
          databaseId
          title
          slug
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  `;

  type Result = {
    projects?: { nodes?: any[] };
  };

  const data = await wpGraphQL<Result>(query);
  const nodes = data?.projects?.nodes || [];
  return nodes.map(mapNodeToProject);
}

export async function fetchProjectBySlug(slug: string): Promise<CmsProject | null> {
  const query = `
    query ProjectBySlug($slug: ID!) {
      project(id: $slug, idType: SLUG) {
        databaseId
        title
        slug
        excerpt
        content
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  `;

  type Result = { project?: any };
  const data = await wpGraphQL<Result>(query, { slug });
  if (!data?.project) return null;
  return mapNodeToProject(data.project);
}
