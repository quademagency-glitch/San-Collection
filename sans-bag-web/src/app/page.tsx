"use client";

import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { motion } from "framer-motion";
import ThreeCanvas from "@/components/ui/ThreeCanvas";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* 3D Web3 Hero Section */}
      <section className="relative w-full h-[90vh] flex items-center justify-center bg-background">
        
        {/* The 3D Interactive Background */}
        <div className="absolute inset-0 z-0">
          <ThreeCanvas />
        </div>
        
        {/* Glassmorphism Content Overlay */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl px-6 pointer-events-none">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col items-start text-left max-w-2xl pointer-events-auto glass p-8 md:p-12 rounded-3xl"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="px-4 py-1 mb-6 rounded-full border border-gold/50 bg-gold/10 text-gold text-xs font-bold tracking-widest uppercase glow-gold"
            >
              Premium Handcrafted Bags
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold-light mb-6 uppercase">
              Elegance <br /> Redefined
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
              Discover our exclusive new collection of premium handcrafted bags. Merging timeless luxury with the digital frontier.
            </p>
            <Link
              href="/collections"
              className="px-8 py-4 bg-transparent border-2 border-gold text-gold font-bold tracking-wider hover:bg-gold hover:text-black hover:glow-gold transition-all duration-300 rounded-lg"
            >
              ENTER COLLECTION
            </Link>
          </motion.div>

          {/* Right side spacer for 3D object to shine */}
          <div className="hidden md:block w-full max-w-lg h-full"></div>
        </div>
      </section>

      {/* Featured Web3 Style Cards Section */}
      <section className="relative w-full py-32 bg-background">
        {/* Subtle glowing orb backgrounds */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 tracking-widest mb-16 uppercase"
          >
            Featured Assets
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[1, 2, 3].map((item, index) => (
              <motion.div 
                key={item} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group flex flex-col items-center glass-card p-6 rounded-2xl relative overflow-hidden"
              >
                {/* Glow border effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative h-80 w-full mb-6 overflow-hidden rounded-xl bg-black/50 border border-gray-800 flex items-center justify-center">
                  <span className="text-gray-600 font-mono text-sm tracking-widest uppercase">ASSET #{item}</span>
                  <div className="absolute inset-0 bg-neon-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay"></div>
                </div>
                
                <h3 className="text-xl tracking-widest text-foreground group-hover:text-gold transition-colors font-medium">LUMINA {item}</h3>
                <p className="text-gold mt-2 font-mono">299.00 GHS</p>
                
                <div className="w-full mt-6 z-20">
                  <AddToCartButton 
                    product={{
                      id: `lumina-${item}`,
                      name: `LUMINA ${item}`,
                      price: 299.00,
                      image: '/placeholder'
                    }} 
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
