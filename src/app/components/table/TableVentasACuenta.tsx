"use client";
import React, { useState, useEffect } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  MRT_Localization,
} from "material-react-table";
import { Button, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useVentasACuenta } from "@/hooks/useVentasACuenta";
import { useArticulosByCode } from "@/hooks/useArticulosByCode";
import { ventas_a_cuenta } from "@prisma/client";
import ArticulosBestSelect from "../select/ArticulosBestSelect";
interface TableVentasACuentaProps {
  cliente: any;
}

export const TableVentasACuenta: React.FC<TableVentasACuentaProps> = ({
  cliente,
}) => {
  const [codigoCliente, setCodigoCliente] = useState(cliente?.value || "");
  const { data, refetch } = useVentasACuenta(codigoCliente);
  const [listaArticulos, setListaArticulos] = useState<ventas_a_cuenta[]>([]);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  useEffect(() => {
    setCodigoCliente(cliente?.value);
    refetch();
    setListaArticulos((data as any) || []);
  }, [cliente, data]);

  const columns: MRT_ColumnDef<any>[] = [
    {
      accessorKey: "select",
      header: "",
      size: 50,
      Cell: ({ row }) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(row.original.id)}
          onChange={() => handleRowSelection(row.original.id)}
        />
      ),
    },
    {
      accessorKey: "id",
      header: "ID",
      size: 50,
      enableHiding: true,
    },
    {
      accessorKey: "codigoArticulo",
      header: "Codigo",
      size: 50,
    },
    {
      accessorKey: "cantidad",
      header: "Cantidad",
      size: 50,
      Cell: ({ row }) =>
        editingRow === row.index ? (
          <TextField
            type="number"
            value={row.original.cantidad}
            onChange={(e) =>
              handleEditChange(row.index, "cantidad", e.target.value)
            }
          />
        ) : (
          row.original.cantidad
        ),
    },
    {
      accessorKey: "descripcion",
      header: "Nombre Articulo",
    },
    {
      accessorKey: "observacion",
      header: "Observacion",
    },
    {
      accessorKey: "fecha",
      header: "Fecha",
      Cell: ({ row }) =>
        editingRow === row.index ? (
          <TextField
            type="date"
            value={row.original.fecha.split("T")[0]}
            onChange={(e) =>
              handleEditChange(row.index, "fecha", e.target.value)
            }
          />
        ) : (
          new Date(row.original.fecha).toLocaleDateString()
        ),
    },
    {
      accessorKey: "fechaLimite",
      header: "Fecha Limite",
      Cell: ({ row }) =>
        editingRow === row.index ? (
          <TextField
            type="date"
            value={row.original.fechaLimite.split("T")[0]}
            onChange={(e) =>
              handleEditChange(row.index, "fechaLimite", e.target.value)
            }
          />
        ) : (
          new Date(row.original.fechaLimite).toLocaleDateString()
        ),
      size: 50,
    },
    {
      accessorKey: "actions",
      header: "Acciones",
      Cell: ({ row }) => (
        <div>
          {editingRow === row.index ? (
            <>
              <IconButton onClick={() => handleSave(row.original)}>
                <SaveIcon />
              </IconButton>
              <IconButton onClick={() => setEditingRow(null)}>
                <CancelIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={() => setEditingRow(row.index)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(row.original)}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </div>
      ),
    },
  ];

  const [nuevoArticulo, setNuevoArticulo] = useState<any>({
    codigoArticulo: "",
    cantidad: 0,
    codigoCliente: cliente?.value,
    observacion: "",
    Descripcion: "",
    fecha: new Date().toISOString().split("T")[0], // Cambiado a string
    fechaLimite: new Date(new Date().setDate(new Date().getDate() + 30))
      .toISOString()
      .split("T")[0], // Cambiado a string y sumar 30 días
  });

  const repDataArticulo = useArticulosByCode(nuevoArticulo.codigoArticulo);
  const articuloData: any = repDataArticulo.data;
  const isLoading = repDataArticulo.isLoading;
  const error = repDataArticulo.error;

  useEffect(() => {
    if (articuloData && !isLoading && !error) {
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
      nuevoArticuloConDatos.codigoCliente = cliente?.value;

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
          codigoCliente: cliente?.value,
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

  const handleEditChange = (index: number, field: string, value: string) => {
    setListaArticulos((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleSave = async (articulo: any) => {
    try {
      articulo.codigoCliente = cliente?.value;
      const articuloToUpdate = {
        ...articulo,
        codigoCliente: cliente?.value,
        cantidad: parseFloat(articulo.cantidad),
        fecha: new Date(articulo.fecha).toISOString(),
        fechaLimite: new Date(articulo.fechaLimite).toISOString(),
      };
      const response = await fetch(`/api/ventasACuenta`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articuloToUpdate),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el artículo");
      }

      setEditingRow(null);
      // Opcionalmente, puedes refrescar los datos aquí
      refetch();
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const handleDelete = async (articulo: any) => {
    const response = await fetch("/api/ventasACuenta", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: articulo.id }),
    });
    refetch();
  };

  const handleRowSelection = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === listaArticulos.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(listaArticulos.map((articulo) => articulo.id));
    }
  };

  const handleFacturarSeleccionados = () => {
    // Implementar lógica para facturar los artículos seleccionados
    console.log("Facturar seleccionados:", selectedRows);
    //paso 1 crear la factura

    //paso 2 eliminar los artículos seleccionados de la tabla ventas a cuenta
    //paso 3 actualizar el estado de la tabla
    refetch();
  };

  const handleFacturarTodos = () => {
    // seleccionar todos los artículos
    setSelectedRows(listaArticulos.map((articulo) => articulo.id));
    //facturar seleccionados
    handleFacturarSeleccionados();
  };

  const localization: Partial<MRT_Localization> = {
    noRecordsToDisplay: "No hay artículos para mostrar",
  };

  return (
    <div className="border border-gray-200 rounded-lg">
      <div className="flex gap-4 p-4">
        {/* <TextField
          label="Código"
          value={nuevoArticulo.codigoArticulo}
          onChange={(e) =>
            setNuevoArticulo({
              ...nuevoArticulo,
              codigoArticulo: e.target.value,
            })
          }
        /> */}
        <div className="w-1/2">
          <ArticulosBestSelect
            onChange={(e: any) =>
              setNuevoArticulo({
                ...nuevoArticulo,
                codigoArticulo: e,
              })
            }
          />
        </div>
        <div className="w-1/8">
          <TextField
            label="Cant."
            type="number"
            value={nuevoArticulo.cantidad}
            onChange={(e) =>
              setNuevoArticulo({
                ...nuevoArticulo,
                cantidad: parseInt(e.target.value) || 0,
              })
            }
          />
        </div>
        <div className="w-4/8">
          <TextField
            label="Observación"
            value={nuevoArticulo.observacion}
            onChange={(e) =>
              setNuevoArticulo({
                ...nuevoArticulo,
                observacion: e.target.value,
              })
            }
          />
        </div>
        <div className="w-3/8">
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
      </div>
      <div className="flex wrap items-center p-4 mb-4">
        <Button variant="contained" color="primary" onClick={handleAgregarFila}>
          Agregar
        </Button>
      </div>

      <div className="flex gap-4 p-4">
        <Button variant="contained" color="primary" onClick={handleSelectAll}>
          {selectedRows.length === listaArticulos.length
            ? "Deseleccionar todos"
            : "Seleccionar todos"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleFacturarSeleccionados}
        >
          Facturar Seleccionados
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleFacturarTodos}
        >
          Facturar Todos
        </Button>
      </div>

      <MaterialReactTable
        columns={columns}
        data={listaArticulos.reverse()}
        initialState={{
          columnVisibility: { id: false, codigoArticulo: false },
        }}
        enableColumnActions={false}
        enableColumnFilters={false}
        enablePagination={false}
        enableSorting={false}
        muiTableBodyRowProps={{ hover: false }}
        localization={localization}
      />
    </div>
  );
};
