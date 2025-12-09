"use client";

import { useOrderForm } from "../../hooks/order/useOrderForm";
import { useScrollToTop } from "../../hooks/useScrollTop";
import {
  fakeCollaborators,
  fakeProduct,
} from "../../types/interfaces/fake-types";

import styles from "../../components/ui/styles-modules/OrderForm.module.css";
import OrderSuccessModal from "@/components/ui/OrderSuccessModal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NumericFormat } from 'react-number-format';
import { formatCurrencyValue } from "../utils/formatters";
import { calculateItemTotal } from "../utils/calculations";
import { Order } from "@/types/interfaces/order";

import OrderMasterModal from "@/components/ui/OrderMasterModal";
import { useOrder } from "@/hooks/order/useOrder";

export default function OrderForm() {
  const router = useRouter();
  const scrollToTop = useScrollToTop();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [openOrderMasterModal, setOpenOrderMasterModal] = useState<boolean>();

  const {
    formData,
    isSubmitting,
    error,
    success,
    addOrderItem,
    removeOrderItem,
    updateOrderItem,
    updateField,
    totalOrder,
    handleSubmit: originalHandleSubmit,
    resetForm,
  } = useOrderForm();

  const handleSubmitWithScrollAndModal = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setShowSuccessModal(false);

      const result = await originalHandleSubmit(e);

      if ((result && result.success) || success) {
        scrollToTop();
        setShowSuccessModal(true);
      }
    } catch (err) {
      console.error("Erro no submit:", err);
    }
  };

  const handleNewOrder = () => {
    setShowSuccessModal(false);
    resetForm?.();
  };

  const handleGoToLogin = () => {
    setShowSuccessModal(false);
    router.push("/login");
  };

  const handleCloseModal = () => setShowSuccessModal(false);

  const handleLoginRedirect = () => {
    router.push("/login-form");
  };



  /** Atualiza o id ou produto nos inputs */
  const updateSelectList = (idx: number, identy: string, control: string) => {
    if (!parseInt(identy)) {
      const newSelectOption = fakeProduct.find(p => p.name === identy);
      if (newSelectOption)
        updateOrderItem(idx, control, newSelectOption.id.toString());
    } else {
      const newSelectOption = fakeProduct.find(p => p.id.toString() === identy);
      if (newSelectOption)
        updateOrderItem(idx, control, newSelectOption.name);
    }
  }


  const [orders, setOrders] = useState<Order>();
  useEffect(() => {
    const fetchOrders = async () => {
      const result = await useOrder.getOrders();
      setOrders(result);
    };

    if(openOrderMasterModal){
      fetchOrders()
    }
  }, [openOrderMasterModal])

  return (

    <div className={styles.container}>
      <form onSubmit={handleSubmitWithScrollAndModal} className={styles.form}>
        <h2 className={styles.title}>Cadastrar Novo Pedido </h2>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
        {openOrderMasterModal && <OrderMasterModal order={orders} onClose={() => setOpenOrderMasterModal(false)}></OrderMasterModal>}

        {/* Campo Colaborador */}
        <div className={styles.formGroup}>
          <label htmlFor="collaboratorId" className={styles.label}>
            Colaborador *
          </label>
          <select
            id="collaboratorId"
            value={formData.collaboratorId}
            onChange={(e) => updateField("collaboratorId", e.target.value)}
            className={styles.select}
          // required
          >
            <option value="">Selecione um colaborador</option>
            {fakeCollaborators.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} - {c.department}
              </option>
            ))}
          </select>
        </div>

        {/* Itens do Pedido */}
        <div className={styles.orderItemsSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Itens do Pedido</h3>
            <button
              type="button"
              onClick={addOrderItem}
              className={styles.addButton}
            >
              + Adicionar Item
            </button>
          </div>

          {formData.orderItems.map((item, idx) => (
            <div key={idx} className={styles.orderItem}>
              <div className={styles.itemHeader}>
                <h4>Item {idx + 1}</h4>
                {formData.orderItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOrderItem(idx)}
                    className={styles.removeButton}
                  >
                    Remover
                  </button>
                )}
              </div>

              <div className={styles.itemGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Id *</label>
                  <input
                    type="text"
                    value={item.productId}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      updateSelectList(idx, value, "productName")
                      updateOrderItem(idx, "productId", value);
                    }}
                    className={styles.input}
                    placeholder="0"
                    min="1"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Nome do Produto *</label>
                  <select
                    value={item.productName}
                    onChange={(e) => {
                      updateSelectList(idx, e.target.value, "productId")
                      updateOrderItem(idx, "productName", e.target.value)
                    }}
                    className={styles.select}
                  // required
                  >
                    <option value="">Selecione um produto</option>
                    {fakeProduct.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Quantidade *</label>
                  <input
                    type="text"
                    value={item.quantity}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      updateOrderItem(idx, "quantity", value)
                    }}
                    className={styles.input}
                    placeholder="Quantidade"
                    // required
                    min="1"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Preço Unitário *</label>

                  <NumericFormat
                    className={styles.input}
                    decimalSeparator=","
                    thousandSeparator="."
                    decimalScale={2}
                    fixedDecimalScale={true}
                    placeholder="0,00"
                    value={item.unitPrice}
                    onValueChange={(e) => updateOrderItem(idx, "unitPrice", e.value)}
                  >
                  </NumericFormat>
                </div>
              </div>

              <div className={styles.itemTotal}>
                Total do Item: R${" "}
                {formatCurrencyValue(calculateItemTotal(item.quantity, item.unitPrice) || 0)}
              </div>
            </div>
          ))}
        </div>

        {/* Resumo do Pedido */}
        <div className={styles.orderSummary}>
          <h3 className={styles.summaryTitle}>Resumo do Pedido</h3>
          <div className={styles.summaryRow}>
            <span>Total de Itens:</span>
            <span>{formData.orderItems.length}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Valor Total:</span>
            <span className={styles.totalAmount}>
              R$ {formatCurrencyValue(totalOrder)} {/*calculateOrderTotal(formData.orderItems))*/}
            </span>
          </div>
        </div>

        <div className={styles.buttonContainerSpaceBetween}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? (
              <>
                <div className={styles.spinner}></div>
                Cadastrando...
              </>
            ) : (
              "Fazer Pedido do Insumo"
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setOpenOrderMasterModal(true);
            }}
            className={styles.listSubmitButton}
          >
            {isSubmitting ? (
              <>
                <div className={styles.spinner}></div>
                Recuperando lista...
              </>
            ) : (
              "Listar Insumos"
            )}
          </button>

          <button
            type="button"
            onClick={handleLoginRedirect}
            className={styles.cancelButton}
          >
            Cancelar
          </button>
        </div>
      </form>

      <OrderSuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        onNewOrder={handleNewOrder}
        onLogin={handleGoToLogin}
      />
    </div >
  );
}
