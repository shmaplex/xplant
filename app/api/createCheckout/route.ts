import { NextRequest, NextResponse } from "next/server";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const client = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN!, // e.g. "your-store.myshopify.com"
  apiVersion: "2025-07",
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_API_ACCESS_TOKEN!,
});

type CartCreateResponse = {
  cartCreate: {
    cart: {
      id: string;
      checkoutUrl: string;
    } | null;
    userErrors: {
      field: string[];
      message: string;
    }[];
  };
};

export async function POST(req: NextRequest) {
  try {
    const { variantId, quantity } = await req.json();

    if (!variantId || !quantity) {
      return NextResponse.json(
        { error: "Missing required fields: variantId and quantity" },
        { status: 400 }
      );
    }

    const mutation = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        lines: [
          {
            merchandiseId: variantId,
            quantity: quantity,
          },
        ],
      },
    };

    const response = await client.request<CartCreateResponse>(mutation, {
      variables,
    });

    if (!response.data || !response.data.cartCreate) {
      console.error(
        "Invalid response shape from Shopify:",
        JSON.stringify(response, null, 2)
      );
      if (response.errors) {
        console.error(
          "GraphQL errors:",
          JSON.stringify(response.errors, null, 2)
        );
      }
      return NextResponse.json(
        { error: "Invalid response from Shopify API" },
        { status: 500 }
      );
    }

    const { cart, userErrors } = response.data.cartCreate;

    if (userErrors.length > 0) {
      console.error("Shopify user errors:", userErrors);
      return NextResponse.json({ error: userErrors }, { status: 400 });
    }

    if (!cart?.checkoutUrl) {
      console.error("Checkout URL missing in Shopify response:", response);
      return NextResponse.json(
        { error: "Checkout URL missing. Possibly invalid variantId." },
        { status: 400 }
      );
    }

    return NextResponse.json({ checkoutUrl: cart.checkoutUrl });
  } catch (error: any) {
    if (error.graphQLErrors) {
      console.error(
        "GraphQL errors:",
        JSON.stringify(error.graphQLErrors, null, 2)
      );
    }
    console.error("Error creating cart:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
