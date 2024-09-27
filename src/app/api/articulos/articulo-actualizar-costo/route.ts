import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: { codigoBD: string } }
) {
  const { precioCosto } = await request.json();

  // Actualizar el artículo en la base de datos
  const updatedArticulo = await prisma.t_articulos.update({
    where: { codigo: params.codigoBD },
    data: { precioCosto },
  });

  return NextResponse.json(updatedArticulo, { status: 200 });
}
