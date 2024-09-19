import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Factura {
  DocumentoTipo: string;
  DocumentoSucursal: string;
  DocumentoNumero: string;
  Fecha: string;
  ClienteCodigo: string | null;
  VendedorCodigo: string | null;
  ImporteTotal: number | null;
  FechaAnulacion: string | null;
  t_clientes: {
    Codigo: string;
    RazonSocial: string;
    Descripcion: string;
  } | null;
  t_vendedores: {
    Codigo: string;
    Nombre: string;
    Descripcion: string;
  } | null;
}

export const useFacturas = () => {
  return useQuery<Factura[]>({
    queryKey: ["facturas"],
    queryFn: async () => {
      const { data } = await axios.get("/api/listaDeFacturas");
      return data;
    },
  });
};
