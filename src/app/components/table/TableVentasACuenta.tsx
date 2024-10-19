"use client";
import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { Button, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
  // const [articuloData, setArticuloData] = useState<any>(null);

  useEffect(() => {
    setCodigoCliente(cliente);
    refetch();
    setListaArticulos((data as any) || []);
    console.log("articulos", data);
  }, [cliente, data]);

  const columns: MRT_ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "ID",
      size: 50,
    },
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
    {
      accessorKey: "actions",
      header: "Acciones",
      Cell: ({ row }) => (
        <div>
          <IconButton onClick={() => handleEdit(row.original)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.original)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const [nuevoArticulo, setNuevoArticulo] = useState<any>({
    codigoArticulo: "",
    cantidad: 0,
    codigoCliente: cliente,
    observacion: "",
    Descripcion: "",
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
      setArticuloDescripcion(articuloData.Descripcion);
    }
  }, [articuloData, isLoading, error]);

  const [articuloDescripcion, setArticuloDescripcion] = useState("");

  const handleAgregarFila = async () => {
    if (articuloData && !isLoading && !error) {
      const nuevoArticuloConDatos = {
        ...nuevoArticulo,
        descripcion: articuloData.Descripcion || "Artículo desconocido",
      };

      //grabar en la base de datos
      nuevoArticuloConDatos.codigoCliente = cliente;

      try {
        const response = await fetch("/api/ventasACuenta", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevoArticuloConDatos),
        });

        if (!response.ok) {
          throw new Error("Error al insertar el artículo");
        }

        const data = await response.json();

        // Añadir el ID recibido al nuevo artículo
        const articuloConId = { ...nuevoArticuloConDatos, id: data.id };

        setListaArticulos((prev) => [...prev, articuloConId]);

        // Reiniciar nuevo artículo
        setNuevoArticulo({
          codigoArticulo: "",
          cantidad: 0,
          codigoCliente: cliente,
          observacion: "",
          descripcion: "",
          fecha: new Date().toISOString().split("T")[0],
          fechaLimite: new Date(new Date().setDate(new Date().getDate() + 30))
            .toISOString()
            .split("T")[0],
        });
        setArticuloDescripcion(""); // Limpiar la descripción del artículo
        // setCodigoArticuloInput(""); // Limpiar el input del código de artículo
      } catch (error) {
        console.error("Error al agregar el artículo:", error);
        // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    }
  };

  const handleEdit = (articulo: any) => {
    // Lógica para editar el artículo
    console.log("Editar", articulo);
  };

  const handleDelete = async (articulo: any) => {
    console.log("Eliminar", articulo, listaArticulos);
    const response = await fetch("/api/ventasACuenta", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: articulo.id }),
    });
    console.log("delete response", response);
    refetch();
  };

  return (
    <div className="border border-gray-200 rounded-lg">
      <div className="flex gap-4 p-4">
        <TextField
          label="Código"
          value={nuevoArticulo.codigoArticulo}
          onChange={(e) =>
            setNuevoArticulo({
              ...nuevoArticulo,
              codigoArticulo: e.target.value,
            })
          }
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
      </div>
      <div className="flex wrap items-center p-4 mb-4">
        <Button variant="contained" color="primary" onClick={handleAgregarFila}>
          Agregar
        </Button>
        <h3 className="pl-4">
          {articuloData ? (
            <h3>
              " "
              {articuloDescripcion !== ""
                ? articuloDescripcion
                : "No existe el articulo"}
            </h3>
          ) : (
            <h3 className="text-red-500">"No existe el articulo"</h3>
          )}
        </h3>
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
