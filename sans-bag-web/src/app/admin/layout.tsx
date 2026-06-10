import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@/components/ui/SignOutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/"); // Redirect non-admins to homepage
  }

  return (
    <div className="min-h-screen bg-background py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
        
        {/* Admin Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="glass-card p-6 rounded-2xl border border-glass-border shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[50px] pointer-events-none"></div>
            <h2 className="text-xl font-bold text-white mb-6 tracking-widest uppercase flex items-center">
              <span className="w-2 h-2 rounded-full bg-red-500 mr-3 animate-pulse"></span>
              Admin Dashboard
            </h2>
            <nav className="flex flex-col space-y-4 relative z-10">
              <Link href="/admin" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">Overview</Link>
              <Link href="/admin/products" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">Inventory</Link>
              <Link href="/admin/collections" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">Collections</Link>
              <Link href="/admin/discounts" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">Discounts</Link>
              <Link href="/admin/orders" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">Transactions</Link>
              <div className="pt-4 border-t border-glass-border mt-4">
                <SignOutButton />
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Admin Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
