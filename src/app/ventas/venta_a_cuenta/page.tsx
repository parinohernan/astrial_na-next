"use client";
import React, { useState, useEffect } from "react";
import { useClientes } from "@/hooks/useClientes";
import ClientesSelect from "@/app/components/select/ClientesSelect";
import ComprobanteSelect from "@/app/components/select/ComprobanteSelect";
import ArticulosList from "@/app/components/select/ArticulosList";
import Totales from "@/app/components/ui/elementos/Totales";
import ModalTipoPago from "@/app/components/modal/ModalTipoPago";
import { TableVentasACuenta } from "@/app/components/table/TableVentasACuenta";
import { Button } from "@mui/material";

const Factura: React.FC = () => {
  const [cliente, setCliente] = useState<string | null>(null);
  const [mostrarSelectCliente, setMostrarSelectCliente] = useState(true);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ventas A Cuenta</h2>
      <div className="flex justify-between items-center mb-4">
        {mostrarSelectCliente && <ClientesSelect onSelect={setCliente} />}
        {cliente && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setMostrarSelectCliente(!mostrarSelectCliente)}
          >
            {mostrarSelectCliente ? "Ocultar Clientes" : "Cambiar cliente"}
          </Button>
        )}
      </div>

      <TableVentasACuenta cliente={cliente} />
    </div>
  );
};

export default Factura;
