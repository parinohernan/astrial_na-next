import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const facturas = await prisma.facturacabeza.findMany({
      select: {
        DocumentoTipo: true,
        DocumentoSucursal: true,
        DocumentoNumero: true,
        Fecha: true,
        ClienteCodigo: true,
        VendedorCodigo: true,
        ImporteTotal: true,
        FechaAnulacion: true,
        t_clientes: {
          select: {
            Codigo: true,
            Descripcion: true,
          },
        },
        t_vendedores: {
          select: {
            Codigo: true,
            Descripcion: true,
          },
        },
      },
      orderBy: {
        Fecha: "desc",
      },
      take: 100,
    });
    return NextResponse.json(facturas);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las facturas" },
      { status: 500 }
    );
  }
}
