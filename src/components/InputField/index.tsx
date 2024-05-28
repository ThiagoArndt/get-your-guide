"use client";
import React, { ReactElement, forwardRef } from "react";

interface InputFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  icon?: ReactElement<any, any>;
  placeHolder?: string;
  title?: string;
  setInput?: React.Dispatch<React.SetStateAction<string>>;
  input?: string;
  borderColor: "black" | "grey";
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const { icon, placeHolder, title, setInput, input, borderColor, ...rest } =
      props;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (setInput) {
        setInput(e.target.value);
      }
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
            {...rest}
            ref={ref}
            value={input}
            onChange={handleInputChange}
            placeholder={placeHolder}
            className="w-full font-medium bg-transparent overflow-y-hidden break-words outline-none"
          />
        </div>
      </div>
    );
  }
);

export default InputField;
