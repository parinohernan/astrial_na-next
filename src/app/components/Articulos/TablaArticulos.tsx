import React from "react";
import { Articulo } from "@/types";

interface TablaArticulosProps {
  articulos: Articulo[];
  onCambioArticulo: (
    index: number,
    campo: keyof Articulo,
    valor: string | number
  ) => void;
}

const TablaArticulos: React.FC<TablaArticulosProps> = ({
  articulos,
  onCambioArticulo,
}) => {
  return (
    <table className="w-full mb-4">
      <thead>
        <tr>
          <th>Código de Proveedor</th>
          <th>Precio de Costo</th>
          <th>Precio Lista 1</th>
        </tr>
      </thead>
      <tbody>
        {articulos.map((articulo, index) => (
          <tr key={index}>
            {/* ... (contenido de las celdas igual que antes) ... */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaArticulos;
