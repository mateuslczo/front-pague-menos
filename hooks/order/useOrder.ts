import { CreateOrderRequest, Order } from "@/types/interfaces/order";
import api from "../../services/api/apiClient";

export const useOrder = {
    async createOrder(insumoData: CreateOrderRequest) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const response = await fetch(`${apiUrl}/Order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(insumoData),
        });

        if (!response.ok) {
            throw new Error('Falha ao cadastrar pedido');
        }

        return await response.json();
    },


    async getOrders() {
        const response = await api.get("/Order/List", {validateStatus:()=> true})

        if (!response) {
            throw new Error('Nada encontrado');
        };
        if (response.status !== 200) {
            return response.data.error;
            throw new Error(`Status HTTP inesperado: ${response.status}`);
        };

        return response.data || [];

    }

}
