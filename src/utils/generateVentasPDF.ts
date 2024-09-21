import jsPDF from "jspdf";
import "jspdf-autotable";
import { Factura, Vendedor } from "@/types";

interface GeneratePDFProps {
  facturas: Factura[];
  fechaInicio: Date;
  fechaFin: Date;
  vendedor: string | null;
  totalImporte: number;
  porcentajeComision: number;
  comisionTotal: number;
}

export const generateVentasPDF = ({
  facturas,
  fechaInicio,
  fechaFin,
  vendedor,
  totalImporte,
  porcentajeComision,
  comisionTotal,
}: GeneratePDFProps) => {
  const doc = new jsPDF();

  // Título
  doc.setFontSize(18);
  doc.text("Informe de Ventas", 14, 20);

  // Nombre de la empresa (reemplaza con el nombre real)
  doc.setFontSize(14);
  doc.text("Nombre de la Empresa", 14, 30);

  // Información de filtros
  doc.setFontSize(10);
  doc.text(`Fecha Inicio: ${fechaInicio.toLocaleDateString()}`, 14, 40);
  doc.text(`Fecha Fin: ${fechaFin.toLocaleDateString()}`, 14, 45);
  doc.text(`Vendedor: ${vendedor || "Todos"}`, 14, 50);

  // Tabla de facturas
  const tableColumn = [
    "Tipo",
    "Sucursal",
    "Número",
    "Fecha",
    "Cliente",
    "Importe",
    "Vendedor",
  ];
  const tableRows = facturas.map((factura) => [
    factura.DocumentoTipo,
    factura.DocumentoSucursal,
    factura.DocumentoNumero,
    new Date(factura.Fecha).toLocaleDateString(),
    `${factura.ClienteCodigo} - ${factura.t_clientes?.Descripcion || "N/A"}`,
    `$${factura.ImporteTotal?.toFixed(2)}`,
    `${factura.VendedorCodigo} - ${factura.t_vendedores?.Descripcion || "N/A"}`,
  ]);

  (doc as any).autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 60,
  });

  // Totales y comisión
  const finalY = (doc as any).lastAutoTable.finalY || 60;
  doc.text(`Total Importe: $${totalImporte.toFixed(2)}`, 14, finalY + 10);
  doc.text(`Porcentaje de Comisión: ${porcentajeComision}%`, 14, finalY + 15);
  doc.text(`Comisión Total: $${comisionTotal.toFixed(2)}`, 14, finalY + 20);

  // Guardar el PDF
  doc.save("informe_ventas.pdf");
};
