"use client";
import React, { useState } from "react";
import TablaArticulos from "@/app/components/Articulos/TablaArticulos";
import ResultadosAnalisis from "@/app/components/Articulos/ResultadosAnalisis";
import FormularioActualizacion from "@/app/components/Articulos/FormularioActualizacion";
import { Articulo } from "@/types";

// ... (interfaces y tipos se mantienen igual)

const ActualizarPrecios: React.FC = () => {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [articulosAnalizados, setArticulosAnalizados] = useState<Articulo[]>(
    []
  );
  const [codigosClientes, setCodigosClientes] = useState<string>("");
  const [preciosFinales, setPreciosFinales] = useState<string>("");

  const handleAgregarArticulo = () => {
    const nuevoArticulo: Articulo = {
      Codigo: "",
      Descripcion: "",
      ProveedorCodigo: "",
      RubroCodigo: "",
      PrecioCosto: 0,
      Lista1: 0,
      Lista2: 0,
      Lista3: 0,
      Lista4: 0,
      Lista5: 0,
      Existencia: 0,
      StockMinimo: 0,
      StockMaximo: 0,
    };
    setArticulos([...articulos, nuevoArticulo]);
  };

  const handleCambioArticulo = (
    index: number,
    campo: keyof Articulo,
    valor: string | number
  ) => {
    const nuevosArticulos = [...articulos];
    nuevosArticulos[index][campo] = valor as never;
    setArticulos(nuevosArticulos);
  };

  const handleAnalizar = () => {
    console.log("Analizando artículos:", articulos);
    setArticulosAnalizados(articulos);
    console.log("Artículos analizados:", articulosAnalizados);
  };

  const handleSubmitActualizacion = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar los códigos y precios
    console.log("Códigos de clientes:", codigosClientes);
    console.log("Precios finales:", preciosFinales);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Actualizar Precios</h1>

      <TablaArticulos
        articulos={articulos}
        onCambioArticulo={handleCambioArticulo}
      />

      <button
        onClick={handleAgregarArticulo}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
      >
        Agregar Artículo
      </button>

      <button
        onClick={handleAnalizar}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Analizar
      </button>

      {articulosAnalizados.length > 0 && (
        <ResultadosAnalisis articulosAnalizados={articulosAnalizados} />
      )}

      <FormularioActualizacion
        codigosClientes={codigosClientes}
        preciosFinales={preciosFinales}
        onCodigosClientesChange={setCodigosClientes}
        onPreciosFinalesChange={setPreciosFinales}
        onSubmit={handleSubmitActualizacion}
      />
    </div>
  );
};

export default ActualizarPrecios;
