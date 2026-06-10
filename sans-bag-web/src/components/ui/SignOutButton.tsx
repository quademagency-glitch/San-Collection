"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/' })}
      className="text-red-500 hover:text-red-400 transition-colors text-sm uppercase tracking-wider font-bold mt-8 text-left"
    >
      Sign Out
    </button>
  );
}
