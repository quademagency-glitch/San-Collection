"use client";

import { useCartStore } from "@/store/useCartStore";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({ ...product, quantity: 1 });
  };

  return (
    <button
      onClick={handleAdd}
      aria-label={`Add ${product.name} to cart`}
      className="mt-4 w-full py-2 border border-gold text-gold hover:bg-gold hover:text-black focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors rounded-sm tracking-wider font-semibold text-sm"
    >
      ADD TO CART
    </button>
  );
}
