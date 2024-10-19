import { useState, useEffect } from "react";
import { Articulo } from "@/types/articulo";

export const useArticulos = (
  terminoBusqueda: string,
  proveedor: string | null,
  rubro: string | null,
  page: number = 1,
  pageSize: number = 20
) => {
  const [data, setData] = useState<Articulo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchArticulos = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/articulos?busqueda=${terminoBusqueda}&ProveedorCodigo=${
            proveedor || ""
          }&RubroCodigo=${rubro || ""}&page=${page}&pageSize=${pageSize}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener artículos");
        }
        const result = await response.json();
        setData(result.articulos);
        setTotalCount(result.totalCount);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticulos();
  }, [terminoBusqueda, proveedor, rubro, page, pageSize]);

  return { data, isLoading, error, totalCount };
};
