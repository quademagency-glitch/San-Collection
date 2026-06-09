import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/cart/AddToCartButton";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bag-mockup.jpeg"
            alt="San's Bag Hero Image"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-widest text-gold mb-6 uppercase drop-shadow-lg">
            Elegance Redefined
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10 drop-shadow-md">
            Discover our exclusive new collection of premium handcrafted bags designed for the modern fashionista.
          </p>
          <Link
            href="/collections"
            className="px-8 py-4 bg-gold text-black font-bold tracking-wider hover:bg-gold-light transition-colors rounded-sm shadow-lg shadow-gold/20"
          >
            EXPLORE COLLECTION
          </Link>
        </div>
      </section>

      {/* Featured Section placeholder */}
      <section className="w-full py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold text-gold tracking-widest mb-12 uppercase">Featured Pieces</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group cursor-pointer flex flex-col items-center">
                <div className="relative h-96 w-full mb-4 overflow-hidden bg-gray-900 border border-gray-800">
                   <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                </div>
                <h3 className="text-lg tracking-wider text-foreground group-hover:text-gold transition-colors">Classic Bag {item}</h3>
                <p className="text-gray-500 mt-1">$299.00</p>
                
                {/* Zustand Demo Button */}
                <div className="w-full max-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <AddToCartButton 
                    product={{
                      id: `bag-${item}`,
                      name: `Classic Bag ${item}`,
                      price: 299.00,
                      image: '/placeholder'
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
