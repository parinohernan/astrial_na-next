import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  try {
    let data;
    switch (type) {
      case "vendors":
        data = await prisma.t_vendedores.findMany();
        break;
      case "headings":
        data = await prisma.t_rubros.findMany();
        break;
      case "suppliers":
        data = await prisma.t_proveedores.findMany();
        break;
      case "customers":
        data = await prisma.t_clientes.findMany();
        break;
      case "items":
        data = await prisma.t_articulos.findMany();
        break;
      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
