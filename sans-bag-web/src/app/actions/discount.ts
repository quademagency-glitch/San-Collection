"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function createDiscount(formData: FormData) {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const code = formData.get("code") as string;
  const discount_type = formData.get("type") as string;
  const value = parseFloat(formData.get("value") as string);
  const max_usesRaw = formData.get("max_uses") as string;
  const usage_limit = max_usesRaw ? parseInt(max_usesRaw, 10) : null;
  const expires_atRaw = formData.get("expires_at") as string;
  const expiry = expires_atRaw ? new Date(expires_atRaw) : null;

  await prisma.coupon.create({
    data: {
      code: code.toUpperCase(),
      discount_type,
      value,
      usage_limit,
      expiry
    }
  });

  redirect("/admin/discounts");
}
