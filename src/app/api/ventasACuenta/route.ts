import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  const { id } = await request.json();
  try {
    const venta = await prisma.ventas_a_cuenta.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(venta);
  } catch (error) {
    console.error("Error al eliminar la venta a cuenta:", error);
    return NextResponse.json(
      { error: "Error al eliminar la venta a cuenta" },
      { status: 500 }
    );
  }
}
export async function PATCH(request: Request) {
  try {
    const { id, ...data } = await request.json();
    console.log("data", data);
    const venta = await prisma.ventas_a_cuenta.update({
      where: { id },
      data: {
        cantidad: data.cantidad,
        fecha: data.fecha,
        fechaLimite: data.fechaLimite,
      },
    });
    return NextResponse.json(venta);
  } catch (error) {
    console.error("Error al actualizar la venta a cuenta:", error);
    return NextResponse.json(
      { error: "Error al actualizar la venta a cuenta" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const {
      codigoArticulo,
      cantidad,
      codigoCliente,
      observacion,
      fecha,
      fechaLimite,
    } = await request.json();

    const fechaDate = new Date(fecha);
    const fechaLimiteDate = new Date(fechaLimite);

    const nuevaVenta = await prisma.ventas_a_cuenta.create({
      data: {
        codigoArticulo,
        cantidad: parseFloat(cantidad),
        codigoCliente,
        observacion,
        fecha: fechaDate,
        fechaLimite: fechaLimiteDate,
      },
    });

    // Devolvemos el ID del nuevo artículo insertado
    return NextResponse.json({ id: nuevaVenta.id });
  } catch (error) {
    console.error("Error al crear una nueva venta a cuenta:", error);
    return NextResponse.json(
      { error: "Error al crear una nueva venta a cuenta" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const codigoCliente = searchParams.get("codigoCliente");

  try {
    const ventasACuenta = await prisma.ventas_a_cuenta.findMany({
      select: {
        id: true,
        codigoArticulo: true,
        fecha: true,
        fechaLimite: true,
        cantidad: true,
        observacion: true,
        t_articulos: {
          select: {
            Descripcion: true,
            PrecioCostoMasImp: true,
          },
        },
      },
      where: {
        codigoCliente: codigoCliente,
      },
    });

    const resultadoFormateado = ventasACuenta.map((venta) => ({
      ...venta,
      descripcion: venta.t_articulos?.Descripcion,
      precio: venta.t_articulos?.PrecioCostoMasImp,
      ...venta,
      t_articulos: undefined,
    }));

    return NextResponse.json(resultadoFormateado);
  } catch (error) {
    console.error("Error al obtener ventas a cuenta:", error);
    return NextResponse.json(
      { error: "Error al obtener las ventas a cuenta" },
      { status: 500 }
    );
  }
}
