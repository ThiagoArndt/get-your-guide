import React from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
  bgColor: "white" | "black";
}

function Button(props: Readonly<ButtonProps>) {
  const { text, bgColor, className } = props;
  return (
    <button
      {...props}
      className={className?.concat(
        ` ${
          bgColor == "black"
            ? "bg-black text-background hover:bg-opacity-85"
            : "bg-background text-black hover:bg-lightGreyApp"
        } text-lg font-bold rounded-full px-7 py-2 `
      )}
    >
      {text}
    </button>
  );
}

export default Button;
