"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

type Collection = {
  id: string;
  slug: string;
  name: string;
  banner_image: string | null;
};

export default function AnimatedCollectionGrid({ collections }: { collections: Collection[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
      {collections.map((collection, index) => (
        <motion.div
          key={collection.id}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: (index % 2) * 0.2 }}
        >
          <Link href={`/collections/${collection.slug}`} className="group relative block h-[500px] overflow-hidden rounded-3xl glass-card">
            <div className="absolute inset-0 z-0">
              <Image 
                src={collection.banner_image || '/bag-mockup.jpeg'} 
                alt={collection.name} 
                fill 
                className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700" 
              />
            </div>
            
            {/* Dark gradient overlay for Web3 feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-6">
              <motion.h2 
                className="text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold-light mb-4 uppercase drop-shadow-md glow-gold"
                whileHover={{ scale: 1.05 }}
              >
                {collection.name}
              </motion.h2>
              <p className="text-gray-300 mb-8 max-w-md">Explore the premium {collection.name} pieces.</p>
              
              <span className="px-8 py-3 border border-neon-cyan/50 text-neon-cyan text-sm font-bold tracking-widest group-hover:bg-neon-cyan/20 group-hover:glow-cyan transition-all rounded-full backdrop-blur-md bg-black/30">
                ENTER GALLERY
              </span>
            </div>

            {/* Glowing borders */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-cyan/30 rounded-3xl transition-colors duration-500 pointer-events-none"></div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
