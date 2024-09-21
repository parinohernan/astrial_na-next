"use client";

import React, { useState, useMemo } from "react";
import { useFacturas } from "@/hooks/useFacturas";
import Pagination from "@/app/components/pagination";
import VentasFilters from "@/app/components/VentasFilters/index";
import FacturasTable from "@/app/components/FacturasTable/index";
import { Vendedor } from "@/app/components/select/SelectVendedores";

const ReportesVentas: React.FC = () => {
  const [fechaInicio, setFechaInicio] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [fechaFin, setFechaFin] = useState<Date>(new Date());
  const [vendedor, setVendedor] = useState<Vendedor | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [porcentajeComision, setPorcentajeComision] = useState<number>(0);

  const { data: facturas, isLoading, error } = useFacturas();

  const facturasFiltradas = useMemo(() => {
    if (!facturas) return [];
    return facturas.filter((factura) => {
      const fechaFactura = new Date(factura.Fecha);
      return (
        fechaFactura >= fechaInicio &&
        fechaFactura <= fechaFin &&
        (vendedor === null || factura.VendedorCodigo === vendedor.Codigo)
      );
    });
  }, [facturas, fechaInicio, fechaFin, vendedor]);

  const totalImporte = useMemo(() => {
    return facturasFiltradas.reduce(
      (sum, factura) => sum + (factura.ImporteTotal || 0),
      0
    );
  }, [facturasFiltradas]);

  const comisionTotal = useMemo(() => {
    return totalImporte * (porcentajeComision / 100);
  }, [totalImporte, porcentajeComision]);

  const totalPages = Math.ceil(facturasFiltradas.length / pageSize);
  const facturasEnPagina = facturasFiltradas.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (isLoading) return <div>Cargando facturas...</div>;
  if (error) return <div>Error al cargar las facturas</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Reportes de Ventas</h2>

      <VentasFilters
        fechaInicio={fechaInicio}
        setFechaInicio={setFechaInicio}
        fechaFin={fechaFin}
        setFechaFin={setFechaFin}
        vendedor={vendedor}
        setVendedor={setVendedor}
        porcentajeComision={porcentajeComision}
        setPorcentajeComision={setPorcentajeComision}
      />

      <div className="mb-4">
        <p className="font-bold">Total Importe: ${totalImporte.toFixed(2)}</p>
        <p className="font-bold">Comisión Total: ${comisionTotal.toFixed(2)}</p>
      </div>

      <FacturasTable facturas={facturasEnPagina} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
};

export default ReportesVentas;

// "use client";

// import React, { useState, useMemo } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import SelectVendedores, {
//   Vendedor,
// } from "../../components/select/SelectVendedores";
// import { useFacturas } from "@/hooks/useFacturas";
// import Pagination from "@/app/components/pagination";

// const ReportesVentas: React.FC = () => {
//   const [fechaInicio, setFechaInicio] = useState<Date>(
//     new Date(new Date().getFullYear(), new Date().getMonth(), 1)
//   );
//   const [fechaFin, setFechaFin] = useState<Date>(new Date());
//   const [vendedor, setVendedor] = useState<Vendedor | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(20);

//   const { data: facturas, isLoading, error } = useFacturas();

//   const filtrarFacturas = () => {
//     if (!facturas) return [];
//     return facturas.filter((factura) => {
//       const fechaFactura = new Date(factura.Fecha);
//       return (
//         fechaFactura >= fechaInicio &&
//         fechaFactura <= fechaFin &&
//         (vendedor === null || factura.VendedorCodigo === vendedor.Codigo)
//       );
//     });
//   };

//   const facturasFiltradas = filtrarFacturas();
//   const totalPages = Math.ceil(facturasFiltradas.length / pageSize);
//   const facturasEnPagina = facturasFiltradas.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   if (isLoading) return <div>Cargando facturas...</div>;
//   if (error) return <div>Error al cargar las facturas</div>;

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Reportes de Ventas</h2>

//       <div className="mb-4 flex space-x-4">
//         <div>
//           <label className="block mb-2">Fecha Inicio:</label>
//           <DatePicker
//             selected={fechaInicio}
//             onChange={(date) => setFechaInicio(date || new Date())}
//             className="border p-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="block mb-2">Fecha Fin:</label>
//           <DatePicker
//             selected={fechaFin}
//             onChange={(date) => setFechaFin(date || new Date())}
//             className="border p-2 rounded"
//           />
//         </div>
//         <SelectVendedores value={vendedor} onChange={setVendedor} />
//       </div>

//       <table className="w-full border-collapse border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Tipo</th>
//             <th className="border p-2">Sucursal</th>
//             <th className="border p-2">Número</th>
//             <th className="border p-2">Fecha</th>
//             <th className="border p-2">Cliente</th>
//             <th className="border p-2">Importe</th>
//             <th className="border p-2">Vendedor</th>
//           </tr>
//         </thead>
//         <tbody>
//           {facturasEnPagina.map((factura) => (
//             <tr
//               key={`${factura.DocumentoTipo}-${factura.DocumentoSucursal}-${factura.DocumentoNumero}`}
//             >
//               <td className="border p-2">{factura.DocumentoTipo}</td>
//               <td className="border p-2">{factura.DocumentoSucursal}</td>
//               <td className="border p-2">{factura.DocumentoNumero}</td>
//               <td className="border p-2">
//                 {new Date(factura.Fecha).toLocaleDateString()}
//               </td>
//               <td className="border p-2">
//                 {factura.ClienteCodigo} -{" "}
//                 {factura.t_clientes?.Descripcion || "N/A"}
//               </td>
//               <td className="border p-2">
//                 ${factura.ImporteTotal?.toFixed(2)}
//               </td>
//               <td className="border p-2">
//                 {factura.VendedorCodigo} -{" "}
//                 {factura.t_vendedores?.Descripcion || "N/A"}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={setCurrentPage}
//         pageSize={pageSize}
//         onPageSizeChange={setPageSize}
//       />
//     </div>
//   );
// };

// export default ReportesVentas;
