import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductReportItem } from "@/types";

export const useProductReport = (
  fechaInicio: Date,
  fechaFin: Date,
  productCodes: string[]
) => {
  return useQuery<ProductReportItem[]>({
    queryKey: ["productReport", fechaInicio, fechaFin, productCodes],
    queryFn: async () => {
      const { data } = await axios.get("/api/product-report", {
        params: {
          fechaInicio: fechaInicio.toISOString(),
          fechaFin: fechaFin.toISOString(),
          productCodes: productCodes.join(","),
        },
      });
      return data;
    },
    enabled: productCodes.length > 0,
  });
};
