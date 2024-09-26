import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { codigosProveedorArticulo } = await request.json();

    if (!Array.isArray(codigosProveedorArticulo)) {
      return NextResponse.json(
        { error: "Formato de datos inválido" },
        { status: 400 }
      );
    }

    // Convertir todos los códigos a string
    const codigosString = codigosProveedorArticulo.map((codigo) =>
      String(codigo)
    );

    const articulos = await prisma.t_articulos.findMany({
      where: {
        ProveedorArticuloCodigo: {
          in: codigosString,
        },
      },
      select: {
        Codigo: true,
        Descripcion: true,
        PrecioCosto: true,
        ProveedorArticuloCodigo: true,
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
