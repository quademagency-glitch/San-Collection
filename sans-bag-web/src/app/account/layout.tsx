"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { SignOutButton } from "@/components/ui/SignOutButton";
import { signOut } from "next-auth/react";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-background py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="glass-card p-6 rounded-2xl border border-glass-border shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6 tracking-widest uppercase">My Account</h2>
            <nav className="flex flex-col space-y-4">
              <Link href="/account" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">Overview</Link>
              <Link href="/account/orders" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">Orders</Link>
              <div className="pt-4 border-t border-glass-border mt-4 flex flex-col space-y-4">
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider font-bold">Return to Store</Link>
                <SignOutButton />
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
