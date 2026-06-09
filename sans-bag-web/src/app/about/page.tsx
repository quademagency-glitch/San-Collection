"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden py-24">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-5xl">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 uppercase drop-shadow-lg mb-6"
          >
            About Us
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1 bg-gold mx-auto rounded-full glow-gold"
          ></motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative glass-card p-10 rounded-3xl border border-glass-border shadow-2xl overflow-hidden"
          >
             <div className="absolute top-0 left-0 w-32 h-32 bg-neon-purple/20 rounded-full blur-[50px]"></div>
             <h2 className="text-2xl font-bold tracking-widest text-white mb-6 uppercase flex items-center">
                <span className="w-2 h-2 rounded-full bg-neon-purple mr-3 glow-purple"></span>
                Our Heritage
             </h2>
             <div className="prose prose-invert text-gray-300 leading-relaxed text-lg">
                <p className="mb-4">
                  Founded with a vision to redefine luxury, San's Bag represents the pinnacle of modern craftsmanship. We believe that a bag is not just an accessory, but a statement of elegance and individuality.
                </p>
                <p>
                  Every piece in our collection is meticulously curated from the finest materials, ensuring that our patrons experience unparalleled quality and style that stands the test of time.
                </p>
             </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative glass-card p-10 rounded-3xl border border-glass-border shadow-2xl overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/20 rounded-full blur-[50px]"></div>
             <h2 className="text-2xl font-bold tracking-widest text-white mb-6 uppercase flex items-center">
                <span className="w-2 h-2 rounded-full bg-neon-cyan mr-3 glow-cyan"></span>
                The Vision
             </h2>
             <div className="prose prose-invert text-gray-300 leading-relaxed text-lg">
                <p className="mb-4">
                  We are pushing the boundaries of traditional fashion retail by blending high-end physical products with cutting-edge digital experiences. Our platforms are designed to reflect the same level of sophistication as the bags we sell.
                </p>
                <p>
                  Welcome to the new standard of premium e-commerce. Welcome to San's Bag.
                </p>
             </div>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <Link 
            href="/collections"
            className="inline-block px-10 py-5 bg-gradient-to-r from-gold to-yellow-600 text-black font-bold tracking-widest hover:opacity-90 transition-opacity rounded-xl uppercase shadow-lg shadow-gold/20"
          >
            Explore Our Collections
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
