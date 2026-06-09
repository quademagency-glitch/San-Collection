import Link from 'next/link';

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>
}) {
  const { ref } = await searchParams;

  return (
    <div className="container mx-auto px-4 py-24 md:px-8 text-center max-w-2xl">
      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gold/10 text-gold mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
      </div>
      
      <h1 className="text-4xl font-bold tracking-widest text-white mb-4 uppercase">Payment Successful!</h1>
      <p className="text-lg text-gray-400 mb-8">
        Thank you for your purchase. Your order has been received and is currently being processed.
      </p>
      
      {ref && (
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-sm mb-12">
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Transaction Reference</p>
          <p className="text-xl font-mono text-gold">{ref}</p>
        </div>
      )}
      
      <Link 
        href="/collections"
        className="inline-block px-8 py-4 border border-gold text-gold font-bold tracking-widest hover:bg-gold hover:text-black transition-colors rounded-sm"
      >
        CONTINUE SHOPPING
      </Link>
    </div>
  );
}
