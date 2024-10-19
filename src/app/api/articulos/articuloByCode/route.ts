import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const codigo = searchParams.get("codigo") || undefined;

  try {
    const articulo = await prisma.t_articulos.findUnique({
      where: {
        Codigo: codigo,
      },
      select: {
        Codigo: true,
        Descripcion: true,
        ProveedorCodigo: true,
        RubroCodigo: true,
        PrecioCosto: true,
        Lista1: true,
        Lista2: true,
        Lista3: true,
        Lista4: true,
      },
    });

    return NextResponse.json(articulo);
  } catch (error) {
    console.error("Error al obtener artículos:", error);
    return NextResponse.json(
      { error: "Error al obtener artículos" },
      { status: 500 }
    );
  }
}
