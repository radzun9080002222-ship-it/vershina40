export const MINIMUM_VISIT_PRICE = 6000;
/** Round the complete visit once, never individual service lines. Empty selections stay zero. */
export function calculateVisit(amounts: readonly number[]): number {
  if (amounts.some(amount => !Number.isFinite(amount) || amount < 0)) throw new RangeError("Invalid service amount");
  const subtotal = amounts.reduce((sum, amount) => sum + amount, 0);
  return subtotal > 0 ? Math.max(subtotal, MINIMUM_VISIT_PRICE) : 0;
}
export function createQuote(name: string, windows: string | undefined, area: number, rate: number, total: number): string {
  return ["Здравствуйте! Хочу заказать уборку.", name + (windows ? " — " + windows : ""), "Площадь: " + area + " м²", "Ставка: " + rate + " ₽/м²", "Итого: " + total.toLocaleString("ru-RU") + " ₽", "Минимум выезда: 6 000 ₽ на общую сумму услуг."].join("\n");
}
