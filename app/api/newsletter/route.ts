import { NextRequest, NextResponse } from "next/server";

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const SHOPIFY_ADMIN_API_ACCESS_TOKEN =
  process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN!;

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  const body = {
    customer: {
      email,
      tags: ["dirtman-newsletter"],
      accepts_marketing: true,
    },
  };

  const response = await fetch(
    `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2025-07/customers.json`,
    {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_ADMIN_API_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
