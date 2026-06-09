import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-background py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
             <span className="text-xl font-bold tracking-widest text-gold mb-4 block">SAN'S BAG</span>
             <p className="text-sm text-gray-400 max-w-sm">
               Premium curated fashion collections and luxury bags. Designed for elegance and style.
             </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground tracking-wider uppercase">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/collections" className="hover:text-gold transition-colors">All Collections</Link></li>
              <li><Link href="/products" className="hover:text-gold transition-colors">New Arrivals</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground tracking-wider uppercase">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/contact" className="hover:text-gold transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-gold transition-colors">FAQs</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} San's Bag. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
