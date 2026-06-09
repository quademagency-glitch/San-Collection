import { prisma } from "@/lib/prisma";

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    orderBy: { created_at: 'desc' },
    include: {
      user: true,
    }
  });

  return (
    <div className="space-y-8">
      <div className="glass-card p-8 rounded-2xl border border-glass-border shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-widest text-white uppercase mb-1">
            Transaction History
          </h1>
          <p className="text-sm text-gray-400">View all orders across the global network.</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-glass-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-glass-border">
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Order ID</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono text-sm text-gray-300">{order.id}</td>
                  <td className="p-4">
                    <p className="text-white font-medium">{order.user.name}</p>
                    <p className="text-xs text-gray-500">{order.user.email}</p>
                  </td>
                  <td className="p-4 text-sm text-gray-400">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-gold font-mono">{order.total.toFixed(2)} GHS</td>
                  <td className="p-4">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${order.status === 'PAID' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'}`}>
                      {order.status}
                    </div>
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
