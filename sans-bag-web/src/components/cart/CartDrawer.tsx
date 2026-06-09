"use client";

import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartDrawer() {
  const { isOpen, setIsOpen, items, removeItem, updateQuantity } = useCartStore();
  
  // Prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div 
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      <div className="fixed inset-y-0 right-0 z-[101] w-full max-w-md bg-background border-l border-gold/20 shadow-2xl flex flex-col transform transition-transform duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold tracking-widest text-gold">YOUR CART</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-24 w-24 bg-gray-900 border border-gray-800 flex-shrink-0">
                     <div className="absolute inset-0 bg-gold/10"></div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-medium text-white">{item.name}</h3>
                      <p className="text-gold mt-1">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-700 rounded-sm">
                        <button 
                          className="px-2 py-1 text-gray-400 hover:text-white"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >-</button>
                        <span className="px-2 text-sm">{item.quantity}</span>
                        <button 
                          className="px-2 py-1 text-gray-400 hover:text-white"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >+</button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-gray-500 hover:text-red-400 underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-800 bg-black/50">
            <div className="flex justify-between mb-4 text-lg font-medium text-white">
              <span>Subtotal</span>
              <span className="text-gold">${total.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-400 mb-6">Shipping and taxes calculated at checkout.</p>
            <Link 
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="block w-full py-4 text-center bg-gold text-black font-bold tracking-widest hover:bg-gold-light transition-colors rounded-sm"
            >
              CHECKOUT
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
