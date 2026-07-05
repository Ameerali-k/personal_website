import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { FooterSection } from "@/components/FooterSection";
import { Search } from "lucide-react";

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
          
          {/* Social Icons - Left Column */}
          <div className="flex lg:flex-col gap-6 w-full lg:w-16 shrink-0 items-center justify-center lg:justify-start lg:pt-40 z-20 order-2 lg:order-1">
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedShareUrl}&title=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="text-black dark:text-white hover:text-blue-600 transition-colors">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${encodedShareUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="text-black dark:text-white hover:text-blue-400 transition-colors">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedShareUrl}`} target="_blank" rel="noopener noreferrer" className="text-black dark:text-white hover:text-green-500 transition-colors">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.756.458 3.473 1.332 4.985l-1.42 5.19 5.312-1.393c1.468.804 3.125 1.228 4.767 1.228 5.503 0 9.986-4.477 9.988-9.984 0-2.666-1.037-5.176-2.92-7.062-1.884-1.886-4.39-2.925-7.069-2.948zm5.578 14.167c-.23.644-1.334 1.233-1.841 1.282-.416.04-1.002.083-3.218-.836-2.65-1.101-4.343-3.805-4.476-3.984-.132-.178-1.069-1.42-1.069-2.71 0-1.29.67-1.927.907-2.19.237-.263.513-.33.684-.33.17 0 .34.004.492.011.164.008.384-.063.603.468.223.542.753 1.838.82 1.97.065.133.107.288.026.447-.08.158-.12.257-.243.394-.12.138-.258.293-.367.408-.12.128-.246.268-.11.503.136.236.605 1.002 1.298 1.62.898.801 1.651 1.05 1.887 1.183.236.133.376.107.518-.052.143-.16 .612-.712.776-.957.164-.244.327-.204.542-.124.215.08 1.353.638 1.584.754.231.116.386.173.442.27.056.096.056.564-.174 1.208z"/></svg>
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`} target="_blank" rel="noopener noreferrer" className="text-black dark:text-white hover:text-blue-700 transition-colors">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
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
            <div className="relative mb-10">
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full bg-[#f2f2f2] dark:bg-white/10 rounded-full py-3 pl-6 pr-12 text-sm text-black dark:text-white outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-[#00ff00]/50" 
              />
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-400 dark:text-blue-300 w-4 h-4" />
            </div>
            
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
