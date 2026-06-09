import Link from 'next/link';

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>
}) {
  const { ref } = await searchParams;

  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex items-center justify-center py-24">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
        <div className="glass-card p-12 md:p-20 rounded-3xl border border-neon-cyan/30 shadow-2xl shadow-neon-cyan/10">
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan mb-10 glow-cyan relative">
            <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-neon-cyan"></div>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-6 uppercase">Transaction Confirmed</h1>
          <p className="text-lg text-gray-400 mb-10 leading-relaxed">
            Your asset transfer was successful. Your premium order is now being processed and prepared for shipping.
          </p>
          
          {ref && (
            <div className="bg-black/50 border border-glass-border p-6 rounded-2xl mb-12 inline-block w-full max-w-md">
              <p className="text-xs text-neon-cyan uppercase tracking-widest mb-3 glow-cyan">Network Reference ID</p>
              <p className="text-2xl font-mono text-white tracking-widest">{ref}</p>
            </div>
          )}
          
          <div>
            <Link 
              href="/collections"
              className="inline-block px-10 py-5 border-2 border-neon-cyan text-neon-cyan font-bold tracking-widest hover:bg-neon-cyan hover:text-black hover:glow-cyan transition-all duration-300 rounded-full uppercase text-sm"
            >
              Return to Gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
