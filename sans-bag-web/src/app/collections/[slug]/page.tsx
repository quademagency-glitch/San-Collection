import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import AnimatedProductGrid from '@/components/ui/AnimatedProductGrid';

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

  // Ensure products conform to the expected AnimatedProductGrid schema
  const collectionProducts = collection.products.map(p => ({
    ...p,
    images: [(p as any).image || '/bag-mockup.jpeg']
  }));

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* 3D Web3 Hero Background for Collection */}
      <section className="relative w-full h-[60vh] flex flex-col items-center justify-center overflow-hidden border-b border-glass-border">
        <div className="absolute inset-0 z-0">
          <Image src={collection.banner_image || '/bag-mockup.jpeg'} alt={collection.name} fill className="object-cover opacity-30" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[100px] pointer-events-none z-10"></div>
        
        <div className="relative z-20 flex flex-col items-center text-center px-4 glass p-10 rounded-3xl border border-glass-border">
          <h1 className="text-4xl md:text-6xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-cyan to-white mb-4 uppercase drop-shadow-lg text-glow">{collection.name}</h1>
          <p className="text-lg text-gray-300 max-w-2xl drop-shadow-md">Explore our exclusive {collection.name} collection.</p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-24 md:px-12 relative z-20">
        <AnimatedProductGrid products={collectionProducts as any} />
      </section>
    </div>
  );
}
