import React from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
  backgroundColor: "white" | "black";
}

function Button(props: Readonly<ButtonProps>) {
  const { text, backgroundColor, className } = props;

  const baseClass = "text-lg font-bold rounded-full px-7 py-2";
  const backgroundClass =
    backgroundColor === "black"
      ? "bg-black text-background hover:bg-opacity-85"
      : "bg-background text-black hover:bg-lightGreyApp";

  const combinedClassName = className
    ? `${className} ${backgroundClass} ${baseClass}`
    : `${backgroundClass} ${baseClass}`;

  return (
    <button {...props} className={combinedClassName}>
      {text}
    </button>
  );
}

export default Button;
