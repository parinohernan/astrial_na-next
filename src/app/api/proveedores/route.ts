import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  // console.log("buscando proveedores");

  try {
    const proveedores = await prisma.t_proveedores.findMany({
      select: {
        Codigo: true,
        Descripcion: true,
      },
    });
    // console.log(proveedores);

    return NextResponse.json(proveedores);
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
    return NextResponse.json(
      { error: "Error al obtener proveedores" },
      { status: 500 }
    );
  }
}
