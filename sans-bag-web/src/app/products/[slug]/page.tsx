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
    <div className="relative min-h-screen bg-background overflow-hidden py-16">
      {/* Background Ambience */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-neon-purple/20 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 py-8 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Container */}
          <div className="relative aspect-square w-full rounded-3xl glass p-4 border border-neon-purple/20 shadow-2xl shadow-neon-purple/10">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/50">
               <Image src={mainImage} alt={product.name} fill className="object-cover" priority />
               <div className="absolute inset-0 bg-neon-cyan/5 mix-blend-overlay pointer-events-none"></div>
            </div>
            {/* Glowing accents */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-neon-cyan/30 rounded-full blur-[50px] pointer-events-none"></div>
          </div>
          
          {/* Product Details Container */}
          <div className="flex flex-col justify-center glass-card p-10 md:p-14 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="px-3 py-1 mb-6 inline-flex w-fit rounded-full border border-neon-purple/50 bg-neon-purple/10 text-neon-purple text-xs font-bold tracking-widest uppercase glow-purple">
              Verified Asset
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4 uppercase">{product.name}</h1>
            <p className="text-3xl font-mono text-gold mb-8">{product.price.toFixed(2)} <span className="text-sm text-gray-500">GHS</span></p>
            
            <div className="prose prose-invert mb-10 max-w-none">
              <p className="text-gray-300 leading-relaxed text-lg">{product.description}</p>
            </div>
            
            <div className="mb-12">
              <h3 className="text-sm font-semibold tracking-wider text-neon-cyan uppercase mb-6 border-b border-glass-border pb-3">Asset Properties</h3>
              <ul className="space-y-4">
                {['Premium quality materials', "Signature San's Bag branding", 'Durable and elegant design'].map((trait, i) => (
                  <li key={i} className="flex items-center text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-neon-cyan mr-4 glow-cyan"></span>
                    {trait}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-8 border-t border-glass-border relative z-20">
               <AddToCartButton product={{ id: product.id, name: product.name, price: product.price, image: mainImage }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
