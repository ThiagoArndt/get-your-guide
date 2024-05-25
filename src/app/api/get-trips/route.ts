import { NextApiRequest, NextApiResponse } from "next/types";
import { db as prisma } from "@db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const tripsData = await prisma.trips.findMany();
    return res
      .status(200)
      .json({ message: "Viagens resgatadas com sucesso!", data: tripsData });
  } catch (error) {
    console.error("Erro ao resgatar viagens", error);
    return res.status(401).json({ error: "Erro ao resgatar viagens" });
  }
}
