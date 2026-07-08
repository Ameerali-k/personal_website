import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import BlogSearchInput from "../BlogSearchInput";

export const revalidate = 0;

export default async function BlogSearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";

  let blogs: any[] = [];
  
  if (query) {
    const { data } = await supabase
      .from("blogs")
      .select("*")
      .eq("is_active", true)
      .ilike("title", `%${query}%`)
      .order("created_at", { ascending: false });
      
    if (data) {
      blogs = data;
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] pt-32 pb-20 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-12 text-center max-w-[600px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white font-['Outfit'] mb-4">
            Search Results
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {query ? `Showing results for "${query}"` : "Please enter a search term"}
          </p>
          
          <BlogSearchInput />
        </div>

        {blogs.length === 0 && query ? (
          <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-[24px] border border-gray-100 dark:border-white/10">
            <p className="text-gray-500 text-lg">No blogs found matching your search.</p>
            <Link href="/" className="mt-6 inline-block px-8 py-3 bg-[#00ff00] hover:bg-[#00dd00] text-black font-bold rounded-full transition-colors">
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((item) => (
              <Link href={`/blog/${item.slug}`} key={item.id} className="block group">
                <div className="relative w-full h-[400px] rounded-[20px] overflow-hidden border-[5px] border-black dark:border-white flex flex-col justify-end p-6 bg-white dark:bg-black transition-transform duration-300 hover:-translate-y-2 shadow-lg hover:shadow-xl">
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                      src={item.image_url || "/portfolio.png"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-black dark:via-black/80 dark:to-transparent"></div>
                  <div className="relative z-20 flex flex-col mt-auto pointer-events-none">
                    <h3 className="text-black dark:text-white text-lg font-bold leading-tight uppercase mb-3" title={item.title}>
                      {item.title?.length > 40 ? item.title.substring(0, 40) + '...' : item.title}
                    </h3>
                    <p className="text-gray-700 dark:text-[#d0d0d0] text-xs leading-relaxed mb-6 drop-shadow-md line-clamp-3">
                      {item.description}
                    </p>
                    <div>
                      <div className="pointer-events-auto bg-[#00ff00] hover:bg-[#00cc00] transition-colors text-black text-xs font-bold px-4 py-1.5 rounded-full inline-flex items-center gap-1 shadow-sm">
                        Read More
                        <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
