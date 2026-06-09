"use client";

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const CheckoutForm = dynamic(() => import('@/components/checkout/CheckoutForm'), {
  ssr: false,
});

export default function CheckoutPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden py-16">
      <div className="absolute top-20 left-10 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 py-8 md:px-12 relative z-10 max-w-6xl">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 text-center mb-16 uppercase drop-shadow-lg"
        >
          Secure Checkout
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-8 md:p-10 rounded-3xl border border-glass-border shadow-2xl"
          >
            <CheckoutForm />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="glass-card p-10 rounded-3xl border border-neon-cyan/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/20 rounded-full blur-[50px]"></div>
              
              <h3 className="text-xl font-medium text-white mb-6 tracking-widest uppercase flex items-center">
                <span className="w-2 h-2 rounded-full bg-neon-cyan mr-3 glow-cyan"></span>
                Order Summary
              </h3>
              
              <div className="prose prose-invert text-gray-400 text-sm leading-relaxed mb-6">
                <p>Your premium items are currently reserved.</p>
                <p>Complete your transaction using our secure Paystack gateway (supporting Mobile Money & Cards) to finalize your order and secure your physical delivery.</p>
              </div>

              <div className="mt-8 pt-6 border-t border-glass-border">
                <div className="flex items-center justify-between text-xs font-mono text-gray-500 uppercase tracking-widest">
                  <span>Connection</span>
                  <span className="text-neon-cyan glow-cyan">Secure / Encrypted</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
