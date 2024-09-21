import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Factura } from "@/types";

export const useFacturas = () => {
  return useQuery<Factura[]>({
    queryKey: ["facturas"],
    queryFn: async () => {
      const { data } = await axios.get("/api/listaDeFacturas");
      return data;
    },
  });
};
