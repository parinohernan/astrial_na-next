"use client";
import React, { useState, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import ProveedorSelect from "@/app/components/ProveedorSelect";
import {
  handleEliminar,
  handleVer,
  handleActualizar,
} from "@/app/utilidades/handlers/index";

const CargarDesdePlanilla: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultadosActualizacion, setResultadosActualizacion] = useState<
    Array<{
      codigo: string;
      descripcionExcel: string;
      descripcionBD: string;
      precioCostoExcel: number;
      precioCostoBD: number;
    }>
  >([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedProveedor, setSelectedProveedor] = useState<any>(null); // Estado para el proveedor seleccionado

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const bstr = e.target?.result as string;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const rawData = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];

      const headers = rawData[0] as string[];
      setColumns(headers);
      setData(rawData.slice(1));
      setSelectedColumns([]);
      setFilteredData(rawData.slice(1)); // Inicialmente, mostrar todos los datos
    };
    reader.readAsBinaryString(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleColumnSelect = (column: string) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((c) => c !== column)
        : [...prev, column]
    );
  };

  const handleDiscardFile = () => {
    setFile(null);
    setColumns([]);
    setSelectedColumns([]);
    setData([]);
    setFilteredData([]); // Reiniciar los datos filtrados
  };

  const handleDeleteRow = (rowIndex: number) => {
    handleEliminar(rowIndex, setFilteredData); // Llamar al handler con el índice y la función de estado
  };

  const handleBuscarRelacionados = async () => {
    try {
      const codigosProveedorArticulo = filteredData.map((row) =>
        String(row[0])
      );

      const response = await fetch("/api/articulos-por-proveedor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigosProveedorArticulo,
          proveedorCodigo: selectedProveedor?.Codigo, // Enviar el ProveedorCodigo
        }),
      });

      if (!response.ok) {
        throw new Error("Error al obtener artículos");
      }

      const articulosBD = await response.json();

      // Filtrar los datos para mostrar solo los relacionados
      const relacionados = filteredData
        .map((row) => {
          const codigo = String(row[0]);
          const articulo = articulosBD.find(
            (art: { ProveedorArticuloCodigo: string }) =>
              art.ProveedorArticuloCodigo === codigo
          );

          if (articulo) {
            const precioCostoExcel = parseFloat(
              row[columns.indexOf("Precio1")]
            ).toFixed(2); // Redondear a 2 decimales
            const precioCostoBD = parseFloat(articulo.PrecioCosto).toFixed(2); // Convertir a float con dos decimales

            const diferencia = (
              parseFloat(precioCostoBD) - parseFloat(precioCostoExcel)
            ).toFixed(2); // Redondear a 2 decimales
            console.log(diferencia);

            const diferenciaNum = parseFloat(diferencia); // Convertir a número

            const precioCambio =
              diferenciaNum > 0 ? "↑" : diferenciaNum < 0 ? "↓" : "="; // Flechas para indicar el cambio

            return {
              ...row,
              codigoBD: articulo.Codigo,
              descripcionBD: articulo.Descripcion,
              precioCostoBD: precioCostoBD,
              precioCostoExcel: precioCostoExcel,
              precioCambio: precioCambio,
              diferencia: diferencia, // Agregar la diferencia
            };
          }

          return null; // Si no se encuentra el artículo, retorna null
        })
        .filter(Boolean); // Filtra los nulls

      setFilteredData(relacionados);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cargar desde Lista Excel</h1>

      {!file && (
        <div className="flex">
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 p-4 mb-4 text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Suelta el archivo aquí...</p>
            ) : (
              <p>
                Arrastra y suelta un archivo Excel aquí, o haz clic para
                seleccionar uno
              </p>
            )}
          </div>
          <ProveedorSelect onSelect={setSelectedProveedor} />{" "}
          {/* Agrega el nuevo componente aquí */}
        </div>
      )}

      {file && columns.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">
            Archivo cargado: {file.name}
          </h2>
          <p>Columnas detectadas: {columns.join(", ")}</p>
          <p>Número de filas de datos: {data.length}</p>
          {selectedProveedor && (
            <p className="text-lg font-semibold mb-2">
              Proveedor: {selectedProveedor.Codigo} -{" "}
              {selectedProveedor.Descripcion}
            </p>
          )}
          <h3 className="text-lg font-semibold mb-2">
            Selecciona las columnas:
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {columns.map((column, index) => (
              <button
                key={index}
                onClick={() => handleColumnSelect(column)}
                className={`px-3 py-1 rounded ${
                  selectedColumns.includes(column)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {column}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDiscardFile}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Descartar archivo
            </button>
            <button
              // onClick={handleActualizarPrecios}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Actualizar precios
            </button>
            <button
              onClick={handleBuscarRelacionados}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Buscar relacionados
            </button>
          </div>
        </div>
      )}
      {selectedColumns.length > 0 && filteredData.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Contenido:</h3>
          <p>Filas mostradas: {filteredData.length}</p>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                {selectedColumns.map((column, index) => (
                  <th key={index} className="border border-gray-300 px-4 py-2">
                    {column}
                  </th>
                ))}
                <th className="border border-gray-300 px-4 py-2">
                  Descripción BD
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Precio Costo
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Cambio de Precio
                </th>
                <th className="border border-gray-300 px-4 py-2">Acciones</th>{" "}
                {/* Nueva columna de acciones */}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {selectedColumns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {row[columns.indexOf(column)]}
                    </td>
                  ))}
                  <td className="border border-gray-300 px-4 py-2">
                    {row.descripcionBD}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.precioCostoBD}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.precioCambio} {/* Mostrar el símbolo de cambio */}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleDeleteRow(rowIndex)} // Implementar la función handleEliminar
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => handleVer(row)} // Implementar la función handleVer
                      className="bg-blue-500 text-white px-2 py-1 rounded mx-1"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => handleActualizar(row)} // Implementar la función handleActualizar
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Actualizar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CargarDesdePlanilla;
