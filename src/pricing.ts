export const MINIMUM_VISIT_PRICE = 6000;
/** Round the complete visit once, never individual service lines. Empty selections stay zero. */
export function calculateVisit(amounts: readonly number[]): number {
  if (amounts.some(amount => !Number.isFinite(amount) || amount < 0)) throw new RangeError("Invalid service amount");
  const subtotal = amounts.reduce((sum, amount) => sum + amount, 0);
  return subtotal > 0 ? Math.max(subtotal, MINIMUM_VISIT_PRICE) : 0;
}
