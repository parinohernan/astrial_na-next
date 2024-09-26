import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fechaInicio = new Date(searchParams.get("fechaInicio") || "");
  const fechaFin = new Date(searchParams.get("fechaFin") || "");
  const productCodes = searchParams.get("productCodes")?.split(",") || [];

  try {
    const report = await prisma.facturaitems.findMany({
      where: {
        facturaCabeza: {
          fecha: {
            gte: fechaInicio,
            lte: fechaFin,
          },
        },
        ProductoCodigo: {
          in: productCodes,
        },
      },
      select: {
        facturacabeza: {
          select: {
            DocumentoNumero: true,
            t_clientes: {
              select: {
                RazonSocial: true,
                CUIT: true,
              },
            },
          },
        },
        ProductoCodigo: true,
        productos: {
          select: {
            Descripcion: true,
            ProveedorCodigo: true,
          },
        },
        Cantidad: true,
      },
    });

    const formattedReport = report.map(
      (item: {
        facturacabeza: { DocumentoNumero: string };
        ProductoCodigo: string;
        productos: { Descripcion: string; ProveedorCodigo: string };
      }) => ({
        FacturaNumero: item.facturacabeza.DocumentoNumero,
        ProductoCodigo: item.ProductoCodigo,
        ProductoDescripcion: item.productos.Descripcion,
        ProveedorCodigo: item.productos.ProveedorCodigo,
        //   Cantidad: item.Cantidad,
        //   ClienteDescripcion: item.facturacabeza.t_clientes.Descripcion,
        //   ClienteCUIT: item.facturacabeza.t_clientes.CUIT,
      })
    );

    return NextResponse.json(formattedReport);
  } catch (error) {
    console.error("Error fetching product report:", error);
    return NextResponse.json(
      { error: "Error fetching product report" },
      { status: 500 }
    );
  }
}
