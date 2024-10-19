import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { search } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const articulos = await prisma.t_articulos.findMany({
      where: {
        OR: [
          { Codigo: { contains: String(search) } },
          { Descripcion: { contains: String(search) } },
        ],
      },
      take: 10, // Limita a los primeros 10 resultados
      select: {
        Codigo: true,
        Descripcion: true,
        PrecioCosto: true, // Asegúrate de incluir los campos que necesitas
        // Agrega más campos según tu modelo t_articulos
      },
    });

    res.status(200).json(articulos);
  } catch (error) {
    console.error("Error al obtener artículos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  } finally {
    await prisma.$disconnect();
  }
}
