import React, { useEffect, useState } from "react";

interface Proveedor {
  Codigo: string; // Cambiado a "Codigo"
  Descripcion: string; // Cambiado a "Descripcion"
}

interface ProveedorSelectProps {
  onSelect: (proveedor: Proveedor | null) => void;
}

const ProveedorSelect: React.FC<ProveedorSelectProps> = ({ onSelect }) => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [selectedProveedor, setSelectedProveedor] = useState<Proveedor | null>(
    null
  );

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await fetch("/api/proveedores");
        if (!response.ok) {
          throw new Error("Error al obtener proveedores");
        }
        const data = await response.json();

        // Verifica que la respuesta sea un array
        if (Array.isArray(data)) {
          setProveedores(data);
        } else {
          console.error("La respuesta no es un array:", data);
        }
      } catch (error) {
        console.error("Error al obtener proveedores:", error);
      }
    };

    fetchProveedores();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const proveedor =
      proveedores.find((p) => p.Codigo === value || p.Descripcion === value) ||
      null; // Cambiado a "Codigo"
    setSelectedProveedor(proveedor);
    onSelect(proveedor);
  };

  return (
    <div className="mb-4 padding p-3">
      <label className="block mb-2"></label>

      <select
        value={selectedProveedor?.Codigo || ""}
        onChange={handleChange}
        className="border border-gray-300 rounded p-2"
      >
        <option value="">Seleccione un proveedor</option>
        {proveedores.map((proveedor) => (
          <option key={proveedor.Codigo} value={proveedor.Codigo}>
            {" "}
            {proveedor.Codigo} - {proveedor.Descripcion}{" "}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProveedorSelect;
