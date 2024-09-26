import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const codigo = searchParams.get("codigo") || undefined;
  const descripcion = searchParams.get("descripcion") || undefined;
  const proveedor = searchParams.get("proveedor") || undefined;
  const rubro = searchParams.get("rubro") || undefined;

  try {
    const articulos = await prisma.t_articulos.findMany({
      where: {
        Codigo: codigo ? { contains: codigo } : undefined,
        Descripcion: descripcion ? { contains: descripcion } : undefined,
        ProveedorCodigo: proveedor ? { equals: proveedor } : undefined,
        RubroCodigo: rubro ? { equals: rubro } : undefined,
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

    return NextResponse.json(articulos);
  } catch (error) {
    console.error("Error al obtener artículos:", error);
    return NextResponse.json(
      { error: "Error al obtener artículos" },
      { status: 500 }
    );
  }
}
