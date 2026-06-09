import Link from 'next/link';
import Image from 'next/image';
import CartButton from '@/components/cart/CartButton';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gold/20 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.jpeg" alt="San's Bag Logo" width={48} height={48} className="rounded-full border border-gold" />
          <span className="text-xl font-bold tracking-widest text-gold">SAN'S BAG</span>
        </Link>
        <div className="hidden space-x-8 md:flex">
          <Link href="/collections" className="text-sm font-medium tracking-wider hover:text-gold transition-colors">COLLECTIONS</Link>
          <Link href="/products" className="text-sm font-medium tracking-wider hover:text-gold transition-colors">SHOP</Link>
          <Link href="/about" className="text-sm font-medium tracking-wider hover:text-gold transition-colors">ABOUT</Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/account" className="hidden text-sm font-medium tracking-wider hover:text-gold transition-colors md:block">ACCOUNT</Link>
          <CartButton />
        </div>
      </div>
    </nav>
  );
}
