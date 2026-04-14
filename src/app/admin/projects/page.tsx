"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Trash2, Image as ImageIcon, X, LogOut, ExternalLink, Loader2 } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image_url: string;
  slug: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  // Thumbnail State
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [existingThumbnailUrl, setExistingThumbnailUrl] = useState("");

  // Gallery State
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [existingGalleryUrls, setExistingGalleryUrls] = useState<string[]>([]);

  useEffect(() => {
    checkUser();
    fetchProjects();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: true }); // Match Home order

    if (!error && data) {
      setProjects(data);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const handleEdit = (project: any) => {
    setEditingId(project.id);
    setTitle(project.title);
    setCategory(project.category);
    setDescription(project.description);
    setExistingThumbnailUrl(project.thumbnail_url || project.image_url || "");
    setThumbnailPreview(project.thumbnail_url || project.image_url || "");
    setExistingGalleryUrls(project.images || []);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setCategory("");
    setDescription("");
    setThumbnail(null);
    setThumbnailPreview(null);
    setExistingThumbnailUrl("");
    setImages([]);
    setPreviews([]);
    setExistingGalleryUrls([]);
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages(prev => [...prev, ...selectedFiles]);

      const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalThumbnailUrl = existingThumbnailUrl;
      const galleryUrls: string[] = [...existingGalleryUrls];

      // 1. Upload Thumbnail if changed
      if (thumbnail) {
        const fileExt = thumbnail.name.split('.').pop();
        const fileName = `thumb-${Math.random()}.${fileExt}`;
        const filePath = `project-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("projects")
          .upload(filePath, thumbnail);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("projects")
          .getPublicUrl(filePath);

        finalThumbnailUrl = publicUrl;
      }

      // 2. Upload Gallery Images
      for (const img of images) {
        const fileExt = img.name.split('.').pop();
        const fileName = `gallery-${Math.random()}.${fileExt}`;
        const filePath = `project-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("projects")
          .upload(filePath, img);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("projects")
          .getPublicUrl(filePath);

        galleryUrls.push(publicUrl);
      }

      const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

      const projectData = {
        title,
        category,
        description,
        thumbnail_url: finalThumbnailUrl,
        image_url: finalThumbnailUrl,
        images: galleryUrls,
        slug
      };

      if (editingId) {
        const { error } = await supabase.from("projects").update(projectData).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert([projectData]);
        if (error) throw error;
      }

      resetForm();
      setIsModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      console.error(err);
      alert(`Error saving project: ${err.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProject = async (id: number, thumbUrl: string, allImages: any[] = []) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      // 1. Collect all storage paths to delete
      const pathsToDelete: string[] = [];

      // Add thumbnail path
      if (thumbUrl) {
        const thumbName = thumbUrl.split('/').pop();
        if (thumbName) pathsToDelete.push(`project-images/${thumbName}`);
      }

      // Add all gallery image paths
      if (Array.isArray(allImages)) {
        allImages.forEach(url => {
          if (url) {
            const fileName = url.split('/').pop();
            if (fileName) pathsToDelete.push(`project-images/${fileName}`);
          }
        });
      }

      // 2. Perform bulk delete from Supabase storage
      if (pathsToDelete.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("projects")
          .remove(pathsToDelete);

        if (storageError) {
          console.warn("Storage cleanup error (some files might still exist):", storageError.message);
        }
      }

      // 3. Delete project record from database
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;

      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Error deleting project");
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0e1a] text-white p-4 sm:p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 md:mb-12">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Dashboard
            </h1>
            <p className="text-white/40 mt-1 text-sm md:text-base">Manage your portfolio projects</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => { resetForm(); setIsModalOpen(true); }}
              className="flex-1 sm:flex-none px-4 md:px-6 py-2.5 md:py-3 bg-[#00ff00] hover:bg-[#00dd00] text-black text-sm md:text-base font-bold rounded-xl md:rounded-2xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,0,0.1)]"
            >
              <Plus size={18} />
              Add Project
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 md:p-3 bg-white/5 hover:bg-white/10 rounded-xl md:rounded-2xl border border-white/10 transition-all text-white/60 hover:text-white"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-[#00ff00]" size={40} />
            <p className="text-white/40">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 md:py-20 bg-white/5 border border-dashed border-white/10 rounded-[28px] md:rounded-[32px]">
            <p className="text-white/40 px-6">No projects found. Start by adding one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {projects.map((project) => (
              <motion.div
                layout
                key={project.id}
                className="group bg-white/5 border border-white/10 rounded-[24px] md:rounded-[32px] overflow-hidden hover:border-[#00ff00]/30 transition-all"
              >
                <div className="aspect-video relative overflow-hidden bg-black/40">
                  <img src={project.thumbnail_url || project.image_url || "/branding.svg"} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 md:p-6 gap-3">
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2.5 md:p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all ml-auto"
                    >
                      <ExternalLink size={16} />
                    </button>
                    <button
                      onClick={() => deleteProject(project.id, project.thumbnail_url || project.image_url, project.images)}
                      className="p-2.5 md:p-3 bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {project.category.split(',').map((cat: string, i: number) => (
                      <span key={i} className="text-[#00ff00] text-[10px] md:text-xs font-bold uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-md">
                        {cat.trim()}
                      </span>
                    ))}
                  </div>
                    <span className="text-white/30 text-[9px] md:text-[10px] uppercase font-bold">{project.images?.length || 0} Gallery</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mt-2 font-['Outfit'] line-clamp-1">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

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
                <h2 className="text-xl md:text-2xl font-bold font-['Outfit']">{editingId ? "Edit Project" : "Add Project"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-5 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-medium text-white/60 ml-1">Title</label>
                    <input required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 py-2.5 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-[#00ff00]/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm font-medium text-white/60 ml-1">Category</label>
                    <input required value={category} placeholder="Branding, Website, UI/UX" onChange={(e) => setCategory(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 py-2.5 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-[#00ff00]/50" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-medium text-white/60 ml-1">Description</label>
                  <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 py-2.5 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-[#00ff00]/50 resize-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-medium text-[#00ff00] ml-1">Thumbnail</label>
                  <div className="relative cursor-pointer group w-full aspect-[21/9] rounded-xl md:rounded-2xl overflow-hidden border border-dashed border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center">
                    <input type="file" accept="image/*" onChange={handleThumbnailChange} className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" />
                    {thumbnailPreview ? (
                      <img src={thumbnailPreview} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center">
                        <ImageIcon className="text-white/20 mb-1 md:mb-2" size={28} />
                        <span className="text-[10px] md:text-xs text-white/40">Upload Thumbnail</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-medium text-white/60 ml-1">Gallery</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4">
                    {existingGalleryUrls.map((url, i) => (
                      <div key={`existing-${i}`} className="aspect-square relative rounded-lg md:rounded-xl overflow-hidden border border-white/10 opacity-70">
                        <img src={url} className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {previews.map((url, i) => (
                      <div key={`preview-${i}`} className="aspect-square relative rounded-lg md:rounded-xl overflow-hidden border border-white/10">
                        <img src={url} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeImage(i)} className="absolute top-0.5 right-0.5 md:top-1 md:right-1 p-1 bg-red-500 rounded-full text-white"><X size={10} /></button>
                      </div>
                    ))}
                    <div className="aspect-square relative cursor-pointer border border-dashed border-white/20 rounded-lg md:rounded-xl flex items-center justify-center hover:bg-white/5">
                      <input type="file" multiple accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                      <Plus size={18} className="text-white/20" />
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting || (!thumbnailPreview && !editingId)} className="w-full bg-[#00ff00] hover:bg-[#00dd00] text-black font-bold py-3 md:py-4 rounded-xl md:rounded-2xl transition-all disabled:opacity-50">
                  {isSubmitting ? <Loader2 className="animate-spin m-auto" size={20} /> : (editingId ? "Update" : "Save")}
                </button>
              </form>
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
      `}</style>
    </div>
  );
}
