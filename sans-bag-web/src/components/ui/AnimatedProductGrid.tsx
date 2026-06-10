"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import AddToCartButton from '@/components/cart/AddToCartButton';

type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  images: string[];
};

export default function AnimatedProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 relative z-10">
      {products.map((product, index) => {
        const mainImage = product.images?.[0] || '/bag-mockup.jpeg';
        return (
          <motion.div 
            key={product.id} 
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
            whileHover={{ y: -10 }}
            className="group flex flex-col items-center glass-card p-6 rounded-3xl relative overflow-hidden"
          >
            {/* Glow border effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <Link href={`/products/${product.slug}`} className="block relative h-80 w-full mb-6 overflow-hidden rounded-2xl bg-black/50 border border-glass-border">
              <Image 
                src={mainImage} 
                alt={product.name} 
                fill 
                className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay"></div>
            </Link>
            
            <Link href={`/products/${product.slug}`} className="text-center">
              <h3 className="text-lg font-medium tracking-widest text-foreground group-hover:text-neon-purple transition-colors mb-2">{product.name}</h3>
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <p className="text-gold font-mono tracking-widest">{product.price.toFixed(2)} GHS</p>
              {product.compare_at_price && (
                <p className="text-gray-500 line-through font-mono text-sm">{product.compare_at_price.toFixed(2)} GHS</p>
              )}
            </div>
            
            <div className="w-full z-20">
              <AddToCartButton product={{ id: product.id, name: product.name, price: product.price, image: mainImage }} />
            </div>

            {/* Glowing borders */}
            <div className="absolute inset-0 border border-transparent group-hover:border-neon-purple/30 rounded-3xl transition-colors duration-500 pointer-events-none"></div>
          </motion.div>
        )
      })}
    </div>
  );
}
