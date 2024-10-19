import { useState, useEffect } from "react";
import { Rubro } from "@/types/rubro";

export const useRubros = () => {
  const [data, setData] = useState<Rubro[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRubros = async () => {
      try {
        // Aquí deberías hacer la llamada a tu API para obtener los rubros
        const response = await fetch("/api/rubros");
        const rubros = await response.json();
        setData(rubros);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRubros();
  }, []);

  return { data, isLoading, error };
};
