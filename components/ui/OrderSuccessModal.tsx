"use client";

import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewOrder: () => void;
  onLogin: () => void;
}

export default function OrderSuccessModal({
  isOpen,
  onClose,
  onNewOrder,

}: OrderSuccessModalProps) {
  const router = useRouter();
  if (!isOpen) return null;


  const handleLoginRedirect = () => {
    onClose(); 
    router.push("/login-form"); 
  };

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // evita fechar ao clicar dentro
      >
        <h2>Pedido cadastrado com sucesso!</h2>
        <div className="modal-buttons">
          <button onClick={onNewOrder}>Novo Pedido de </button>
          <button onClick={handleLoginRedirect}>Ir para Login</button>
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          max-width: 500px;
          width: 90%;
          text-align: center;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        .modal-buttons {
          display: flex;
          justify-content: space-around;
          margin-top: 1.5rem;
        }
        button {
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>,
    document.body
  );
}
