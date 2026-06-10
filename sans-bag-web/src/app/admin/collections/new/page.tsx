import { createCollection } from "@/app/actions/collection";
import Link from "next/link";

export default function NewCollectionPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div className="glass-card p-8 rounded-2xl border border-glass-border shadow-lg">
        <div className="flex items-center gap-4 mb-2">
          <Link href="/admin/collections" className="text-gray-400 hover:text-white transition-colors">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold tracking-widest text-white uppercase">
            Add New Collection
          </h1>
        </div>
        <p className="text-sm text-gray-400">Create a new grouping for your products.</p>
      </div>

      <div className="glass-card p-8 rounded-2xl border border-glass-border shadow-lg relative overflow-hidden">
        <form action={createCollection} className="space-y-6 relative z-10">
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Collection Name</label>
            <input 
              name="name"
              type="text" 
              required
              className="w-full bg-black/40 border border-glass-border rounded-xl p-4 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Banner Image URL</label>
            <input 
              name="banner_image"
              type="url" 
              placeholder="https://unsplash.com/..."
              className="w-full bg-black/40 border border-glass-border rounded-xl p-4 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all duration-300"
            />
          </div>

          <div className="pt-6 border-t border-glass-border">
            <button 
              type="submit"
              className="px-8 py-4 bg-white text-black font-bold tracking-widest hover:opacity-90 transition-opacity rounded-xl uppercase shadow-lg"
            >
              Save Collection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
