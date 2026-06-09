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

  const onSuccess = async () => {
    await createOrder({
      reference: config.reference,
      amount: total,
      items: items.map(item => ({ id: item.id, quantity: item.quantity, price: item.price }))
    });
    clearCart();
    router.push('/order-confirmation?ref=' + config.reference);
  };

  const onClose = () => {
    console.log('Payment closed.');
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !address) return alert("Please fill all details");
    initializePayment({ onSuccess, onClose });
  };

  if (items.length === 0) {
    return <p className="text-gray-400">Your cart is empty.</p>;
  }

  return (
    <form onSubmit={handleCheckout} className="space-y-6">
      <div>
        <h3 className="text-xl font-medium text-white mb-4">Contact Information</h3>
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-gray-800 rounded-sm p-3 text-white focus:border-gold focus:outline-none"
            required
          />
          <input 
            type="text" 
            placeholder="Full Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black border border-gray-800 rounded-sm p-3 text-white focus:border-gold focus:outline-none"
            required
          />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-medium text-white mb-4 mt-8">Shipping Address</h3>
        <textarea 
          placeholder="Full Address (Street, City, Region)" 
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full bg-black border border-gray-800 rounded-sm p-3 text-white focus:border-gold focus:outline-none h-32"
          required
        />
      </div>

      <div className="border-t border-gray-800 pt-6 mt-8">
        <div className="flex justify-between text-xl font-bold text-white mb-6">
          <span>Total</span>
          <span className="text-gold">GHS {total.toFixed(2)}</span>
        </div>
        <button 
          type="submit"
          className="w-full py-4 bg-gold text-black font-bold tracking-widest hover:bg-gold-light transition-colors rounded-sm"
        >
          PAY WITH PAYSTACK
        </button>
      </div>
    </form>
  );
}
