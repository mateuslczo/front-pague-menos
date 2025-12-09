
import { Order } from "@/types/interfaces/order";
import styles from "../../components/ui/styles-modules/OrderForm.module.css";
import CustomList from "@/shared/components/CustomList";
import router from "next/router";

interface OrderProps {
    order: Order[];
    onClose: boolean;
}


export default function OrderMasterModal({ order, onClose }: OrderProps) {

    return (
        <div>
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