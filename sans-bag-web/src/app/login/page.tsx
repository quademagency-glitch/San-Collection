"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

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
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] bg-background px-4 overflow-hidden py-24">
      {/* Web3 Glowing Orbs */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-neon-cyan/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-neon-purple/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-card border border-glass-border p-10 rounded-3xl shadow-2xl relative z-10"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-[50px]"></div>

        <h1 className="text-3xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 text-center mb-2 uppercase drop-shadow-sm">Welcome Back</h1>
        <p className="text-center text-sm text-gray-500 tracking-widest uppercase mb-10">Access your account</p>
        
        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div>
            <label className="block text-xs font-bold text-neon-cyan mb-2 uppercase tracking-widest glow-cyan">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-glass-border rounded-xl p-4 text-white placeholder-gray-600 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all duration-300"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-neon-cyan mb-2 uppercase tracking-widest glow-cyan">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-glass-border rounded-xl p-4 text-white placeholder-gray-600 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all duration-300"
              required
            />
          </div>
          
          <button type="submit" className="w-full py-4 mt-8 bg-gradient-to-r from-neon-cyan to-blue-500 text-black font-bold tracking-widest hover:opacity-90 transition-opacity rounded-xl uppercase shadow-lg shadow-neon-cyan/20">
            SIGN IN
          </button>
        </form>

        <div className="mt-8 flex items-center justify-between relative z-10">
          <span className="border-b border-glass-border w-1/5"></span>
          <span className="text-xs text-gray-500 uppercase tracking-widest">or continue with</span>
          <span className="border-b border-glass-border w-1/5"></span>
        </div>

        <button 
          onClick={() => signIn("google", { callbackUrl: "/account" })}
          className="mt-6 w-full py-4 bg-white/5 border border-glass-border text-white font-bold tracking-widest hover:bg-white/10 transition-colors rounded-xl flex items-center justify-center gap-3 uppercase text-sm relative z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
          Google Auth
        </button>

        <p className="mt-10 text-center text-sm text-gray-400 relative z-10 tracking-wide">
          Don't have an account? <Link href="/register" className="text-neon-cyan hover:underline glow-cyan font-semibold">Register here</Link>
        </p>
      </motion.div>
    </div>
  );
}
