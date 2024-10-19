import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { VentasACuenta } from "@/types";

export const useVentasACuenta = (codigoCliente: string) => {
  return useQuery<VentasACuenta[]>({
    queryKey: ["ventasACuenta", codigoCliente],
    queryFn: async () => {
      const { data } = await axios.get("/api/ventasACuenta", {
        params: { codigoCliente },
      });
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 3,
    // onError: (error) => {
    //   console.error('Error fetching vendedores:', error)
    // }
  });
};
