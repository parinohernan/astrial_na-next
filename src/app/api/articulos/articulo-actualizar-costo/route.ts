import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  const { codigoBD, precioCosto } = await request.json();
  console.log(precioCosto);

  const PrecioCosto = parseFloat(precioCosto);

  // Actualizar el artículo en la base de datos
  const updatedArticulo = await prisma.t_articulos.update({
    where: { Codigo: codigoBD },
    data: { PrecioCosto },
  });

  return NextResponse.json(updatedArticulo, { status: 200 });
}
