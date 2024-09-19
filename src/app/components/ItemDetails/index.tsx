import React, { useState, useEffect } from "react";

interface ItemDetailsProps {
  itemId: string;
}

export function ItemDetails({ itemId }: ItemDetailsProps) {
  const [item, setItem] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`/api/items/${itemId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setItem(result);
      } catch (e) {
        console.error("Error al obtener detalles del artículo:", e);
        setError(
          `Error al cargar los detalles: ${
            e instanceof Error ? e.message : "Error desconocido"
          }`
        );
      }
    };

    fetchItemDetails();
  }, [itemId]);

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!item) {
    return <div>Cargando detalles del artículo...</div>;
  }

  return (
    <div>
      <h2>Detalles del Artículo</h2>
      <p>ID: {item.id}</p>
      <p>Nombre: {item.name}</p>
      <p>Descripción: {item.description}</p>
      <p>Precio: {item.price}</p>
      {/* Añade más campos según sea necesario */}
    </div>
  );
}
