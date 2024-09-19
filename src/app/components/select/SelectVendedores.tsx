import React from "react";
import { useVendedores } from "@/hooks/useVendedores";

export interface Vendedor {
  Codigo: string;
  Nombre: string;
  Descripcion: string;
}

interface SelectVendedoresProps {
  value: Vendedor | null;
  onChange: (vendedor: Vendedor | null) => void;
}

const SelectVendedores: React.FC<SelectVendedoresProps> = ({
  value,
  onChange,
}) => {
  const { data: vendedores, isLoading, error } = useVendedores();

  if (isLoading) return <div>Cargando vendedores...</div>;
  if (error)
    return <div>Error al cargar vendedores: {(error as Error).message}</div>;
  if (!vendedores || vendedores.length === 0)
    return <div>No hay vendedores disponibles</div>;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCodigo = e.target.value;
    if (selectedCodigo === "") {
      onChange(null);
    } else {
      const selectedVendedor = vendedores.find(
        (v) => v.Codigo === selectedCodigo
      );
      if (selectedVendedor) {
        onChange(selectedVendedor);
      }
    }
  };

  return (
    <div>
      <label className="block mb-2">Vendedor:</label>
      <select
        value={value?.Codigo || ""}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">Todos los vendedores</option>
        {vendedores.map((vendedor) => (
          <option key={vendedor.Codigo} value={vendedor.Codigo}>
            {vendedor.Codigo} - {vendedor.Descripcion}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectVendedores;
