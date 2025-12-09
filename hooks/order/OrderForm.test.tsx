// __tests__/hooks/useOrderForm.test.ts
import { renderHook, act } from '@testing-library/react';
import { useOrderForm } from '@/hooks/order/useOrderForm';
import { useOrder } from './useOrder';


jest.mock('@/app/utils/orderTransform', () => ({
  transformOrderFormToDto: jest.fn((data) => data),
}));

jest.mock('@/app/services/orderService', () => ({
  orderService: {
    createOrder: jest.fn(),
  },
}));

describe('useOrderForm hook', () => {
  let onSubmitMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    onSubmitMock = jest.fn().mockResolvedValue(undefined);
  });

  it('deve retornar estado inicial correto', () => {
    const { result } = renderHook(() => useOrderForm());

    expect(result.current.formData).toEqual({
      collaboratorId: '',
      orderItems: [{ productId: '', productName: '', quantity: '1', unitPrice: '' }],
    });
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.error).toBe('');
    expect(result.current.success).toBe('');
  });

  it('deve adicionar um novo item', () => {
    const { result } = renderHook(() => useOrderForm());

    act(() => {
      result.current.addOrderItem();
    });

    expect(result.current.formData.orderItems.length).toBe(2);
  });

  it('deve remover um item quando houver mais de um', () => {
    const { result } = renderHook(() => useOrderForm());

    act(() => {
      result.current.addOrderItem();
      result.current.removeOrderItem(0);
    });

    expect(result.current.formData.orderItems.length).toBe(1);
  });

  it('não deve remover item quando houver apenas um', () => {
    const { result } = renderHook(() => useOrderForm());

    act(() => {
      result.current.removeOrderItem(0);
    });

    expect(result.current.formData.orderItems.length).toBe(1);
  });

  it('deve atualizar campo do formulário', () => {
    const { result } = renderHook(() => useOrderForm());

    act(() => {
      result.current.updateField('collaboratorId', '123');
      result.current.updateOrderItem(0, 'productId', '456');
    });

    expect(result.current.formData.collaboratorId).toBe('123');
    expect(result.current.formData.orderItems[0].productId).toBe('456');
  });

  it('deve resetar o formulário', () => {
    const { result } = renderHook(() => useOrderForm());

    act(() => {
      result.current.updateField('collaboratorId', '123');
      result.current.addOrderItem();
      result.current.resetForm();
    });

    expect(result.current.formData).toEqual({
      collaboratorId: '',
      orderItems: [{ productId: '', productName: '', quantity: '1', unitPrice: '' }],
    });
    expect(result.current.error).toBe('');
    expect(result.current.success).toBe('');
  });

  describe('validação do formulário', () => {
    it('deve falhar se collaboratorId for inválido', async () => {
      const { result } = renderHook(() => useOrderForm());

      let called = false;
      const fakeEvent = { preventDefault: () => (called = true) } as unknown as React.FormEvent;

      await act(async () => {
        await result.current.handleSubmit(fakeEvent);
      });

      expect(result.current.error).toBe('ID do colaborador é obrigatório e deve ser um número');
      expect(result.current.success).toBe('');
      expect(called).toBe(true);
    });

    it('deve falhar se algum item for inválido', async () => {
      const { result } = renderHook(() => useOrderForm());

      act(() => {
        result.current.updateField('collaboratorId', '1');
        result.current.updateOrderItem(0, 'productId', ''); // inválido
      });

      const fakeEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent;

      await act(async () => {
        await result.current.handleSubmit(fakeEvent);
      });

      expect(result.current.error).toBe('Item 1: ID do produto é obrigatório');
    });
  });

  describe('submissão do formulário', () => {
    it('deve chamar onSubmit quando fornecido', async () => {
      const { result } = renderHook(() => useOrderForm(onSubmitMock));

      act(() => {
        result.current.updateField('collaboratorId', '1');
        result.current.updateOrderItem(0, 'productId', '10');
        result.current.updateOrderItem(0, 'productName', 'Produto X');
        result.current.updateOrderItem(0, 'quantity', '2');
        result.current.updateOrderItem(0, 'unitPrice', '100');
      });

      const fakeEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent;

      await act(async () => {
        await result.current.handleSubmit(fakeEvent);
      });

      expect(onSubmitMock).toHaveBeenCalledWith({
        collaboratorId: '1',
        orderItems: [{ productId: '10', productName: 'Produto X', quantity: '2', unitPrice: '100' }],
      });

      expect(result.current.success).toBe('Pedido cadastrado com sucesso!');
      expect(result.current.error).toBe('');
      expect(result.current.isSubmitting).toBe(false);
    });

    it('deve chamar submitToApi quando onSubmit não for fornecido', async () => {
      const { result } = renderHook(() => useOrderForm());

      act(() => {
        result.current.updateField('collaboratorId', '1');
        result.current.updateOrderItem(0, 'productId', '10');
        result.current.updateOrderItem(0, 'productName', 'Produto X');
        result.current.updateOrderItem(0, 'quantity', '2');
        result.current.updateOrderItem(0, 'unitPrice', '100');
      });

      const fakeEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent;

      await act(async () => {
        await result.current.handleSubmit(fakeEvent);
      });

      expect(useOrder.createOrder).toHaveBeenCalledWith({
        collaboratorId: '1',
        orderItems: [{ productId: '10', productName: 'Produto X', quantity: '2', unitPrice: '100' }],
      });

      expect(result.current.success).toBe('Pedido cadastrado com sucesso!');
      expect(result.current.error).toBe('');
      expect(result.current.isSubmitting).toBe(false);
    });

    it('deve tratar erro na submissão', async () => {
      (orderService.createOrder as jest.Mock).mockRejectedValue(new Error('Erro na API'));

      const { result } = renderHook(() => useOrderForm());

      act(() => {
        result.current.updateField('collaboratorId', '1');
        result.current.updateOrderItem(0, 'productId', '10');
        result.current.updateOrderItem(0, 'productName', 'Produto X');
        result.current.updateOrderItem(0, 'quantity', '2');
        result.current.updateOrderItem(0, 'unitPrice', '100');
      });

      const fakeEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent;

      await act(async () => {
        await result.current.handleSubmit(fakeEvent);
      });

      expect(result.current.error).toBe('Erro na API');
      expect(result.current.success).toBe('');
      expect(result.current.isSubmitting).toBe(false);
    });
  });
});
