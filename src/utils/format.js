/**
 * Formatting helpers: price, date, etc.
 */

export function formatPrice(amount, currency = "₹") {
  if (typeof amount !== "number") return amount;
  return `${currency}${amount.toLocaleString("en-IN")}`;
}
