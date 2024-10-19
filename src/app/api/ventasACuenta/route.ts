import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const codigoCliente = searchParams.get("codigoCliente") || "C2006";

  try {
    console.log("GET /api/ventasACuenta  CLIENTE: ", codigoCliente);
    const ventasACuenta = await prisma.ventas_a_cuenta.findMany({
      select: {
        codigoArticulo: true,
        fecha: true,
        cantitad: true,
        observacion: true,
      },
      where: {
        codigoCliente: codigoCliente,
      },
    });

    return NextResponse.json(ventasACuenta);
  } catch (error) {
    console.error("Error al obtener ventas a cuenta:", error);
    return NextResponse.json(
      { error: "Error al obtener las ventas a cuenta" },
      { status: 500 }
    );
  }
}

// export async function GET(request: Request) {
//     const { searchParams } = new URL(request.url);
//     const termino = searchParams.get("termino") || "";

//     try {
//       const clientes = await prisma.t_clientes.findMany({
//         select: {
//           Codigo: true,
//           Descripcion: true,
//           Cuit: true,
//           Calle: true,
//           Numero: true,
//           TipoDocumento: true,
//           CategoriaIva: true,
//           ImporteDeuda: true,
//         },
//         where: {
//           OR: [
//             { Codigo: { contains: termino } },
//             { Descripcion: { contains: termino } },
//             // Start of Selection
//           ],
//         },
//         take: 50, // Limita los resultados para mejorar el rendimiento
//       });

//       return NextResponse.json(clientes);
//     } catch (error) {
//       console.error("Error al obtener clientes:", error);
//       return NextResponse.json(
//         { error: "Error al obtener clientes" },
//         { status: 500 }
//       );
//     }
//   }
