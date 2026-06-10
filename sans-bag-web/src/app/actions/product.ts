"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const compareAtPriceRaw = formData.get("compareAtPrice") as string;
  const compare_at_price = compareAtPriceRaw ? parseFloat(compareAtPriceRaw) : null;
  const stock = parseInt(formData.get("stock") as string, 10);
  const imageUrl = formData.get("imageUrl") as string;
  const categoryId = formData.get("categoryId") as string;
  const collectionId = formData.get("collectionId") as string;

  // Simple slug generation
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

  await prisma.product.create({
    data: {
      name,
      slug,
      description,
      price,
      compare_at_price,
      stock,
      images: imageUrl ? [imageUrl] : [],
      category_id: categoryId || null,
      collections: collectionId ? {
        connect: { id: collectionId }
      } : undefined
    }
  });

  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const compareAtPriceRaw = formData.get("compareAtPrice") as string;
  const compare_at_price = compareAtPriceRaw ? parseFloat(compareAtPriceRaw) : null;
  const stock = parseInt(formData.get("stock") as string, 10);
  const imageUrl = formData.get("imageUrl") as string;
  const categoryId = formData.get("categoryId") as string;
  const collectionId = formData.get("collectionId") as string;

  await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      price,
      compare_at_price,
      stock,
      images: imageUrl ? [imageUrl] : undefined,
      category_id: categoryId || null,
      collections: collectionId ? {
        set: [{ id: collectionId }]
      } : { set: [] }
    }
  });

  redirect("/admin/products");
}
