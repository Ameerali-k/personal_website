"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Trash2, Image as ImageIcon, X, LogOut, ExternalLink, Loader2 } from "lucide-react";
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/lib/cropImage';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Thumbnail State
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [existingThumbnailUrl, setExistingThumbnailUrl] = useState("");

  // Crop State
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [rawThumbnailUrl, setRawThumbnailUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);

  useEffect(() => {
    checkUser();
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (isModalOpen || isCropModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, isCropModalOpen]);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setBlogs(data);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const handleEdit = (blog: any) => {
    setEditingId(blog.id);
    setTitle(blog.title);
    setSlug(blog.slug || "");
    setDescription(blog.description);
    setContent(blog.content);
    setIsActive(blog.is_active !== false);
    setExistingThumbnailUrl(blog.image_url || "");
    setThumbnailPreview(blog.image_url || "");
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setDescription("");
    setContent("");
    setIsActive(true);
    setThumbnail(null);
    setThumbnailPreview(null);
    setExistingThumbnailUrl("");
    setRawThumbnailUrl(null);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setRawThumbnailUrl(URL.createObjectURL(file));
      setIsCropModalOpen(true);
      e.target.value = '';
    }
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropSave = async () => {
    if (!rawThumbnailUrl || !croppedAreaPixels) return;
    setIsCropping(true);
    try {
      const croppedFile = await getCroppedImg(rawThumbnailUrl, croppedAreaPixels);
      if (croppedFile) {
        setThumbnail(croppedFile);
        setThumbnailPreview(URL.createObjectURL(croppedFile));
        setIsCropModalOpen(false);
      }
    } catch (e) {
      console.error(e);
      setActionError("Failed to crop image.");
    } finally {
      setIsCropping(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalThumbnailUrl = existingThumbnailUrl;

      // 1. Upload Thumbnail if changed
      if (thumbnail) {
        const fileExt = thumbnail.name.split('.').pop();
        const fileName = `blog-thumb-${Math.random()}.${fileExt}`;
        const filePath = `blog-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("projects") // Reuse the 'projects' bucket or change if you create a 'blogs' bucket
          .upload(filePath, thumbnail);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("projects")
          .getPublicUrl(filePath);

        finalThumbnailUrl = publicUrl;
      }

      const finalSlug = slug.trim() !== "" 
        ? slug.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
        : title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

      const blogData = {
        title,
        description,
        content,
        image_url: finalThumbnailUrl,
        slug: finalSlug,
        is_active: isActive
      };

      if (editingId) {
        const { error } = await supabase.from("blogs").update(blogData).eq("id", editingId);
        if (error) throw new Error(`Database Update Error: ${error.message} (Code: ${error.code})`);
      } else {
        const { error } = await supabase.from("blogs").insert([blogData]);
        if (error) throw new Error(`Database Insert Error: ${error.message} (Code: ${error.code})`);
      }

      resetForm();
      setIsModalOpen(false);
      fetchBlogs();
    } catch (err: any) {
      // Intentionally NOT using console.error here so Next.js doesn't show the full screen overlay
      setActionError(`${err.message || JSON.stringify(err)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteBlog = async (id: number, thumbUrl: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      if (thumbUrl) {
        const thumbName = thumbUrl.split('/').pop();
        if (thumbName) {
          const { error: storageError } = await supabase.storage
            .from("projects")
            .remove([`blog-images/${thumbName}`]);
          if (storageError) {
            console.warn("Storage cleanup error:", storageError.message);
          }
        }
      }

      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (error) throw error;

      fetchBlogs();
    } catch (err) {
      console.error(err);
      setActionError("Error deleting blog. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0e1a] text-white">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-12">
        <AnimatePresence>
          {actionError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-between gap-4"
              role="alert"
            >
              <p className="text-red-400 text-sm font-medium">{actionError}</p>
              <button onClick={() => setActionError(null)} className="text-red-400 hover:text-red-300 flex-shrink-0">
                <X size={16} aria-hidden="true" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 md:mb-12">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Dashboard
            </h1>
            <div className="flex items-center justify-center sm:justify-start gap-4 mt-3 mb-1">
              <a href="/admin/projects" className="text-white/50 hover:text-white transition-colors pb-1">Projects</a>
              <span className="text-[#00ff00] font-medium border-b border-[#00ff00] pb-1">Blogs</span>
            </div>
            <p className="text-white/40 mt-1 text-sm md:text-base">Manage your blog posts</p>
          </div>
          
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => { resetForm(); setIsModalOpen(true); }}
              className="flex-1 sm:flex-none px-4 md:px-6 py-2.5 md:py-3 bg-[#00ff00] hover:bg-[#00dd00] text-black text-sm md:text-base font-bold rounded-xl md:rounded-2xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,0,0.1)]"
            >
              <Plus size={18} />
              Add Post
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 md:p-3 bg-white/5 hover:bg-white/10 rounded-xl md:rounded-2xl border border-white/10 transition-all text-white/60 hover:text-white"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-[#00ff00]" size={40} />
            <p className="text-white/40">Loading blogs...</p>
          </div>
        )}
        {!loading && blogs.length === 0 && (
          <div className="text-center py-16 md:py-20 bg-white/5 border border-dashed border-white/10 rounded-[28px] md:rounded-[32px]">
            <p className="text-white/40 px-6">No blogs found. Start by writing one!</p>
          </div>
        )}
      </div>

      {/* Full-width scrollable cards area */}
      {!loading && blogs.length > 0 && (
        <div className="w-full flex flex-row justify-center gap-4 md:gap-6 overflow-x-auto px-4 sm:px-6 md:px-12 pb-6 snap-x snap-mandatory hide-scrollbar">
          {blogs.map((blog) => (
            <motion.div
              layout
              key={blog.id}
              className="group bg-white/5 border border-white/10 rounded-[24px] md:rounded-[32px] overflow-hidden hover:border-[#00ff00]/30 transition-all flex flex-col flex-shrink-0 w-[300px] md:w-[340px] snap-start"
            >
                <div className="aspect-video relative overflow-hidden bg-black/40">
                  <img src={blog.image_url || "/branding.svg"} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg backdrop-blur-md border ${
                      blog.is_active !== false 
                        ? 'bg-[#00ff00]/20 text-[#00ff00] border-[#00ff00]/30' 
                        : 'bg-red-500/20 text-red-400 border-red-500/30'
                    }`}>
                      {blog.is_active !== false ? 'Active' : 'Disabled'}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 md:p-6 gap-3">
                    <button
                      onClick={() => handleEdit(blog)}
                      aria-label={`Edit ${blog.title}`}
                      className="p-2.5 md:p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all ml-auto"
                    >
                      <ExternalLink size={16} aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => deleteBlog(blog.id, blog.image_url)}
                      aria-label={`Delete ${blog.title}`}
                      className="p-2.5 md:p-3 bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all"
                    >
                      <Trash2 size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="p-5 md:p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mt-2 font-['Outfit'] line-clamp-2">{blog.title}</h3>
                    <p className="text-white/50 text-sm mt-2 line-clamp-2">{blog.description}</p>
                  </div>
                  <div className="mt-4 text-white/30 text-[11px] md:text-xs">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="w-full max-w-2xl bg-[#141827] border border-white/10 rounded-[28px] md:rounded-[40px] shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-5 md:p-8 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold font-['Outfit']">{editingId ? "Edit Blog" : "Add Blog"}</h2>
                <button onClick={() => setIsModalOpen(false)} aria-label="Close modal" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-5 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-medium text-white/60 ml-1">Title</label>
                  <input required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 py-2.5 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-[#00ff00]/50" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-medium text-white/60 ml-1">Slug (optional)</label>
                  <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Leave blank to auto-generate from title" className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 py-2.5 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-[#00ff00]/50" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-medium text-[#00ff00] ml-1">Cover Image</label>
                  <div className="relative cursor-pointer group w-full aspect-[21/9] rounded-xl md:rounded-2xl overflow-hidden border border-dashed border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center">
                    <input type="file" accept="image/*" onChange={handleThumbnailChange} className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" />
                    {thumbnailPreview ? (
                      <>
                        <img src={thumbnailPreview} className="w-full h-full object-cover pointer-events-none" />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setRawThumbnailUrl(thumbnailPreview);
                            setIsCropModalOpen(true);
                          }}
                          className="absolute top-2 right-2 z-20 px-3 py-1.5 bg-black/60 hover:bg-black/90 backdrop-blur-sm text-white text-xs font-bold rounded-lg transition-all flex items-center gap-2 opacity-0 group-hover:opacity-100"
                        >
                          <ImageIcon size={14} />
                          Adjust Crop
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center">
                        <ImageIcon className="text-white/20 mb-1 md:mb-2" size={28} />
                        <span className="text-[10px] md:text-xs text-white/40">Upload Cover Image</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-medium text-white/60 ml-1">Short Description (Excerpt)</label>
                  <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 py-2.5 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-[#00ff00]/50 resize-none" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-medium text-white/60 ml-1">Full Content</label>
                  <textarea required value={content} onChange={(e) => setContent(e.target.value)} rows={6} className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 py-2.5 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-[#00ff00]/50" />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl">
                  <div>
                    <p className="text-sm font-medium text-white">Status</p>
                    <p className="text-xs text-white/50">Determine if this blog is visible on the website</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsActive(!isActive)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isActive ? 'bg-[#00ff00]' : 'bg-white/20'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <button type="submit" disabled={isSubmitting || (!thumbnailPreview && !editingId)} className="w-full bg-[#00ff00] hover:bg-[#00dd00] text-black font-bold py-3 md:py-4 rounded-xl md:rounded-2xl transition-all disabled:opacity-50">
                  {isSubmitting ? <Loader2 className="animate-spin m-auto" size={20} /> : (editingId ? "Update Blog" : "Publish Blog")}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCropModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl bg-[#141827] border border-white/10 rounded-[28px] shadow-2xl relative z-10 overflow-hidden flex flex-col h-[80vh]"
            >
              <div className="p-5 border-b border-white/10 flex items-center justify-between shrink-0">
                <h2 className="text-xl font-bold font-['Outfit'] text-white">Crop Cover Image</h2>
                <button type="button" onClick={() => setIsCropModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="relative flex-1 w-full bg-black touch-none overscroll-none">
                {rawThumbnailUrl && (
                  <Cropper
                    image={rawThumbnailUrl}
                    crop={crop}
                    zoom={zoom}
                    aspect={1.25}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                )}
              </div>

              <div className="p-5 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4 shrink-0">
                <div className="w-full sm:w-1/2 flex items-center gap-3">
                  <span className="text-xs text-white/50">Zoom</span>
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleCropSave}
                  disabled={isCropping}
                  className="w-full sm:w-auto sm:ml-auto px-6 py-2.5 bg-[#00ff00] hover:bg-[#00dd00] text-black font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center"
                >
                  {isCropping ? <Loader2 className="animate-spin w-5 h-5" /> : "Crop & Save"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 255, 0, 0.2); border-radius: 10px; }
        @media (min-width: 768px) {
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
