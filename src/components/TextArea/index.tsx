import React, { useRef } from "react";

interface TextAreaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  setInput: React.Dispatch<React.SetStateAction<string | null>>;
  input: string | null;
  borderColor: "black" | "grey";
}

function TextArea(props: Readonly<TextAreaProps>) {
  const { input, borderColor, setInput } = props;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.currentTarget.value);
  };

  return (
    <textarea
      {...props}
      ref={textAreaRef}
      className={`${props.className} bg-transparent w-full border-2 rounded-xl border-solid ${
        borderColor === "black" ? "border-black" : "border-greySecondApp"
      } text-lg outline-none px-2 py-2`}
      value={input || ""}
      onChange={handleInput}
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

export default TextArea;
