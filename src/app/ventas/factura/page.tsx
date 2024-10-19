"use client";
import React, { useState, useEffect } from "react";
import { useClientes } from "@/hooks/useClientes";
import ClientesSelect from "@/app/components/select/ClientesSelect";
import ComprobanteSelect from "@/app/components/select/ComprobanteSelect";
import ArticulosList from "@/app/components/select/ArticulosList";
import Totales from "@/app/components/ui/elementos/Totales";
import ModalTipoPago from "@/app/components/modal/ModalTipoPago";

const Factura: React.FC = () => {
  const [cliente, setCliente] = useState<string | null>(null);
  const [tipoComprobante, setTipoComprobante] = useState<string | null>(null);
  const [articulos, setArticulos] = useState<
    { descripcion: string; cantidad: number; precio: number }[]
  >([]);
  const [modalTipoPagoOpen, setModalTipoPagoOpen] = useState(false);

  const agregarArticulo = (articulo: {
    descripcion: string;
    cantidad: number;
    precio: number;
  }) => {
    setArticulos((prev) => [...prev, articulo]);
  };

  const calcularTotal = () => {
    return articulos.reduce(
      (total, articulo) => total + articulo.precio * articulo.cantidad,
      0
    );
  };

  const handleSubmit = () => {
    // Aquí puedes manejar el envío de datos, incluyendo el tipo de pago
    setModalTipoPagoOpen(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Factura</h2>
      <ClientesSelect onSelect={setCliente} />
      <ComprobanteSelect onSelect={setTipoComprobante} />
      <ArticulosList />
      <Totales total={calcularTotal()} />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Finalizar
      </button>
      <ModalTipoPago
        isOpen={modalTipoPagoOpen}
        onClose={() => setModalTipoPagoOpen(false)}
      />
    </div>
  );
};

export default Factura;
