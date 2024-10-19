"use client";
import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { Button } from "@mui/material";
import { useVentasACuenta } from "@/hooks/useVentasACuenta";
import { useArticulosByCode } from "@/hooks/useArticulosByCode";
import { Articulo } from "@/types/articulo";
import { ventas_a_cuenta } from "@prisma/client";
// import { ventas_a_cuenta } from "@/types/ventas_a_cuenta";

interface TableVentasACuentaProps {
  cliente: any; // Añade esta línea
}
console.log("cliente en table");
export const TableVentasACuenta: React.FC<TableVentasACuentaProps> = ({
  cliente,
}) => {
  const [codigoCliente, setCodigoCliente] = useState(cliente);
  const { data, refetch } = useVentasACuenta(codigoCliente);
  const [listaArticulos, setListaArticulos] = useState<ventas_a_cuenta[]>([]);

  useEffect(() => {
    setCodigoCliente(cliente);
    refetch();
    setListaArticulos((data as any) || []);
    console.log("articulos", data);
  }, [cliente, data]);

  console.log("cliente en tabl", cliente);

  const fetchArticuloDescripcion = async (codigoArticulo: string) => {
    // Reemplaza esta URL con la URL de tu API
    const response = await fetch(`/api/articulos/${codigoArticulo}`);
    if (!response.ok) {
      throw new Error("Error al obtener la descripción del artículo");
    }
    const data = await response.json();
    return data.descripcion; // Asegúrate de que la respuesta tenga la propiedad 'descripcion'
  };

  const [descripciones, setDescripciones] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const obtenerDescripciones = async () => {
      const nuevasDescripciones: { [key: string]: string } = {};
      for (const articulo of listaArticulos) {
        if (!descripciones[articulo.codigoArticulo as string]) {
          try {
            const descripcion = await fetchArticuloDescripcion(
              articulo.codigoArticulo as string
            );
            nuevasDescripciones[articulo.codigoArticulo as string] =
              descripcion;
          } catch (error) {
            console.error("Error al obtener la descripción:", error);
          }
        }
      }
      setDescripciones((prev) => ({ ...prev, ...nuevasDescripciones }));
    };

    obtenerDescripciones();
  }, [listaArticulos]);

  const columns: MRT_ColumnDef<ventas_a_cuenta>[] = [
    {
      accessorKey: "codigoArticulo",
      header: "Codigo Articulo",
    },
    {
      accessorKey: "cantitad",
      header: "Cantidad",
    },
    {
      accessorKey: "nombreArticulo",
      header: "Nombre Articulo",
      Cell: ({ row }) => {
        const codigoArticulo = row.original.codigoArticulo as string;
        const { data, isLoading, error } = useArticulosByCode(codigoArticulo);
        return data.Descripcion;
      },
      size: 400,
    },
    {
      accessorKey: "observacion",
      header: "Observacion",
    },
    {
      accessorKey: "fecha",
      header: "Fecha",
      Cell: ({ cell }) => {
        const fecha = cell.getValue();
        if (fecha instanceof Date) {
          return fecha.toLocaleDateString();
        } else {
          const parsedDate = new Date(fecha as any);
          return isNaN(parsedDate.getTime())
            ? ""
            : parsedDate.toLocaleDateString();
        }
      },
    },
  ];

  return (
    <div>
      <h1>Cliente: hola{cliente}</h1>
      {listaArticulos.map((articulo: ventas_a_cuenta) => (
        <div key={articulo.codigoArticulo}>
          <p>{articulo.codigoArticulo}</p>
          <p>
            {articulo.fecha instanceof Date
              ? articulo.fecha.toLocaleDateString()
              : ""}
          </p>
          {/* <p>{articulo.nombreArticulo}</p> */}
          <p>{articulo.cantitad}</p>
          <p>{articulo.observacion}</p>
        </div>
      ))}

      <MaterialReactTable
        columns={columns}
        data={listaArticulos}
        enableColumnActions={false}
        enableColumnFilters={false}
        enablePagination={false}
        enableSorting={false}
        muiTableBodyRowProps={{ hover: false }}
      />
    </div>
  );
};
