import { NextApiRequest, NextApiResponse } from "next/types";
import { db as prisma } from "@db/client";
import { TripInterface } from "@entities/interfaces";
import { validateUser } from "@services/sessionHelper";

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

  try {
    await validateUser(created_by);
    const tripData = await prisma.trips.createMany({
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
    });
    return res
      .status(200)
      .json({ message: "Viagem criada com sucesso!", data: tripData });
  } catch (error) {
    console.error("Erro ao criar viagem", error);
    return res.status(401).json({ error: "Erro ao criar viagem" });
  }
}
