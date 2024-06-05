"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Button from "@components/Button";
import commentsData from "@libs/utils/dummy_comments.json";
import InputField from "@components/InputField";
import TextArea from "@components/TextArea";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface CommentsSectionInterface {
  tripId: string;
  comments: CommentTripInterface[];
}

function CommentsSection(props: CommentsSectionInterface) {
  const { tripId, comments } = props;
  const { data: session, status } = useSession();
  const [comment, setComment] = useState<string>("");
  const [commentList, setCommentList] =
    useState<CommentTripInterface[]>(comments);
  const [rating, setRating] = useState<number>(0);

  const handleAddComment = async () => {
    if (!session) {
      toast.error("Usuário não autenticado!");
      return;
    }
    if (comment.length < 3) {
      toast.error("Comentário muito curto!");
      return;
    }
    console.log(session);
    try {
      await axios.post("/api/add-comment", {
        tripId: tripId,
        comment: comment,
        rating: rating,
        username: session.user.username ?? "Usuário Desconhecido",
      });
      setCommentList([
        {
          comment: comment,
          rating: rating,
          username: session.user.username ?? "Usuário Desconhecido",
        },
        ...commentList,
      ]);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.statusText ?? "Erro desconhecido");
      } else {
        toast.error("Erro ao adicionar comentário");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="font-bold text-2xl">Deixe sua avaliação!</h1>

      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        <Rating
          size="large"
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue ?? 0);
          }}
        />
      </Box>
      <div className="w-full flex flex-col items-end gap-3 mb-10">
        <TextArea borderColor="grey" setInput={setComment} input={comment} />
        <Button
          onPressed={handleAddComment}
          className="w-40 "
          backgroundColor="black"
          text="Comentar"
        />
      </div>
      {commentList.map((item) => {
        return (
          <div className="flex flex-col gap-6">
            <div className="h-[1px] bg-black"></div>
            <div>
              <h1 className="font-bold text-lg">{item.username}</h1>
              <Rating
                readOnly
                size="small"
                name="read-only"
                value={item.rating}
              />
              <p className="text-greyApp">{item.comment}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CommentsSection;
