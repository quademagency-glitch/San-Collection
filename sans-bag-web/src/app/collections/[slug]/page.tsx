import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from '@/components/cart/AddToCartButton';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const collection = await prisma.collection.findUnique({ where: { slug } });
  
  if (!collection) return { title: 'Collection Not Found' };
  
  const mainImage = collection.banner_image || '/bag-mockup.jpeg';
  
  return {
    title: `${collection.name} Collection`,
    description: `Explore the exclusive ${collection.name} collection at San's Bag.`,
    openGraph: {
      title: `${collection.name} Collection`,
      description: `Explore the exclusive ${collection.name} collection at San's Bag.`,
      images: [{ url: mainImage }],
    }
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = await prisma.collection.findUnique({
    where: { slug },
    include: { products: true }
  });
  
  if (!collection) {
    notFound();
  }

  const collectionProducts = collection.products;

  return (
    <div>
      <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image src={collection.banner_image || '/bag-mockup.jpeg'} alt={collection.name} fill className="object-cover opacity-50" priority />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-gold mb-4 uppercase drop-shadow-lg">{collection.name}</h1>
          <p className="text-lg text-gray-200 max-w-2xl drop-shadow-md">Explore our exclusive {collection.name} collection.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {collectionProducts.map((product: any) => (
            <div key={product.id} className="group flex flex-col">
              <Link href={`/products/${product.slug}`} className="block relative h-80 w-full mb-4 overflow-hidden bg-gray-900 border border-gray-800">
                <Image src={product.image} alt={product.name} fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
              </Link>
              <Link href={`/products/${product.slug}`}>
                <h3 className="text-lg tracking-wider text-foreground group-hover:text-gold transition-colors">{product.name}</h3>
              </Link>
              <p className="text-gray-400 mt-1">${product.price.toFixed(2)}</p>
              <AddToCartButton product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
