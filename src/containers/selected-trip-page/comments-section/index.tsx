"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Button from "@components/Button";
import commentsData from "@libs/utils/dummy_comments.json";
import InputField from "@components/InputField";
import TextArea from "@components/TextArea";

function CommentsSection() {
  const [comment, setComment] = useState<string | null>("");
  const [rating, setRating] = useState<number | null>(0);

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
            setRating(newValue);
          }}
        />
      </Box>
      <div className="w-full flex flex-col items-end gap-3 mb-10">
        <TextArea setInput={setComment} input={comment} />
        <Button className="w-40 " backgroundColor="black" text="Comentar" />
      </div>
      {commentsData.map((item) => {
        return (
          <div className="flex flex-col gap-6" key={item.id}>
            <div className="h-[1px] bg-black"></div>
            <div>
              <h1 className="font-bold text-lg">{item.username}</h1>
              <Rating readOnly size="small" name="read-only" value={item.starRating} />
              <p className="text-greyApp">{item.comment}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CommentsSection;
