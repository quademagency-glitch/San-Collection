"use client";

import { useCartStore } from '@/store/useCartStore';
import { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/app/actions/order';

export default function CheckoutForm() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const config = {
    reference: (new Date()).getTime().toString(),
    email,
    amount: total * 100, // Paystack amount is in kobo/pesewas
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_dummy_key',
    currency: 'GHS',
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = () => {
    clearCart();
    router.push('/order-confirmation?ref=' + config.reference);
  };

  const onClose = () => {
    console.log('Payment closed.');
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !address) return alert("Please fill all details");
    
    // Create PENDING order securely on backend
    await createOrder({
      reference: config.reference,
      amount: total,
      items: items.map(item => ({ id: item.id, quantity: item.quantity, price: item.price }))
    });

    // Initialize Paystack modal
    initializePayment({ onSuccess, onClose });
  };

  if (items.length === 0) {
    return <p className="text-gray-400">Your shopping bag is empty.</p>;
  }

  return (
    <form onSubmit={handleCheckout} className="space-y-8">
      <div>
        <h3 className="text-xl font-medium text-white mb-6 tracking-widest uppercase flex items-center">
          <span className="w-2 h-2 rounded-full bg-neon-purple mr-3 glow-purple"></span>
          Contact Information
        </h3>
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/40 border border-glass-border rounded-xl p-4 text-white placeholder-gray-500 focus:border-neon-purple focus:ring-1 focus:ring-neon-purple focus:outline-none transition-all duration-300"
            required
          />
          <input 
            type="text" 
            placeholder="Full Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/40 border border-glass-border rounded-xl p-4 text-white placeholder-gray-500 focus:border-neon-purple focus:ring-1 focus:ring-neon-purple focus:outline-none transition-all duration-300"
            required
          />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-medium text-white mb-6 mt-10 tracking-widest uppercase flex items-center">
          <span className="w-2 h-2 rounded-full bg-neon-purple mr-3 glow-purple"></span>
          Shipping Address
        </h3>
        <textarea 
          placeholder="Full Address (Street, City, Region)" 
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full bg-black/40 border border-glass-border rounded-xl p-4 text-white placeholder-gray-500 focus:border-neon-purple focus:ring-1 focus:ring-neon-purple focus:outline-none transition-all duration-300 h-32 resize-none"
          required
        />
      </div>

      <div className="border-t border-glass-border pt-8 mt-10">
        <div className="flex justify-between items-center text-xl font-bold text-white mb-8">
          <span className="tracking-widest uppercase text-sm text-gray-400">Total Amount</span>
          <span className="text-3xl text-gold font-mono">{total.toFixed(2)} GHS</span>
        </div>
        <button 
          type="submit"
          className="w-full py-5 bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-bold tracking-widest hover:opacity-90 transition-opacity rounded-xl uppercase shadow-lg shadow-neon-purple/20 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span className="relative z-10">COMPLETE SECURE PURCHASE</span>
        </button>
      </div>
    </form>
  );
}
