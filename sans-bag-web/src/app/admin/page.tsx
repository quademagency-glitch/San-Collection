import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const totalUsers = await prisma.user.count();
  const totalProducts = await prisma.product.count();
  
  const orders = await prisma.order.findMany({
    where: { status: 'PAID' }
  });
  
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="space-y-8">
      <div className="glass-card p-8 rounded-2xl border border-glass-border shadow-lg">
        <h1 className="text-3xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 uppercase mb-2">
          Operations Overview
        </h1>
        <p className="text-gray-400">High-level metrics for San's Bag global network.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-glass-border">
          <p className="text-xs text-neon-cyan uppercase tracking-widest mb-2 glow-cyan">Total Revenue</p>
          <p className="text-3xl font-mono text-white">{totalRevenue.toFixed(2)} GHS</p>
        </div>
        
        <div className="glass-card p-6 rounded-2xl border border-glass-border">
          <p className="text-xs text-neon-purple uppercase tracking-widest mb-2 glow-purple">Active Products</p>
          <p className="text-3xl font-mono text-white">{totalProducts}</p>
        </div>
        
        <div className="glass-card p-6 rounded-2xl border border-glass-border">
          <p className="text-xs text-gold uppercase tracking-widest mb-2 glow-gold">Registered Patrons</p>
          <p className="text-3xl font-mono text-white">{totalUsers}</p>
        </div>
      </div>
    </div>
  );
}
