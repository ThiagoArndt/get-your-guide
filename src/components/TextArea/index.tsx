import React from "react";

interface TextAreaProps {
  setInput: React.Dispatch<React.SetStateAction<string | null>>;
  input: string | null;
}

function TextArea(props: Readonly<TextAreaProps>) {
  const { input, setInput } = props;

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setInput(e.currentTarget.textContent);
  };
  return (
    <div
      className="w-full min-h-20 overflow-y-hidden break-words border-2 rounded-xl border-solid border-black text-lg outline-none content-editable-placeholder"
      contentEditable={true}
      onInput={handleInput}
    ></div>
  );
}

export default TextArea;
