import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';

export default async function CollectionsPage() {
  const collections = await prisma.collection.findMany();

  return (
    <div className="container mx-auto px-4 py-16 md:px-8">
      <h1 className="text-4xl font-bold tracking-widest text-gold text-center mb-16 uppercase">Our Collections</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {collections.map((collection) => (
          <Link key={collection.id} href={`/collections/${collection.slug}`} className="group relative block h-[500px] overflow-hidden bg-black">
            <div className="absolute inset-0 z-0">
              <Image 
                src={collection.banner_image || '/bag-mockup.jpeg'} 
                alt={collection.name} 
                fill 
                className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" 
              />
            </div>
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-6 bg-black/30 group-hover:bg-black/10 transition-colors">
              <h2 className="text-3xl font-bold tracking-widest text-white mb-4 uppercase drop-shadow-md">{collection.name}</h2>
              <p className="text-gray-200 mb-8 max-w-md drop-shadow-sm">Explore the premium {collection.name} pieces.</p>
              <span className="px-6 py-3 border border-gold text-gold font-bold tracking-widest group-hover:bg-gold group-hover:text-black transition-colors rounded-sm">
                VIEW COLLECTION
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
