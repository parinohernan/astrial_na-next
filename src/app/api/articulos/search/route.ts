import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");

  if (!term || term.length < 3) {
    return NextResponse.json(
      { error: "Término de búsqueda demasiado corto" },
      { status: 400 }
    );
  }

  try {
    const articulos = await prisma.t_articulos.findMany({
      where: {
        OR: [
          { Descripcion: { contains: term } },
          { Codigo: { contains: term } },
          { ProveedorArticuloCodigo: { contains: term } },
        ],
      },
      select: {
        Codigo: true,
        Descripcion: true,
        ProveedorArticuloCodigo: true,
      },
      take: 20, // Limitar a 20 resultados para optimizar
    });

    return NextResponse.json(articulos);
  } catch (error) {
    console.error("Error al buscar artículos:", error);
    return NextResponse.json(
      { error: "Error en la búsqueda de artículos" },
      { status: 500 }
    );
  }
}
