"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function createOrder(data: {
  reference: string;
  amount: number;
  items: { id: string, quantity: number, price: number }[];
}) {
  const session = await getServerSession(authOptions);
  
  let userId = (session?.user as any)?.id;
  
  if (!userId) {
    const guestUser = await prisma.user.upsert({
      where: { email: 'guest@sansbag.com' },
      update: {},
      create: {
        email: 'guest@sansbag.com',
        password_hash: 'guest',
        name: 'Guest User'
      }
    });
    userId = guestUser.id;
  }

  const order = await prisma.order.create({
    data: {
      user_id: userId,
      total: data.amount,
      payment_method: 'Paystack',
      status: 'PAID',
      items: {
        create: data.items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price
        }))
      }
    }
  });

  return order.id;
}
