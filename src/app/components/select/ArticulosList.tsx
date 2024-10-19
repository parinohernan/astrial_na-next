import React from "react";
import ArticulosSelect from "@/app/components/select/SelectArticulos";

const ArticulosList = () => {
  const manejarSeleccion = (codigoArticulo: string) => {
    console.log("Artículo seleccionado:", codigoArticulo);
    // Aquí puedes realizar acciones adicionales, como actualizar el estado global o navegar a otra página
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Seleccionar y Ver Artículo</h1>
      <ArticulosSelect onSelect={manejarSeleccion} />
    </div>
  );
};

export default ArticulosList;
