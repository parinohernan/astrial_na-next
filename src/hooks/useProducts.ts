import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "@/types";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get("/api/products");
      return data;
    },
  });
};
