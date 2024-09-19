import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const vendedores = await prisma.t_vendedores.findMany({
      select: {
        Codigo: true,
        Descripcion: true,
      },
      orderBy: {
        Descripcion: "asc",
      },
    });
    return NextResponse.json(vendedores);
  } catch (error) {
    console.error("Error al obtener vendedores:", error);
    return NextResponse.json(
      { error: "Error al obtener los vendedores" },
      { status: 500 }
    );
  }
}
