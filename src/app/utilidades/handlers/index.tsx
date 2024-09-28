export const handleEliminar = (
  rowIndex: number,
  setFilteredData: React.Dispatch<React.SetStateAction<any[]>>
) => {
  setFilteredData((prevData) =>
    prevData.filter((_, index) => index !== rowIndex)
  ); // Eliminar la fila
};

export const handleVer = (row: any) => {
  console.log("Detalles de la fila:", row);
};

export const handleActualizar = async (row: any) => {
  console.log("row", row);

  try {
    const response = await fetch(`/api/articulos/articulo-actualizar-costo`, {
      // Usar solo el códigoBD en la URL
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codigoBD: row.codigoBD, // Enviar el códigoBD en el body
        precioCosto: row.precioCostoExcel, // Enviar el nuevo precio de costo
      }),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el precio");
    }

    const updatedArticulo = await response.json();
    console.log("Artículo actualizado:", updatedArticulo);
  } catch (error) {
    console.error("Error:", error);
  }
};
