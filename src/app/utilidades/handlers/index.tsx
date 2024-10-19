export const handleActualizarTodos = async (
  data: any[],
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true); // Mostrar spinner al iniciar la actualización
  try {
    for (const row of data) {
      console.log(row);

      await handleActualizar(row); // Llama a handleActualizar para cada fila
    }
    alert("Todos los artículos han sido actualizados."); // Mensaje de éxito
  } catch (error) {
    console.error("Error al actualizar todos los artículos:", error);
    alert("Ocurrió un error al actualizar los artículos."); // Mensaje de error
  } finally {
    setLoading(false); // Ocultar spinner después de la actualización
  }
};

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
  } catch (error) {
    console.error("Error:", error);
  }
};
