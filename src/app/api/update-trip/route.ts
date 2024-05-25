import { NextApiRequest, NextApiResponse } from "next/types";
import { db as prisma } from "@db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const {
    created_by,
    date_final,
    date_initial,
    description,
    images,
    location,
    price,
    title,
  } = req.body as TripInterface;

  const { id } = req.query as { id: string };

  try {
    const tripData = await prisma.trips.updateMany({
      data: {
        created_by: created_by,
        date_final: date_final,
        date_initial: date_initial,
        description: description,
        location: location,
        price: price,
        title: title,
        images: images,
      },
      where: { id: id },
    });
    return res
      .status(200)
      .json({ message: "Viagem atualizada com sucesso!", data: tripData });
  } catch (error) {
    console.error("Erro ao atualizar viagem", error);
    return res.status(401).json({ error: "Erro ao atualizar viagem" });
  }
}
