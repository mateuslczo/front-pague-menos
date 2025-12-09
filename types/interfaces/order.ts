// types/order.ts
export enum OrderStatusEnumRequest {
  Created = 0,
  InProgress = 1,
  Completed = 2,
  Cancelled = 3
}

export interface CreateOrderItemRequest {
  productId: number;
  productQuantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CreateOrderRequest {
  collaboratorId: number;
  orderNumber: string;
  status: OrderStatusEnumRequest;
  orderItems: CreateOrderItemRequest[];
}

export interface Order {
 collaboratorId: string;
  orderItems: Array<{
    productId: string;
    productName: string; 
    quantity: string;
    unitPrice: string;
  }>;
}