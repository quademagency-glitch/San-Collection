import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AccountDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect('/login');
  }

  if ((session.user as any).role === 'ADMIN') {
    redirect('/admin');
  }

  const userId = (session.user as any).id;

  const recentOrders = await prisma.order.findMany({
    where: { user_id: userId },
    orderBy: { created_at: 'desc' },
    take: 3,
  });

  return (
    <div className="space-y-8">
      <div className="glass-card p-8 rounded-2xl border border-glass-border shadow-lg">
        <h1 className="text-3xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 uppercase mb-2">
          Welcome, {session.user.name || 'Guest'}
        </h1>
        <p className="text-gray-400">View your digital inventory and physical delivery status.</p>
      </div>

      <div className="glass-card p-8 rounded-2xl border border-glass-border shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/10 rounded-full blur-[50px] pointer-events-none"></div>
        <h2 className="text-xl font-bold text-white mb-6 tracking-widest uppercase flex items-center">
          <span className="w-2 h-2 rounded-full bg-neon-cyan mr-3 glow-cyan"></span>
          Recent Transactions
        </h2>

        {recentOrders.length === 0 ? (
          <p className="text-gray-400">No recent transactions found.</p>
        ) : (
          <div className="space-y-4 relative z-10">
            {recentOrders.map(order => (
              <div key={order.id} className="flex justify-between items-center p-4 bg-black/40 border border-gray-800 rounded-xl">
                <div>
                  <p className="text-sm text-gray-400 font-mono mb-1">{order.id}</p>
                  <p className="text-white font-bold">{order.total.toFixed(2)} GHS</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${order.status === 'PAID' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'}`}>
                  {order.status}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 relative z-10">
          <Link href="/account/orders" className="text-neon-cyan hover:text-white transition-colors text-sm font-bold tracking-widest uppercase glow-cyan">
            View All History →
          </Link>
        </div>
      </div>
    </div>
  );
}
