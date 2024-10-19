"use client";
import React, { useMemo } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { Button } from "@mui/material";
import { useVentasACuenta } from "@/hooks/useVentasACuenta";
// import { Cliente } from "@/types/Cliente";
import { Articulo } from "@/types/articulo";
// interface Articulo {
//   id: number;
//   nombre: string;
//   cantidad: number;
//   precio: number;
// }

interface TableVentasACuentaProps {
  //   articulos: Articulo[];
  //   agregarArticulo: (articulo: Articulo) => void;
  cliente: any; // Añade esta línea
}
console.log("cliente en table");
export const TableVentasACuenta: React.FC<TableVentasACuentaProps> = ({
  //   articulos,
  //   agregarArticulo,
  cliente,
}) => {
  console.log("cliente en tabl", cliente);

  const { data: articulos, isLoading, error } = useVentasACuenta();
  console.log("articulos", articulos);

  const columns: MRT_ColumnDef<Articulo>[] = [
    {
      accessorKey: "codigoArticulo",
      header: "Codigo Articulo",
    },

    {
      accessorKey: "fecha",
      header: "Fecha",
    },
    {
      accessorKey: "nombreArticulo",
      header: "Nombre Articulo",
    },
    {
      accessorKey: "cantitad",
      header: "Cantidad",
    },
    {
      accessorKey: "observacion",
      header: "Observacion",
    },
  ];

  return (
    <div>
      <h1>Cliente: hola{cliente}</h1>
      <MaterialReactTable
        columns={columns}
        data={articulos as any}
        enableColumnActions={false}
        enableColumnFilters={false}
        enablePagination={false}
        enableSorting={false}
        muiTableBodyRowProps={{ hover: false }}
      />
    </div>
  );
};
