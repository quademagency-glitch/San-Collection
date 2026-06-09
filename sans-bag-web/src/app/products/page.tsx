import { prisma } from '@/lib/prisma';
import AnimatedProductGrid from '@/components/ui/AnimatedProductGrid';

export default async function ProductsPage() {
  const products = await prisma.product.findMany();

  return (
    <div className="relative min-h-screen bg-background overflow-hidden py-24">
      {/* Subtle Web3 ambient glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 uppercase drop-shadow-lg mb-6">
            Digital Assets
          </h1>
          <div className="w-24 h-1 bg-neon-purple mx-auto rounded-full glow-purple"></div>
        </div>
        
        <AnimatedProductGrid products={products} />
      </div>
    </div>
  );
}
