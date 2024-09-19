import React from "react";
import { useFacturas } from "@/hooks/useFacturas";

const FacturasList: React.FC = () => {
  const { data: facturas, isLoading, error } = useFacturas();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar las facturas</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Sucursal</th>
          <th>Número</th>
          <th>Fecha</th>
          <th>Cliente</th>
          <th>Vendedor</th>
          <th>Importe Total</th>
        </tr>
      </thead>
      <tbody>
        {facturas?.map((factura) => (
          <tr
            key={`${factura.DocumentoTipo}-${factura.DocumentoSucursal}-${factura.DocumentoNumero}`}
          >
            <td>{factura.DocumentoTipo}</td>
            <td>{factura.DocumentoSucursal}</td>
            <td>{factura.DocumentoNumero}</td>
            <td>{new Date(factura.Fecha).toLocaleDateString()}</td>
            <td>{factura.ClienteCodigo}</td>
            <td>{factura.VendedorCodigo}</td>
            <td>{factura.ImporteTotal?.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FacturasList;
