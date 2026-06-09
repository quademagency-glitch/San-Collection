import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-16 md:px-8">
      <h1 className="text-4xl font-bold tracking-widest text-gold mb-12 uppercase">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-1">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-sm">
            <h2 className="text-xl font-medium text-white mb-2">{session.user?.name}</h2>
            <p className="text-gray-400 mb-6">{session.user?.email}</p>
            <p className="text-sm font-bold tracking-widest text-gold uppercase">Role: {(session.user as any)?.role}</p>
            
            <div className="mt-8 border-t border-gray-800 pt-6 space-y-4">
              <a href="/api/auth/signout" className="block text-gray-400 hover:text-white transition-colors">Sign Out</a>
              {(session.user as any)?.role === 'ADMIN' && (
                <a href="/admin" className="block text-gold hover:text-gold-light transition-colors">Admin Dashboard</a>
              )}
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h3 className="text-2xl font-medium text-white mb-6 uppercase tracking-wider">Order History</h3>
          <div className="bg-black border border-gray-800 p-8 text-center text-gray-500 rounded-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 opacity-50"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <p>You haven't placed any orders yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
