import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    if (!signature) {
      return NextResponse.json({ message: 'No signature' }, { status: 400 });
    }

    const secret = process.env.PAYSTACK_SECRET_KEY || '';
    const expectedSignature = crypto.createHmac('sha512', secret).update(body).digest('hex');

    if (signature !== expectedSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === 'charge.success') {
      const data = event.data;
      const reference = data.reference;
      const amount = data.amount / 100; // Convert from pesewas/kobo to main currency
      const email = data.customer.email;

      // Check if order already exists
      const existingOrder = await prisma.order.findFirst({
        where: { id: reference }
      });

      if (!existingOrder) {
        // If guest, find or create guest user
        const user = await prisma.user.upsert({
          where: { email: email },
          update: {},
          create: {
            email: email,
            name: data.customer.first_name || 'Guest',
            password_hash: 'guest_no_login',
            role: 'CUSTOMER'
          }
        });

        // Create the order. Since we don't have the cart items in the webhook easily,
        // we normally pass metadata through Paystack when initializing the payment.
        // For now, we just create the order record.
        await prisma.order.create({
          data: {
            id: reference,
            user_id: user.id,
            total: amount,
            status: 'PAID',
            payment_method: 'Paystack',
          }
        });
      } else {
        // Update to PAID if it was pending
        await prisma.order.update({
          where: { id: reference },
          data: { status: 'PAID' }
        });
      }
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
