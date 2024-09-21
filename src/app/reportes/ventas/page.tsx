"use client";

import React, { useState, useMemo } from "react";
import { useFacturas } from "@/hooks/useFacturas";
import Pagination from "@/app/components/pagination";
import VentasFilters from "@/app/components/VentasFilters/index";
import FacturasTable from "@/app/components/FacturasTable/index";
import { Vendedor } from "@/types";
import { generateVentasPDF } from "@/utils/generateVentasPDF";

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

  const handleExportPDF = () => {
    generateVentasPDF({
      facturas: facturasFiltradas,
      fechaInicio,
      fechaFin,
      vendedor: vendedor
        ? `${vendedor.Codigo} - ${vendedor.Descripcion}`
        : null,
      totalImporte,
      porcentajeComision,
      comisionTotal,
    });
  };

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

      <div className="mb-4 flex justify-between items-center">
        <div>
          <p className="font-bold">Total Importe: ${totalImporte.toFixed(2)}</p>
          <p className="font-bold">
            Comisión Total: ${comisionTotal.toFixed(2)}
          </p>
        </div>
        <button
          onClick={handleExportPDF}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Exportar a PDF
        </button>
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
