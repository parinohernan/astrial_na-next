"use client";
import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";

import { Button, TextField } from "@mui/material";
import { useVentasACuenta } from "@/hooks/useVentasACuenta";
import { useArticulosByCode } from "@/hooks/useArticulosByCode";
import { ventas_a_cuenta } from "@prisma/client";

interface TableVentasACuentaProps {
  cliente: any; // Añade esta línea
}

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

  const columns: MRT_ColumnDef<any>[] = [
    {
      accessorKey: "codigoArticulo",
      header: "Codigo Articulo",
      size: 50,
    },
    {
      accessorKey: "cantidad",
      header: "Cantidad",
      size: 50,
    },
    {
      accessorKey: "descripcion",
      header: "Nombre Articulo",
    },
    // {
    //   accessorKey: "precio",
    //   header: "Precio unitario",
    //   Cell: ({ cell }) => {
    //     const precioUnitario = cell.getValue() as number;
    //     const precioFormateado = precioUnitario?.toFixed(2);
    //     return precioUnitario ? precioFormateado : "";
    //   },
    //   size: 50,
    // },
    {
      accessorKey: "observacion",
      header: "Observacion",
    },
    {
      accessorKey: "fecha",
      header: "Fecha",
      Cell: ({ cell }) => {
        const fecha = cell.getValue();
        if (typeof fecha === "string") {
          return new Date(fecha).toLocaleDateString();
        }
        return "";
      },
    },
    {
      accessorKey: "fechaLimite",
      header: "Fecha Limite",
      Cell: ({ cell }) => {
        const fechaLimite = cell.getValue();
        if (typeof fechaLimite === "string") {
          return new Date(fechaLimite).toLocaleDateString();
        }
        return "";
      },
      size: 50,
    },
  ];

  const [nuevoArticulo, setNuevoArticulo] = useState<any>({
    codigoArticulo: "",
    cantidad: 0,
    codigoCliente: cliente,
    observacion: "",
    fecha: new Date().toISOString().split("T")[0], // Cambiado a string
    fechaLimite: new Date(new Date().setDate(new Date().getDate() + 30))
      .toISOString()
      .split("T")[0], // Cambiado a string y sumar 30 días
  });

  const {
    data: articuloData,
    isLoading,
    error,
  } = useArticulosByCode(nuevoArticulo.codigoArticulo);

  useEffect(() => {
    if (articuloData && !isLoading && !error) {
      console.log("articuloData", articuloData);
    }
  }, [articuloData, isLoading, error]);

  const handleAgregarFila = async () => {
    if (articuloData && !isLoading && !error) {
      console.log("articuloData", articuloData);
      const nuevoArticuloConDatos = {
        ...nuevoArticulo,
        descripcion: articuloData.Descripcion || "Artículo desconocido",
        // precio: articuloData.Precio || 0,
      };

      setListaArticulos((prev) => [...prev, nuevoArticuloConDatos]);
      // Reiniciar nuevo artículo
      setNuevoArticulo({
        codigoArticulo: "",
        cantidad: 0,
        codigoCliente: cliente,
        observacion: "",
        fecha: new Date().toISOString().split("T")[0], // Cambiado a string
        fechaLimite: new Date(new Date().setDate(new Date().getDate() + 30))
          .toISOString()
          .split("T")[0], // Cambiado a string - 30 días
      });
      //grabar en la base de datos
      nuevoArticuloConDatos.codigoCliente = cliente;

      const response = await fetch("/api/ventasACuenta", {
        method: "POST",
        body: JSON.stringify(nuevoArticuloConDatos),
      });
      console.log("response", response);
    }
  };

  return (
    <div>
      <div>
        <TextField
          label="Código"
          value={nuevoArticulo.codigoArticulo}
          onChange={(e) =>
            setNuevoArticulo({
              ...nuevoArticulo,
              codigoArticulo: e.target.value,
            })
          }
          onBlur={(e) => {
            console.log("codigoArticulo", e.target.value);
          }}
        />
        <TextField
          label="Cantidad"
          type="number"
          value={nuevoArticulo.cantidad}
          onChange={(e) =>
            setNuevoArticulo({
              ...nuevoArticulo,
              cantidad: parseInt(e.target.value) || 0,
            })
          }
        />
        <TextField
          label="Observación"
          value={nuevoArticulo.observacion}
          onChange={(e) =>
            setNuevoArticulo({ ...nuevoArticulo, observacion: e.target.value })
          }
        />
        {/* <TextField
          label="Fecha Facturación"
          type="date"
          value={nuevoArticulo.fecha}
          onChange={(e) =>
            setNuevoArticulo({
              ...nuevoArticulo,
              fecha: e.target.value,
            })
          }
          InputLabelProps={{
            shrink: true,
          }}
        /> */}
        <TextField
          label="Fecha Límite"
          type="date"
          value={nuevoArticulo.fechaLimite}
          onChange={(e) =>
            setNuevoArticulo({
              ...nuevoArticulo,
              fecha: new Date().toISOString().split("T")[0],
              fechaLimite: e.target.value,
            })
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button onClick={handleAgregarFila}>Agregar</Button>
      </div>

      <MaterialReactTable
        columns={columns}
        data={listaArticulos.reverse()}
        enableColumnActions={false}
        enableColumnFilters={false}
        enablePagination={false}
        enableSorting={false}
        muiTableBodyRowProps={{ hover: false }}
      />
    </div>
  );
};
