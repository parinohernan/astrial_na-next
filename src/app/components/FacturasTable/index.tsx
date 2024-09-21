import React from "react";

interface Factura {
  DocumentoTipo: string;
  DocumentoSucursal: string;
  DocumentoNumero: string;
  Fecha: string;
  ClienteCodigo: string | null;
  VendedorCodigo: string | null;
  ImporteTotal: number | null;
  t_clientes?: { Descripcion: string } | null;
  t_vendedores?: { Descripcion: string } | null;
}

interface FacturasTableProps {
  facturas: Factura[];
}

const FacturasTable: React.FC<FacturasTableProps> = ({ facturas }) => {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Tipo</th>
          <th className="border p-2">Sucursal</th>
          <th className="border p-2">Número</th>
          <th className="border p-2">Fecha</th>
          <th className="border p-2">Cliente</th>
          <th className="border p-2">Importe</th>
          <th className="border p-2">Vendedor</th>
        </tr>
      </thead>
      <tbody>
        {facturas.map((factura) => (
          <tr
            key={`${factura.DocumentoTipo}-${factura.DocumentoSucursal}-${factura.DocumentoNumero}`}
          >
            <td className="border p-2">{factura.DocumentoTipo}</td>
            <td className="border p-2">{factura.DocumentoSucursal}</td>
            <td className="border p-2">{factura.DocumentoNumero}</td>
            <td className="border p-2">
              {new Date(factura.Fecha).toLocaleDateString()}
            </td>
            <td className="border p-2">
              {factura.ClienteCodigo} -{" "}
              {factura.t_clientes?.Descripcion || "N/A"}
            </td>
            <td className="border p-2">${factura.ImporteTotal?.toFixed(2)}</td>
            <td className="border p-2">
              {factura.VendedorCodigo} -{" "}
              {factura.t_vendedores?.Descripcion || "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FacturasTable;
