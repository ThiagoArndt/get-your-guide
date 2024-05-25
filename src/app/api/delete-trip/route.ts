import { NextApiRequest, NextApiResponse } from "next/types";
import { db as prisma } from "@db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { id } = req.query as { id: string };

  try {
    const tripData = await prisma.trips.deleteMany({
      where: {
        id: id,
      },
    });
    return res
      .status(200)
      .json({ message: "Viagem deletada com sucesso!", data: tripData });
  } catch (error) {
    console.error("Erro ao deletar viagem:", error);
    return res.status(401).json({ error: "Erro ao deletar viagem" });
  }
}
