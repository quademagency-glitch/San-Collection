import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from '@/components/cart/AddToCartButton';

export default async function ProductsPage() {
  const products = await prisma.product.findMany();

  return (
    <div className="container mx-auto px-4 py-16 md:px-8">
      <h1 className="text-4xl font-bold tracking-widest text-gold text-center mb-16 uppercase">All Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => {
          const mainImage = product.images?.[0] || '/bag-mockup.jpeg';
          return (
          <div key={product.id} className="group flex flex-col">
            <Link href={`/products/${product.slug}`} className="block relative h-80 w-full mb-4 overflow-hidden bg-gray-900 border border-gray-800">
              <Image src={mainImage} alt={product.name} fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
            </Link>
            <Link href={`/products/${product.slug}`}>
              <h3 className="text-lg tracking-wider text-foreground group-hover:text-gold transition-colors">{product.name}</h3>
            </Link>
            <p className="text-gray-400 mt-1">${product.price.toFixed(2)}</p>
            <AddToCartButton product={{ id: product.id, name: product.name, price: product.price, image: mainImage }} />
          </div>
        )})}
      </div>
    </div>
  );
}
