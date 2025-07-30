import { NextRequest, NextResponse } from "next/server";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const client = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN!,
  apiVersion: "2025-07",
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_API_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const { lines } = await req.json();

    const mutation = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        title
                      }
                    }
                  }
                }
              }
            }
          }
          userErrors {
            message
            field
          }
        }
      }
    `;

    const variables = { input: { lines } };
    const response = await client.request(mutation, { variables });
    const data = response.data;

    if (data.cartCreate.userErrors.length > 0) {
      return NextResponse.json(
        { error: data.cartCreate.userErrors },
        { status: 400 }
      );
    }

    const { id, checkoutUrl } = data.cartCreate.cart;

    return NextResponse.json({
      cartId: id,
      checkoutUrl,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
