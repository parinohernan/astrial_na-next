import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const termino = searchParams.get("termino") || "";

  try {
    const clientes = await prisma.t_clientes.findMany({
      select: {
        Codigo: true,
        Descripcion: true,
        Cuit: true,
        Calle: true,
        Numero: true,
        TipoDocumento: true,
        CategoriaIva: true,
        ImporteDeuda: true,
      },
      where: {
        OR: [
          { Codigo: { contains: termino } },
          { Descripcion: { contains: termino } },
          // Start of Selection
        ],
      },
      take: 50, // Limita los resultados para mejorar el rendimiento
    });

    return NextResponse.json(clientes);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    return NextResponse.json(
      { error: "Error al obtener clientes" },
      { status: 500 }
    );
  }
}
