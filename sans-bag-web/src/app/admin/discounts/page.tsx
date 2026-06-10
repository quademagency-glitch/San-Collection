import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDiscounts() {
  const coupons = await prisma.coupon.findMany();

  return (
    <div className="space-y-8">
      <div className="glass-card p-8 rounded-2xl border border-glass-border shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-widest text-white uppercase mb-1">
            Discounts & Coupons
          </h1>
          <p className="text-sm text-gray-400">Manage your promotional codes.</p>
        </div>
        <Link href="/admin/discounts/new" className="px-6 py-3 bg-white text-black font-bold tracking-widest uppercase text-xs rounded-lg hover:bg-gray-200 transition-colors">
          + Add Discount
        </Link>
      </div>

      <div className="glass-card rounded-2xl border border-glass-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-glass-border">
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Code</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Discount</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Uses</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {coupons.map((coupon) => {
                const isExpired = coupon.expiry && new Date() > coupon.expiry;
                const isActive = !isExpired;

                return (
                  <tr key={coupon.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono font-bold text-white">{coupon.code}</td>
                    <td className="p-4 text-gray-300 font-mono">
                      {coupon.discount_type === 'PERCENTAGE' ? `${coupon.value}% OFF` : `${coupon.value} GHS OFF`}
                    </td>
                    <td className="p-4 text-gray-500 font-mono text-sm">
                      {coupon.usage_limit ? `Max ${coupon.usage_limit}` : 'Unlimited'}
                    </td>
                    <td className="p-4">
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${isActive ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
                        {isActive ? 'Active' : 'Expired'}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
