"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Editor } from "@tiptap/core";

function CommentsSection() {
  const [value, setValue] = useState<number | null>(0);
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Example Text</p>",
  });
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Deixe sua avaliação!</h1>
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        <Rating
          className="text-greenApp"
          size="large"
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
      {editor && <EditorContent editor={editor} className="border p-4 rounded" />}
    </div>
  );
}

export default CommentsSection;
