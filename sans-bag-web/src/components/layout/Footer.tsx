import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative border-t border-glass-border bg-black/60 backdrop-blur-xl py-16 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
             <span className="text-2xl font-bold tracking-widest text-white mb-4 block uppercase drop-shadow-md">SAN'S BAG</span>
             <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
               Premium curated fashion collections and luxury bags. Designed for elegance and style.
             </p>
          </div>
          <div>
            <h3 className="mb-6 text-sm font-bold text-neon-cyan tracking-wider uppercase glow-cyan">Shop</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/collections" className="hover:text-white transition-colors">All Collections</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">New Arrivals</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-sm font-bold text-neon-purple tracking-wider uppercase glow-purple">Support</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-glass-border pt-8 text-center flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} San's Bag. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
