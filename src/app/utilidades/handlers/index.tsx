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
    const response = await fetch(
      `/api/articulos/actualizad-costo/${row.codigoBD}`,
      {
        // Suponiendo que el códigoBD es único
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          precioCosto: row.precioCostoExcel, // Usar el precio de costo de Excel
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar el precio");
    }

    const updatedArticulo = await response.json();
    console.log("Artículo actualizado:", updatedArticulo);
  } catch (error) {
    console.error("Error:", error);
  }
};
