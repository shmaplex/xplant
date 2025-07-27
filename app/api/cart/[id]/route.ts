import { NextRequest, NextResponse } from "next/server";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const client = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN!,
  apiVersion: "2025-07",
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_API_ACCESS_TOKEN!,
});

export async function GET(req: NextRequest) {
  try {
    // Extract cart ID from the URL
    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const cartId = decodeURIComponent(segments[segments.length - 1]);

    const query = `
      query getCart($id: ID!) {
        cart(id: $id) {
          id
          checkoutUrl
          totalQuantity
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
                      handle
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await client.request(query, {
      variables: { id: cartId },
    });

    return NextResponse.json({ cart: response.data.cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ cart: null }, { status: 500 });
  }
}
