import { Cliente } from "./cliente";
import { Vendedor } from "./vendedor";

export interface Factura {
  DocumentoTipo: string;
  DocumentoSucursal: string;
  DocumentoNumero: string;
  Fecha: string;
  ClienteCodigo: string | null;
  VendedorCodigo: string | null;
  ImporteTotal: number | null;
  FechaAnulacion: string | null;
  t_clientes: Cliente | null;
  t_vendedores: Vendedor | null;
}
