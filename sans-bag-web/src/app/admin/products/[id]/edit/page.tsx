import { prisma } from "@/lib/prisma";
import { updateProduct } from "@/app/actions/product";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { collections: true }
  });

  if (!product) notFound();

  const categories = await prisma.category.findMany();
  const collections = await prisma.collection.findMany();

  // Create an update action bound to this specific product ID
  const updateProductWithId = updateProduct.bind(null, product.id);

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="glass-card p-8 rounded-2xl border border-glass-border shadow-lg">
        <div className="flex items-center gap-4 mb-2">
          <Link href="/admin/products" className="text-gray-400 hover:text-white transition-colors">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold tracking-widest text-white uppercase">
            Edit Product
          </h1>
        </div>
        <p className="text-sm text-gray-400">Update details for {product.name}.</p>
      </div>

      <div className="glass-card p-8 rounded-2xl border border-glass-border shadow-lg relative overflow-hidden">
        <form action={updateProductWithId} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Product Name</label>
              <input 
                name="name"
                type="text" 
                defaultValue={product.name}
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
                defaultValue={product.price}
                required
                className="w-full bg-black/40 border border-glass-border rounded-xl p-4 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Compare at Price (GHS)</label>
              <input 
                name="compareAtPrice"
                type="number" 
                step="0.01"
                defaultValue={product.compare_at_price || ''}
                placeholder="Optional discount"
                className="w-full bg-black/40 border border-glass-border rounded-xl p-4 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Description</label>
            <textarea 
              name="description"
              required
              defaultValue={product.description || ''}
              className="w-full h-32 resize-none bg-black/40 border border-glass-border rounded-xl p-4 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all duration-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Category</label>
              <select 
                name="categoryId"
                defaultValue={product.category_id || ''}
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
                defaultValue={product.collections[0]?.id || ''}
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
                defaultValue={product.stock}
                required
                className="w-full bg-black/40 border border-glass-border rounded-xl p-4 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Image URL</label>
              <input 
                name="imageUrl"
                type="url" 
                defaultValue={product.images[0] || ''}
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
