import OrderList from "@/components/order/OrderList";
import { Order } from "@/types/interfaces/order";
import styles from "../../../components/ui/styles-modules/OrderForm.module.css";

interface props {
    orderList: Order[];
}

// bater na api e trazer lista de pedidos
const orders: Order[] = [
    {
        collaboratorId: "colab-001",
        orderItems: [
            {
                productId: "prod-1",
                productName: "Notebook Dell",
                quantity: "2",
                unitPrice: "2500.00"
            },
            {
                productId: "prod-2",
                productName: "Mouse Wireless",
                quantity: "1",
                unitPrice: "89.90"
            }
        ]
    },
    {
        collaboratorId: "colab-002",
        orderItems: [
            {
                productId: "prod-3",
                productName: "Teclado Mecânico",
                quantity: "3",
                unitPrice: "299.99"
            }
        ]
    }
];

export default function List() {
    return (<div className={styles.container}>

        {
            orders.map((order, index) => (
                <OrderList orderList={[order]} key={index} />
            ))
        }
    </div>);
}