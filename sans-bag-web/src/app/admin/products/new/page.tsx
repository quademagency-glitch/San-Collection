import { prisma } from "@/lib/prisma";
import { createProduct } from "@/app/actions/product";
import Link from "next/link";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany();
  const collections = await prisma.collection.findMany();

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="glass-card p-8 rounded-2xl border border-glass-border shadow-lg">
        <div className="flex items-center gap-4 mb-2">
          <Link href="/admin/products" className="text-gray-400 hover:text-white transition-colors">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold tracking-widest text-white uppercase">
            Add New Asset
          </h1>
        </div>
        <p className="text-sm text-gray-400">Mint a new product to the global catalog.</p>
      </div>

      <div className="glass-card p-8 rounded-2xl border border-glass-border shadow-lg relative overflow-hidden">
        <form action={createProduct} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Asset Name</label>
              <input 
                name="name"
                type="text" 
                required
                className="w-full bg-black/40 border border-glass-border rounded-xl p-4 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Price (GHS)</label>
              <input 
                name="price"
                type="number" 
                step="0.01"
                required
                className="w-full bg-black/40 border border-glass-border rounded-xl p-4 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Description</label>
            <textarea 
              name="description"
              required
              className="w-full h-32 resize-none bg-black/40 border border-glass-border rounded-xl p-4 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all duration-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Category</label>
              <select 
                name="categoryId"
                className="w-full bg-black/40 border border-glass-border rounded-xl p-4 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all duration-300 appearance-none"
              >
                <option value="">Uncategorized</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Collection</label>
              <select 
                name="collectionId"
                className="w-full bg-black/40 border border-glass-border rounded-xl p-4 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all duration-300 appearance-none"
              >
                <option value="">No Collection</option>
                {collections.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Stock Units</label>
              <input 
                name="stock"
                type="number" 
                defaultValue="10"
                required
                className="w-full bg-black/40 border border-glass-border rounded-xl p-4 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Image URL</label>
              <input 
                name="imageUrl"
                type="url" 
                placeholder="https://unsplash.com/..."
                className="w-full bg-black/40 border border-glass-border rounded-xl p-4 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all duration-300"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-glass-border">
            <button 
              type="submit"
              className="px-8 py-4 bg-white text-black font-bold tracking-widest hover:opacity-90 transition-opacity rounded-xl uppercase shadow-lg"
            >
              Mint Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
