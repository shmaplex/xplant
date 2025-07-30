import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";

const supabase = createClient();

function normalizeProduct(p: any): Product {
  return {
    id: p.id,
    title: p.title,
    image: p.image,
    category: p.category,
    subcategory: p.subcategory,
    tag: p.tag,
    description: p.description,
    images: p.images || [],
    features: p.features || [],
    specs: p.specs || {},
    youtube_video_id: p.youtube_video_id,
    variants: p.product_variants || [],
  };
}

export async function fetchAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_variants (
        id,
        title,
        price
      )
    `
    )
    .order("title", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(normalizeProduct);
}

export async function fetchProductByIdOrSlug(
  idOrSlug: string
): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_variants (
        id,
        title,
        price
      )
    `
    )
    .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
    .single();

  if (error || !data) return null;
  return normalizeProduct(data);
}

export async function fetchRelatedProducts(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return [];
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_variants (
        id,
        title,
        price
      )
    `
    )
    .in("id", ids);

  if (error || !data) return [];
  return data.map(normalizeProduct);
}

/**
 * Fetch related product IDs for a given product
 */
export async function fetchRelatedProductsForProduct(
  productId: string
): Promise<Product[]> {
  // 1. Get related product IDs
  const { data: rel, error: relError } = await supabase
    .from("product_related")
    .select("related_product_id")
    .eq("product_id", productId);

  if (relError || !rel || rel.length === 0) return [];

  const ids = rel.map((r) => r.related_product_id);

  // 2. Fetch related product details
  return fetchRelatedProducts(ids);
}
