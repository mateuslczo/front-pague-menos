export const calculateItemTotal = (quantity: string, unitPrice: string) => {
  if (quantity === "")
    return;

  const qty = parseInt(quantity) || 0;
  const price = parseFloat(unitPrice) || 0;
  return qty * price;
};

export const calculateOrderTotal = (data: any[] | null) => {
  if (!data || !Array.isArray(data)) {
    return 0
  }

  return data.reduce<number>(
    (total: number, item: { quantity: string, unitPrice: string }) =>
      total + (calculateItemTotal(item.quantity, item.unitPrice)  || 0),
    0
  );
}