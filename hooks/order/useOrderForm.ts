// hooks/useOrderForm.ts
import { useState } from 'react';
import { CreateOrderRequest, Order } from '../../types/interfaces/order';
import { transformOrderFormToDto } from '../../app/utils/orderTransform';
import { useOrder } from './useOrder';
import { calculateOrderTotal } from '@/app/utils/calculations';

export function useOrderForm() { //onFormSubmit?: (orderData: CreateOrderRequest) => Promise<void>) {
  const [formData, setFormData] = useState<Order>({
    collaboratorId: '',
    orderItems: [
      { productId: '', productName: '', quantity: '1', unitPrice: '' }
    ]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [totalOrder, setTotalOrder] = useState(0);


  const addOrderItem = () => {
    setFormData(prev => ({
      ...prev,
      orderItems: [
        ...prev.orderItems,
        { productId: '', productName: '', quantity: '1', unitPrice: '' }
      ]
    }));
  };

  const removeOrderItem = (index: number) => {
    if (formData.orderItems.length > 1) {
      setFormData(prev => ({
        ...prev,
        orderItems: prev.orderItems.filter((_, i) => i !== index)
      }));
    }
  };

  const updateOrderItem = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      orderItems: prev.orderItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));

    setTotalOrder(calculateOrderTotal(formData.orderItems) || 0);

  };

  const updateField = (field: keyof Omit<Order, 'orderItems'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.collaboratorId || isNaN(parseInt(formData.collaboratorId))) {
      setError('ID do colaborador é obrigatório e deve ser um número');
      return false;
    }

    if (formData.orderItems.length === 0) {
      setError('Pelo menos um item deve ser adicionado ao pedido');
      return false;
    }

    for (const [index, item] of formData.orderItems.entries()) {
      if (!item.productId || isNaN(parseInt(item.productId))) {
        setError(`Item ${index + 1}: ID do produto é obrigatório`);
        return false;
      }
      if (!item.productName.trim()) {
        setError(`Item ${index + 1}: Nome do produto é obrigatório`);
        return false;
      }
      if (!item.quantity || isNaN(parseInt(item.quantity)) || parseInt(item.quantity) <= 0) {
        setError(`Item ${index + 1}: Quantidade deve ser maior que zero`);
        return false;
      }
      if (!item.unitPrice || isNaN(parseFloat(item.unitPrice)) || parseFloat(item.unitPrice) <= 0) {
        setError(`Item ${index + 1}: Preço unitário deve ser maior que zero`);
        return false;
      }
    }

    setError('');
    return true;
  };

  const submitToApi = async (orderData: CreateOrderRequest): Promise<void> => {
    return await useOrder.createOrder(orderData);
  };

  //   const defaultOnSubmit = async (orderData: any) => {
  //   return await useOrder.createOrder(orderData);
  // };


  const resetForm = () => {
    setFormData({
      collaboratorId: '',
      orderItems: [
        { productId: '', productName: '', quantity: '1', unitPrice: '' }
      ]
    });
    setError('');
    setSuccess('');
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const orderDto = transformOrderFormToDto(formData);

      // if (onFormSubmit) {
      //   await onFormSubmit(orderDto);
      // } else {
      await submitToApi(orderDto);
      // }

      setSuccess('Pedido cadastrado com sucesso!');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar pedido');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    error,
    success,
    addOrderItem,
    removeOrderItem,
    updateOrderItem,
    updateField,
    totalOrder,
    handleSubmit,
    resetForm
  };
}