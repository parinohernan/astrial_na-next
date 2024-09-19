"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectVendedores, {
  Vendedor,
} from "../../components/select/SelectVendedores";
import { useFacturas } from "@/hooks/useFacturas";

const ReportesVentas: React.FC = () => {
  const [fechaInicio, setFechaInicio] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [fechaFin, setFechaFin] = useState<Date>(new Date());
  const [vendedor, setVendedor] = useState<Vendedor | null>(null);

  const { data: facturas, isLoading, error } = useFacturas();

  const filtrarFacturas = () => {
    if (!facturas) return [];
    return facturas.filter((factura) => {
      const fechaFactura = new Date(factura.Fecha);
      return (
        fechaFactura >= fechaInicio &&
        fechaFactura <= fechaFin &&
        (vendedor === null || factura.VendedorCodigo === vendedor.Codigo)
      );
    });
  };

  if (isLoading) return <div>Cargando facturas...</div>;
  if (error) return <div>Error al cargar las facturas</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Reportes de Ventas</h2>

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
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Comprobante</th>
            <th className="border p-2">Cliente</th>
            <th className="border p-2">Importe</th>
            <th className="border p-2">Vendedor</th>
          </tr>
        </thead>
        <tbody>
          {filtrarFacturas().map((factura) => (
            <tr
              key={`${factura.DocumentoTipo}-${factura.DocumentoSucursal}-${factura.DocumentoNumero}`}
            >
              <td className="border p-2">
                {new Date(factura.Fecha).toLocaleDateString()}
              </td>
              <td className="border p-2">
                {factura.DocumentoTipo}-{factura.DocumentoSucursal}-
                {factura.DocumentoNumero}
              </td>
              <td className="border p-2">
                {factura.ClienteCodigo} -{" "}
                {factura.t_clientes?.Descripcion || "N/A"}
              </td>
              <td className="border p-2">
                ${factura.ImporteTotal?.toFixed(2)}
              </td>
              <td className="border p-2">
                {factura.VendedorCodigo} -{" "}
                {factura.t_vendedores?.Descripcion || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportesVentas;
