import React from "react";
import DatePicker from "react-datepicker";
import SelectVendedores, { Vendedor } from "../select/SelectVendedores";

interface VentasFiltersProps {
  fechaInicio: Date;
  setFechaInicio: (date: Date) => void;
  fechaFin: Date;
  setFechaFin: (date: Date) => void;
  vendedor: Vendedor | null;
  setVendedor: (vendedor: Vendedor | null) => void;
  porcentajeComision: number;
  setPorcentajeComision: (porcentaje: number) => void;
}

const VentasFilters: React.FC<VentasFiltersProps> = ({
  fechaInicio,
  setFechaInicio,
  fechaFin,
  setFechaFin,
  vendedor,
  setVendedor,
  porcentajeComision,
  setPorcentajeComision,
}) => {
  return (
    <div className="mb-4 flex space-x-4">
      <div>
        <label className="block mb-2">Fecha Inicio:</label>
        <DatePicker
          selected={fechaInicio}
          onChange={(date) => setFechaInicio(date || new Date())}
          className="border p-2 rounded"
        />
      </div>
      <div>
        <label className="block mb-2">Fecha Fin:</label>
        <DatePicker
          selected={fechaFin}
          onChange={(date) => setFechaFin(date || new Date())}
          className="border p-2 rounded"
        />
      </div>
      <SelectVendedores value={vendedor} onChange={setVendedor} />
      <div>
        <label className="block mb-2">Porcentaje de Comisión:</label>
        <input
          type="number"
          value={porcentajeComision}
          onChange={(e) => setPorcentajeComision(Number(e.target.value))}
          className="border p-2 rounded"
          min="0"
          max="100"
          step="0.01"
        />
      </div>
    </div>
  );
};

export default VentasFilters;
