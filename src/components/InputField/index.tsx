"use client";
import React, { ReactElement } from "react";

interface InputFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  icon?: ReactElement<any, any>;
  placeHolder?: string;
  title?: string;
  setInput: React.Dispatch<React.SetStateAction<string | null>>;
  input: string | null;
  borderColor: "black" | "grey";
}

function InputField(props: Readonly<InputFieldProps>) {
  const { icon, placeHolder, title, setInput, input, borderColor } = props;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="w-full">
      <h1 className="px-2 font-bold py-1">{title ?? null}</h1>
      <div
        className={`flex flex-row px-2 gap-3 py-2 w-full border-2 rounded-xl border-solid ${
          borderColor == "black" ? "border-black" : "border-greySecondApp"
        } text-lg`}
      >
        {icon ?? null}
        <input
          {...props}
          type="text"
          value={input || ""}
          onChange={handleInputChange}
          placeholder={placeHolder}
          className="w-full font-medium bg-transparent overflow-y-hidden break-words outline-none"
        />
      </div>
    </div>
  );
}

export default InputField;
