import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Vendedor } from "@/types";

export const useVendedores = () => {
  return useQuery<Vendedor[]>({
    queryKey: ["vendedores"],
    queryFn: async () => {
      const { data } = await axios.get("/api/vendedores");
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 3,
    // onError: (error) => {
    //   console.error('Error fetching vendedores:', error)
    // }
  });
};
