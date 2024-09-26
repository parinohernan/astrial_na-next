import React from "react";
import { Articulo } from "@/types";

interface ResultadosAnalisisProps {
  articulosAnalizados: Articulo[];
}

const ResultadosAnalisis: React.FC<ResultadosAnalisisProps> = ({
  articulosAnalizados,
}) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Resultados del Análisis</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>Código</th>
            <th>Descripción</th>
            <th>Código de Proveedor</th>
            <th>Precio de Costo</th>
            <th>Precio Lista 1</th>
          </tr>
        </thead>
        <tbody>
          {articulosAnalizados.map((articulo, index) => (
            <tr key={index}>
              <td>{articulo.Codigo}</td>
              <td>{articulo.Descripcion}</td>
              <td>{articulo.ProveedorCodigo}</td>
              <td>{articulo.PrecioCosto}</td>
              <td>{articulo.Lista1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultadosAnalisis;
