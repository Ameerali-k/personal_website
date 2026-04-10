
  # Build website with Next.js

  This is a code bundle for Build website with Next.js. The original project is available at https://www.figma.com/design/I8eaet9vkZDhqgq2E5zzAH/Build-website-with-Next.js.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Local WordPress headless setup (projects)

  1. Set up local WordPress and install/activate `WPGraphQL`.
  2. In WordPress, create Project posts (title, slug, excerpt, featured image).
  3. Copy `.env.example` to `.env.local` and set:
     - `NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=http://localhost/your-wp-site/graphql`
  4. Restart Next.js dev server.

  The Projects section and `/projects/[slug]` page now read from WordPress when the GraphQL URL is set. If the URL is not set, the app uses built-in fallback project cards.
  