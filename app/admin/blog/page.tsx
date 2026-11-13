import { prisma } from "@/lib/prisma";
import { createBlogPost, deleteBlogPost } from "./actions";
import { Trash2, FileText, PenTool } from "lucide-react";

export default async function BlogAdminPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-brand-dark mb-8">Manage Blog Posts</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form to add new post */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
          <h2 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2">
            <PenTool className="w-5 h-5 text-brand-primary" /> Write New Article
          </h2>
          <form action={createBlogPost} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Article Title</label>
              <input type="text" name="title" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none" placeholder="e.g. How to score 95 in Accountancy" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Short Excerpt (For preview)</label>
              <textarea name="excerpt" required rows={2} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none" placeholder="A brief summary of the article..." />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Full Content</label>
              <textarea name="content" required rows={8} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none" placeholder="Write your article here..." />
            </div>
            <button type="submit" className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-md">
              Publish Article
            </button>
          </form>
        </div>

        {/* List of published posts */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-brand-dark mb-4">Published Articles</h2>
          {posts.length === 0 ? (
            <p className="text-slate-500 bg-white p-6 rounded-2xl border border-slate-200 text-center">No articles written yet.</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-brand-dark text-lg leading-tight">{post.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">Slug: /blog/{post.slug}</p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm mt-3 line-clamp-2">{post.excerpt}</p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
                  <form action={deleteBlogPost}>
                    <input type="hidden" name="id" value={post.id} />
                    <button type="submit" className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}