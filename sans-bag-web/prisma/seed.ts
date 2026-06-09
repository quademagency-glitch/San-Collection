import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Cleaning existing data...')
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.collection.deleteMany()
  await prisma.category.deleteMany()

  console.log('Seeding Database...')

  // Create Categories
  const categoryBags = await prisma.category.create({
    data: {
      name: 'Bags',
      slug: 'bags',
    },
  })

  const categoryAccessories = await prisma.category.create({
    data: {
      name: 'Accessories',
      slug: 'accessories',
    },
  })

  // Create Collections
  const luminaCollection = await prisma.collection.create({
    data: {
      name: 'Lumina',
      slug: 'lumina',
      banner_image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2000&auto=format&fit=crop',
    },
  })

  const auraCollection = await prisma.collection.create({
    data: {
      name: 'Aura',
      slug: 'aura',
      banner_image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2000&auto=format&fit=crop',
    },
  })

  const novaCollection = await prisma.collection.create({
    data: {
      name: 'Nova',
      slug: 'nova',
      banner_image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=2000&auto=format&fit=crop',
    },
  })

  // Create Products
  const products = [
    {
      name: 'Lumina Tote',
      slug: 'lumina-tote',
      description: 'The signature Lumina Tote. Crafted from premium leather with subtle gold accents, perfect for everyday elegance.',
      price: 299.00,
      stock: 15,
      images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop'],
      category_id: categoryBags.id,
      collections: { connect: [{ id: luminaCollection.id }] }
    },
    {
      name: 'Lumina Crossbody',
      slug: 'lumina-crossbody',
      description: 'A compact and stylish crossbody bag from the Lumina collection. Features a secure magnetic closure and adjustable strap.',
      price: 189.00,
      stock: 25,
      images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop'],
      category_id: categoryBags.id,
      collections: { connect: [{ id: luminaCollection.id }] }
    },
    {
      name: 'Aura Clutch',
      slug: 'aura-clutch',
      description: 'The Aura Clutch brings evening sophistication. Sleek lines with a subtle glowing finish under the right light.',
      price: 159.00,
      stock: 10,
      images: ['https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800&auto=format&fit=crop'],
      category_id: categoryBags.id,
      collections: { connect: [{ id: auraCollection.id }] }
    },
    {
      name: 'Aura Satchel',
      slug: 'aura-satchel',
      description: 'Structured, bold, and unapologetically premium. The Aura Satchel is designed for the modern professional.',
      price: 349.00,
      stock: 8,
      images: ['https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop'],
      category_id: categoryBags.id,
      collections: { connect: [{ id: auraCollection.id }] }
    },
    {
      name: 'Nova Weekender',
      slug: 'nova-weekender',
      description: 'For your elegant escapes. The Nova Weekender offers maximum space without compromising on aesthetic appeal.',
      price: 499.00,
      stock: 5,
      images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop'],
      category_id: categoryBags.id,
      collections: { connect: [{ id: novaCollection.id }] }
    },
    {
      name: 'San Signature Wallet',
      slug: 'san-signature-wallet',
      description: 'The perfect companion to any of our bags. Slim, elegant, and timeless.',
      price: 89.00,
      stock: 40,
      images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop'],
      category_id: categoryAccessories.id,
      collections: { connect: [{ id: luminaCollection.id }, { id: auraCollection.id }, { id: novaCollection.id }] }
    }
  ]

  for (const p of products) {
    await prisma.product.create({ data: p })
  }

  // Create an Admin User
  const passwordHash = await bcrypt.hash('admin123', 10)
  
  await prisma.user.upsert({
    where: { email: 'admin@sansbag.com' },
    update: {},
    create: {
      email: 'admin@sansbag.com',
      name: 'San Admin',
      password_hash: passwordHash,
      role: 'ADMIN',
    },
  })

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
