import { NextApiRequest, NextApiResponse } from "next/types";
import { db as prisma } from "@db/client";
import { CommentInterface, TripInterface } from "@entities/interfaces";
import { validateUser } from "@services/sessionHelper";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@libs/session";

export async function POST(req: Request) {
  const { tripId, comment, rating, username } =
    (await req.json()) as CommentInterface;

  try {
    const user = await getCurrentUser();
    if (user == null) {
      return NextResponse.json(
        {},
        { status: 401, statusText: "Usuário não autenticado" }
      );
    }

    const allComments = await prisma.trips.findMany({
      where: { id: tripId },
      select: {
        comments: true,
      },
    });

    let newComment = {
      comment: comment,
      rating: rating,
      username: username,
    };
    console.log([...allComments[0].comments, newComment]);
    const commentsData = await prisma.trips.update({
      where: { id: tripId },
      data: {
        comments: [...allComments[0].comments, newComment],
      },
      select: { comments: true },
    });

    return NextResponse.json(commentsData, {
      status: 200,
      statusText: "Comentário adicionado com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao adicionar comentário", error);
    return NextResponse.json(
      {},
      { status: 401, statusText: "Erro ao adicionar comentário!" }
    );
  }
}
