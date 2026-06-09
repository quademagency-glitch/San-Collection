import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data for a clean seed
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.collection.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  // 1. Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@sansbag.com',
      password_hash: adminPassword,
      role: 'ADMIN',
    },
  })

  // 2. Create Collections
  const summerCollection = await prisma.collection.create({
    data: {
      name: 'Summer Elegance',
      slug: 'summer-elegance',
      banner_image: '/bag-mockup.jpeg',
    },
  })

  const midnightCollection = await prisma.collection.create({
    data: {
      name: 'Midnight Collection',
      slug: 'midnight-collection',
      banner_image: '/bag-mockup.jpeg',
    },
  })

  // 3. Create Products
  await prisma.product.create({
    data: {
      name: 'Golden Hour Tote',
      slug: 'golden-hour-tote',
      description: 'A beautiful, spacious tote bag with signature gold accents and premium leather.',
      price: 350.00,
      stock: 50,
      images: ['/bag-mockup.jpeg'],
      collections: {
        connect: { id: summerCollection.id }
      }
    },
  })

  await prisma.product.create({
    data: {
      name: 'Obsidian Clutch',
      slug: 'obsidian-clutch',
      description: 'Sleek black clutch for formal events. Compact yet spacious enough for essentials.',
      price: 210.00,
      stock: 30,
      images: ['/bag-mockup.jpeg'],
      collections: {
        connect: { id: midnightCollection.id }
      }
    },
  })

  await prisma.product.create({
    data: {
      name: 'Sunburst Crossbody',
      slug: 'sunburst-crossbody',
      description: 'Compact and vibrant. The perfect companion for your weekend getaways.',
      price: 180.00,
      stock: 100,
      images: ['/bag-mockup.jpeg'],
      collections: {
        connect: { id: summerCollection.id }
      }
    },
  })

  await prisma.product.create({
    data: {
      name: 'Eclipse Satchel',
      slug: 'eclipse-satchel',
      description: 'Our most premium offering. Crafted from the finest Italian leather with a structured silhouette.',
      price: 420.00,
      stock: 15,
      images: ['/bag-mockup.jpeg'],
      collections: {
        connect: { id: midnightCollection.id }
      }
    },
  })

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
