"use client";
import React, { ReactElement, forwardRef } from "react";

interface TextAreaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  setInput?: React.Dispatch<React.SetStateAction<string>>;
  input?: string;
  borderColor: "black" | "grey";
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const { input, borderColor, setInput, ...rest } = props;

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (setInput) {
        setInput(e.currentTarget.value);
      }
    };

    return (
      <textarea
        {...rest}
        ref={ref}
        className={`${
          rest.className
        } bg-transparent w-full border-2 rounded-xl border-solid ${
          borderColor === "black" ? "border-black" : "border-greySecondApp"
        } text-lg outline-none px-2 py-2`}
        value={input || ""}
        onChange={handleInputChange}
        style={{
          wordWrap: "break-word", // ensures long words break and wrap onto the next line
          overflowWrap: "break-word", // same as wordWrap but more widely supported
          whiteSpace: "pre-wrap", // preserves whitespace and allows text to wrap when necessary
          resize: "none", // makes the textarea non-resizable
          overflowY: "auto", // shows scrollbar when max height is reached
          maxHeight: "100%",
          boxSizing: "border-box",
        }}
      />
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
