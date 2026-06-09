"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/account",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-background px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 p-8 shadow-2xl">
        <h1 className="text-3xl font-bold tracking-widest text-gold text-center mb-8 uppercase">Welcome Back</h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-gray-800 rounded-sm p-3 text-white focus:border-gold focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-gray-800 rounded-sm p-3 text-white focus:border-gold focus:outline-none"
              required
            />
          </div>
          
          <button type="submit" className="w-full py-3 bg-gold text-black font-bold tracking-widest hover:bg-gold-light transition-colors rounded-sm mt-4">
            SIGN IN
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <span className="border-b border-gray-800 w-1/5"></span>
          <span className="text-xs text-gray-500 uppercase tracking-widest">or continue with</span>
          <span className="border-b border-gray-800 w-1/5"></span>
        </div>

        <button 
          onClick={() => signIn("google", { callbackUrl: "/account" })}
          className="mt-6 w-full py-3 bg-white text-black font-bold tracking-widest hover:bg-gray-200 transition-colors rounded-sm flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
          GOOGLE
        </button>

        <p className="mt-8 text-center text-sm text-gray-400">
          Don't have an account? <Link href="/register" className="text-gold hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}
