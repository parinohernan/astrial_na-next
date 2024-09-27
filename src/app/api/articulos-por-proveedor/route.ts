import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { codigosProveedorArticulo, proveedorCodigo } = await request.json();

    if (!Array.isArray(codigosProveedorArticulo) || !proveedorCodigo) {
      return NextResponse.json(
        { error: "Formato de datos inválido" },
        { status: 400 }
      );
    }

    const articulos = await prisma.t_articulos.findMany({
      where: {
        ProveedorArticuloCodigo: {
          in: codigosProveedorArticulo,
        },
        ProveedorCodigo: proveedorCodigo, // Filtrar por ProveedorCodigo
      },
      select: {
        Codigo: true,
        Descripcion: true,
        PrecioCosto: true,
        ProveedorArticuloCodigo: true,
        ProveedorCodigo: true, // Asegúrate de incluir ProveedorCodigo si lo necesitas
      },
    });

    return NextResponse.json(articulos);
  } catch (error) {
    console.error("Error al obtener artículos:", error);
    return NextResponse.json(
      { error: "Error al obtener artículos" },
      { status: 500 }
    );
  }
}
