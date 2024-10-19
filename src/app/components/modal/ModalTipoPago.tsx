import React from "react";

interface ModalTipoPagoProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalTipoPago: React.FC<ModalTipoPagoProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Seleccionar Tipo de Pago</h2>
      {/* Aquí puedes agregar opciones de pago */}
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default ModalTipoPago;
