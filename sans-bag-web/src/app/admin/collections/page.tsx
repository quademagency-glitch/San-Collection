import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminCollections() {
  const collections = await prisma.collection.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: { products: true }
      }
    }
  });

  return (
    <div className="space-y-8">
      <div className="glass-card p-8 rounded-2xl border border-glass-border shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-widest text-white uppercase mb-1">
            Collections
          </h1>
          <p className="text-sm text-gray-400">Manage your product groupings.</p>
        </div>
        <Link href="/admin/collections/new" className="px-6 py-3 bg-white text-black font-bold tracking-widest uppercase text-xs rounded-lg hover:bg-gray-200 transition-colors">
          + Add Collection
        </Link>
      </div>

      <div className="glass-card rounded-2xl border border-glass-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-glass-border">
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Collection</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Products</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Slug</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {collections.map((collection) => (
                <tr key={collection.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 flex items-center space-x-4">
                    <div className="w-12 h-12 rounded overflow-hidden bg-gray-900 border border-gray-800 shrink-0">
                      {collection.banner_image && (
                        <img src={collection.banner_image} alt={collection.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium">{collection.name}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300 font-mono">{collection._count.products} products</td>
                  <td className="p-4 text-gray-500 font-mono text-sm">{collection.slug}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
