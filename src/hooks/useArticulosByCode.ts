import { useState, useEffect } from "react";
import { Articulo } from "@/types/articulo";

export const useArticulosByCode = (codigo: string) => {
  const [data, setData] = useState<Articulo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchArticulos = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/articulos/articuloByCode?codigo=${codigo}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener artículos");
        }
        const result = await response.json();
        console.log(result, "result");
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticulos();
  }, [codigo]);

  return { data, isLoading, error };
};
