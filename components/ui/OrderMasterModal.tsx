
import { Order } from "@/types/interfaces/order";
import styles from "../../components/ui/styles-modules/OrderForm.module.css";
import CustomList from "@/shared/components/CustomList";
import router from "next/router";

interface OrderProps {
    order: Order[];
    onClose: boolean;
}

export default function OrderMasterModal({ order, onClose }: OrderProps) {

    if (order === undefined || order === null) {
        return <div className="p-4 text-center text-gray-500">Dados não disponíveis</div>
    }

    // Se order for uma string, mostra a string (mensagem de erro da API)
    if (typeof order === 'string') {
        return <div className="p-4 text-center text-gray-500">{order}</div>
    }

    if (typeof(order) === 'object') {
        return (
            <div> {/*AREA DA MODAL */}
                <div className={styles.backScreenModal} >
                    <div className={styles.backInternalModal}>
                        <div className={styles.headerModal}>Pedidos</div>

                        <CustomList items={order} />

                        <div className={styles.footerModal}>
                            <button type="button" className={styles.btnCloseModal} onClick={onClose}>
                                Fechar
                            </button>
                            <button type="button" className={styles.btnDetailOpenModal} onClick={() => router.push("/order/list")}>
                                Detalhes
                            </button>
                        </div>
                    </div>
                </div>
            </div>)
    }
}