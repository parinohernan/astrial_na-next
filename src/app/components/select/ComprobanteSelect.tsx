import React from "react";

interface ComprobanteSelectProps {
  onSelect: (tipo: string) => void;
}

const ComprobanteSelect: React.FC<ComprobanteSelectProps> = ({ onSelect }) => {
  const tiposComprobante = ["Factura", "Recibo", "Nota de Crédito"]; // Ejemplo de tipos

  return (
    <div>
      <label>Seleccionar Tipo de Comprobante:</label>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Seleccione un tipo</option>
        {tiposComprobante.map((tipo) => (
          <option key={tipo} value={tipo}>
            {tipo}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ComprobanteSelect;
