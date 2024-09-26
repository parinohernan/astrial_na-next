"use client";
import React, { useState, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";

const CargarDesdePlanilla: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);

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
  };

  const filteredData = useMemo(() => {
    if (selectedColumns.length === 0) return [];
    return data.filter((row) =>
      selectedColumns.every((column) => {
        const value = row[columns.indexOf(column)];
        return value !== undefined && value !== null && value !== "";
      })
    );
  }, [data, columns, selectedColumns]);

  const handleDeleteRow = (rowIndex: number) => {
    setData((prevData) => prevData.filter((_, index) => index !== rowIndex));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cargar desde Lista Excel</h1>

      {!file && (
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
      )}

      {file && columns.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">
            Archivo cargado: {file.name}
          </h2>
          <p>Columnas detectadas: {columns.join(", ")}</p>
          <p>Número de filas de datos: {data.length}</p>
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
          <button
            onClick={handleDiscardFile}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Descartar archivo
          </button>
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
                <th className="border border-gray-300 px-4 py-2">Acciones</th>
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
                    <button
                      onClick={() => handleDeleteRow(data.indexOf(row))}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Eliminar
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
