import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/cart/AddToCartButton';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  
  if (!product) return { title: 'Product Not Found' };
  
  const mainImage = product.images?.[0] || '/bag-mockup.jpeg';
  
  return {
    title: product.name,
    description: product.description || `Shop the premium ${product.name} at San's Bag.`,
    openGraph: {
      title: product.name,
      description: product.description || `Shop the premium ${product.name} at San's Bag.`,
      images: [{ url: mainImage }],
    }
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug }
  });
  
  if (!product) {
    notFound();
  }

  const mainImage = product.images?.[0] || '/bag-mockup.jpeg';

  return (
    <div className="container mx-auto px-4 py-16 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="relative aspect-square w-full bg-gray-900 border border-gray-800">
           <Image src={mainImage} alt={product.name} fill className="object-cover" priority />
        </div>
        
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold tracking-widest text-white mb-2 uppercase">{product.name}</h1>
          <p className="text-2xl text-gold mb-8">${product.price.toFixed(2)}</p>
          
          <div className="prose prose-invert mb-8">
            <p className="text-gray-300 leading-relaxed">{product.description}</p>
          </div>
          
          <div className="mb-12">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase mb-4 border-b border-gray-800 pb-2">Features</h3>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Premium quality materials</li>
              <li>Signature San's Bag branding</li>
              <li>Durable and elegant design</li>
            </ul>
          </div>
          
          <div className="pt-8 border-t border-gray-800">
             <div className="max-w-md">
               <AddToCartButton product={{ id: product.id, name: product.name, price: product.price, image: mainImage }} />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
