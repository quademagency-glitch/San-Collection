import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    orderBy: { name: 'asc' },
    include: {
      category: true,
      collections: true
    }
  });

  return (
    <div className="space-y-8">
      <div className="glass-card p-8 rounded-2xl border border-glass-border shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-widest text-white uppercase mb-1">
            Inventory Management
          </h1>
          <p className="text-sm text-gray-400">Manage your premium product catalog.</p>
        </div>
        <button className="px-6 py-3 bg-white text-black font-bold tracking-widest uppercase text-xs rounded-lg hover:bg-gray-200 transition-colors">
          + Add Asset
        </button>
      </div>

      <div className="glass-card rounded-2xl border border-glass-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-glass-border">
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Product</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Price</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Stock</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 flex items-center space-x-4">
                    <div className="w-12 h-12 rounded overflow-hidden bg-gray-900 border border-gray-800 shrink-0">
                      {product.images[0] && (
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category?.name || 'Uncategorized'}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gold font-mono">{product.price.toFixed(2)} GHS</td>
                  <td className="p-4 text-gray-300 font-mono">{product.stock} units</td>
                  <td className="p-4">
                    <button className="text-xs text-neon-cyan hover:text-white uppercase tracking-widest font-bold">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
