import { createDiscount } from "@/app/actions/discount";
import Link from "next/link";

export default function NewDiscountPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div className="glass-card p-8 rounded-2xl border border-glass-border shadow-lg">
        <div className="flex items-center gap-4 mb-2">
          <Link href="/admin/discounts" className="text-gray-400 hover:text-white transition-colors">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold tracking-widest text-white uppercase">
            Add New Discount
          </h1>
        </div>
        <p className="text-sm text-gray-400">Generate a new promotional code for your customers.</p>
      </div>

      <div className="glass-card p-8 rounded-2xl border border-glass-border shadow-lg relative overflow-hidden">
        <form action={createDiscount} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Discount Code</label>
              <input 
                name="code"
                type="text" 
                placeholder="e.g. SUMMER20"
                required
                className="w-full bg-black/40 border border-glass-border rounded-xl p-4 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all duration-300 uppercase"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Discount Type</label>
              <select 
                name="type"
                required
                className="w-full bg-black/40 border border-glass-border rounded-xl p-4 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all duration-300 appearance-none"
              >
                <option value="PERCENTAGE">Percentage (%)</option>
                <option value="FIXED">Fixed Amount (GHS)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Discount Value</label>
              <input 
                name="value"
                type="number" 
                step="0.01"
                required
                className="w-full bg-black/40 border border-glass-border rounded-xl p-4 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Max Uses (Optional)</label>
              <input 
                name="max_uses"
                type="number" 
                placeholder="Leave blank for unlimited"
                className="w-full bg-black/40 border border-glass-border rounded-xl p-4 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Expiry Date (Optional)</label>
            <input 
              name="expires_at"
              type="datetime-local" 
              className="w-full bg-black/40 border border-glass-border rounded-xl p-4 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all duration-300"
            />
          </div>

          <div className="pt-6 border-t border-glass-border">
            <button 
              type="submit"
              className="px-8 py-4 bg-white text-black font-bold tracking-widest hover:opacity-90 transition-opacity rounded-xl uppercase shadow-lg"
            >
              Generate Discount
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
