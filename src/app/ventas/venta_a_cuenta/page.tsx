"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { TableVentasACuenta } from "@/app/components/table/TableVentasACuenta";
import { Button } from "@mui/material";

const ClientesSelect = dynamic(
  () => import("@/app/components/select/ClientesSelect"),
  { ssr: false }
);

const Factura: React.FC = () => {
  const [cliente, setCliente] = useState<any>(null);
  const [mostrarSelectCliente, setMostrarSelectCliente] = useState(true);

  return (
    <div>
      <div className="border border-gray-200 rounded-lg">
        {mostrarSelectCliente ? (
          <ClientesSelect onSelect={setCliente} />
        ) : (
          <h3 className="text-lg font-bold">Cliente: {cliente?.label}</h3>
        )}
        {cliente?.label && (
          <div className="flex justify-start ml-4 mb-4">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setMostrarSelectCliente(!mostrarSelectCliente)}
            >
              {mostrarSelectCliente ? "Ocultar Cliente" : "Cambiar cliente"}
            </Button>
          </div>
        )}
      </div>
      {cliente?.label && <TableVentasACuenta cliente={cliente} />}
    </div>
  );
};

export default Factura;
