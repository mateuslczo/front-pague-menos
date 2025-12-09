
import { Order, CreateOrderRequest, CreateOrderItemRequest, OrderStatusEnumRequest } from '../../types/interfaces/order';

export function transformOrderFormToDto(formData: Order): CreateOrderRequest {
  // Gera número do pedido aleatório (como no C#)
  const generateOrderNumber = (): string => {
    const random = Math.floor(Math.random() * 900) + 100;
    return random.toString();
  };

 const orderItems: CreateOrderItemRequest[] = formData.orderItems.map(item => {
    const productQuantity = parseInt(item.quantity);
    const unitPrice = parseFloat(item.unitPrice);
    const totalPrice = productQuantity * unitPrice;

    return {
      productId: parseInt(item.productId),
      productQuantity: productQuantity,
      unitPrice: unitPrice,
      totalPrice: totalPrice
    };
  });

  return {
    collaboratorId: parseInt(formData.collaboratorId),
    orderNumber: generateOrderNumber(),
    status: OrderStatusEnumRequest.Created,
    orderItems: orderItems
  };
}