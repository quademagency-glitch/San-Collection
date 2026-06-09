import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AccountOrders() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect('/login');
  }

  const userId = (session.user as any).id;

  const orders = await prisma.order.findMany({
    where: { user_id: userId },
    orderBy: { created_at: 'desc' },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  return (
    <div className="space-y-8">
      <div className="glass-card p-8 rounded-2xl border border-glass-border shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/10 rounded-full blur-[50px] pointer-events-none"></div>
        <h2 className="text-xl font-bold text-white mb-6 tracking-widest uppercase flex items-center">
          <span className="w-2 h-2 rounded-full bg-neon-purple mr-3 glow-purple"></span>
          Order History
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-400">You haven't made any purchases yet.</p>
        ) : (
          <div className="space-y-6 relative z-10">
            {orders.map(order => (
              <div key={order.id} className="bg-black/40 border border-gray-800 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-white/5">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Transaction Ref</p>
                    <p className="text-sm text-gray-300 font-mono">{order.id}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${order.status === 'PAID' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'}`}>
                    {order.status}
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-900 rounded flex items-center justify-center overflow-hidden border border-gray-800">
                          {item.product.images[0] && (
                            <img src={item.product.images[0]} alt={item.product.name} className="object-cover w-full h-full opacity-80" />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">{item.product.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-gold font-mono">{(item.unit_price * item.quantity).toFixed(2)} GHS</p>
                    </div>
                  ))}
                  <div className="pt-4 mt-4 border-t border-gray-800 flex justify-between items-center">
                    <p className="text-sm text-gray-400 uppercase tracking-widest">Total Amount</p>
                    <p className="text-xl text-white font-bold font-mono">{order.total.toFixed(2)} GHS</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
