"use client";

import Link from 'next/link';
import Image from 'next/image';
import CartButton from '@/components/cart/CartButton';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-4 z-50 mx-4 md:mx-8 mt-4 rounded-2xl border border-glass-border glass bg-background/40 backdrop-blur-xl"
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.8 }}>
            <Image src="/logo.jpeg" alt="San's Bag Logo" width={48} height={48} className="rounded-full border border-gold group-hover:glow-gold transition-all" />
          </motion.div>
          <span className="text-xl font-bold tracking-widest text-gold text-glow-gold">SAN'S BAG</span>
        </Link>
        <div className="hidden space-x-8 md:flex">
          <Link href="/collections" className="relative group text-sm font-medium tracking-wider hover:text-neon-cyan transition-colors">
            COLLECTIONS
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan transition-all group-hover:w-full glow-cyan"></span>
          </Link>
          <Link href="/products" className="relative group text-sm font-medium tracking-wider hover:text-neon-purple transition-colors">
            SHOP
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-purple transition-all group-hover:w-full glow-purple"></span>
          </Link>
          <Link href="/about" className="relative group text-sm font-medium tracking-wider hover:text-gold transition-colors">
            ABOUT
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full glow-gold"></span>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/account" className="hidden text-sm font-medium tracking-wider hover:text-gold transition-colors md:block">ACCOUNT</Link>
          <CartButton />
        </div>
      </div>
    </motion.nav>
  );
}
