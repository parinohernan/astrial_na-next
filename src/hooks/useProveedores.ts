import { useState, useEffect } from "react";
import { Proveedor } from "@/types/proveedor";

export const useProveedores = () => {
  const [data, setData] = useState<Proveedor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        // Aquí deberías hacer la llamada a tu API para obtener los proveedores
        const response = await fetch("/api/proveedores");
        const proveedores = await response.json();
        setData(proveedores);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProveedores();
  }, []);

  return { data, isLoading, error };
};
