// lib/price.ts
export function parsePrice(price: string): number {
  // Remove currency symbol and commas, then parse as float
  return parseFloat(price.replace(/[^0-9.-]+/g, ""));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(price);
}
