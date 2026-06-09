import CheckoutForm from '@/components/checkout/CheckoutForm';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:px-8 max-w-4xl">
      <h1 className="text-4xl font-bold tracking-widest text-gold text-center mb-16 uppercase">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <CheckoutForm />
        </div>
        
        <div className="bg-gray-900 border border-gray-800 p-8">
          <h3 className="text-xl font-medium text-white mb-6">Order Summary</h3>
          <p className="text-gray-400 text-sm">
            Your items are reserved. Complete your payment via Paystack (supports Mobile Money & Cards) to secure your order.
          </p>
        </div>
      </div>
    </div>
  );
}
