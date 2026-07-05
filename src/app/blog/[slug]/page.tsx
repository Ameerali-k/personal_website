import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { FooterSection } from "@/components/FooterSection";
import { Search } from "lucide-react";
import BlogShareButton from "./BlogShareButton";
import BlogSearchInput from "../BlogSearchInput";

export const revalidate = 0; // Dynamic route

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;

  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", resolvedParams.slug)
    .single();

  if (error || !blog) {
    notFound();
  }

  // Fetch recent blogs, excluding current
  const { data: recentBlogs } = await supabase
    .from("blogs")
    .select("*")
    .neq("id", blog.id)
    .order("created_at", { ascending: false })
    .limit(3);

  // For social share links
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blog.slug}`;
  const encodedShareUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(blog.title);

  return (
    <>
      <main className="min-h-screen bg-white dark:bg-[#0a0a0a] pt-32 pb-20 transition-colors duration-300">

        {/* Top Section: Date & Title */}
        <div className="max-w-[1000px] mx-auto text-center px-6 mb-8">
          <p className="font-bold text-sm md:text-base text-black dark:text-white mb-4 uppercase tracking-wider">
            Published: {new Date(blog.created_at).toLocaleDateString('en-GB')}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white font-['Outfit'] leading-tight">
            {blog.title}
          </h1>
        </div>

        {/* Image Container with Dark Frame */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-0">
          <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-[#1a2035] dark:bg-[#111526] p-3 md:p-5 lg:p-6 rounded-[24px] md:rounded-[32px] lg:rounded-[40px] shadow-lg">
            <div className="relative w-full h-full rounded-[16px] md:rounded-[20px] lg:rounded-[24px] overflow-hidden">
              <Image
                src={blog.image_url || "/portfolio.png"}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black from-25% to-transparent pointer-events-none z-10" />
            </div>
          </div>
        </div>

        {/* Content Layout (Overlaps the image slightly) */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 mt-12 lg:-mt-32 items-start">

          {/* Social Icons / Share Button - Left Column */}
          <div className="flex lg:flex-col gap-6 w-full lg:w-16 shrink-0 items-center justify-center lg:justify-start lg:pt-40 z-20 order-2 lg:order-1">
            <BlogShareButton blog={blog} />
          </div>

          {/* Main Content - Center Column */}
          <article className="flex-1 bg-white dark:bg-[#0a0a0a] p-6 sm:p-10 lg:pt-14 lg:pr-14 rounded-[10px] z-10 relative min-h-[500px] order-1 lg:order-2">
            <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-gray-800 dark:prose-p:text-gray-300 prose-headings:font-['Outfit'] prose-headings:text-black dark:prose-headings:text-white prose-a:text-blue-500">
              {blog.content.split('\n').map((paragraph: string, i: number) => {
                const p = paragraph.trim();
                if (!p) return null;

                // Simple check if it's a heading based on the provided design where there's "Why do we use it?"
                // If it looks like a short question or heading, we could make it a heading.
                // For now, let's just use regular paragraphs.
                return <p key={i} className="mb-6 leading-relaxed">{p}</p>;
              })}
            </div>
          </article>

          {/* Sidebar - Right Column */}
          <aside className="w-full lg:w-[320px] lg:pt-40 shrink-0 z-10 order-3">
            {/* Search */}
            <BlogSearchInput />

            <h3 className="text-xl font-bold font-['Outfit'] text-black dark:text-white mb-6">
              Recent Blogs
            </h3>

            <div className="flex flex-col gap-4">
              {recentBlogs && recentBlogs.length > 0 ? (
                recentBlogs.map((recentBlog) => (
                  <Link href={`/blog/${recentBlog.slug}`} key={recentBlog.id} className="bg-[#f2f2f2] dark:bg-white/5 p-5 rounded-[16px] hover:bg-[#e5e5e5] dark:hover:bg-white/10 transition-colors block">
                    <p className="text-[#3b82f6] dark:text-[#60a5fa] text-sm font-medium leading-snug">
                      {recentBlog.title}
                    </p>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No other recent blogs.</p>
              )}
            </div>
          </aside>

        </div>
      </main>
    </>
  );
}
