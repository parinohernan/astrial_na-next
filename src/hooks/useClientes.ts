import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Cliente } from "../types/cliente";

export const useClientes = (terminoBusqueda: string) => {
  return useQuery<Cliente[]>({
    queryKey: ["clientes", terminoBusqueda],
    queryFn: async () => {
      const response = await axios.get("/api/clientes", {
        params: { termino: terminoBusqueda },
      });
      return response.data;
    },
    enabled: terminoBusqueda.trim() !== "", // Solo ejecuta la consulta si hay término de búsqueda
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 3,
  });
};
