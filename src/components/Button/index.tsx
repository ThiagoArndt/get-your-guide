"use client";
import React, { useState } from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
  backgroundColor: "white" | "black";
  onPressed: React.MouseEventHandler<HTMLButtonElement> | undefined;
  hasBorder?: boolean;
}

function Button(props: Readonly<ButtonProps>) {
  const { text, backgroundColor, className, onPressed, hasBorder } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClick = () => {
    if (isLoading == false) {
      setIsLoading(true);
      onPressed;
      setIsLoading(false);
    }
  };
  const baseClass = "text-lg font-bold rounded-full px-7 py-2";
  const backgroundClass =
    backgroundColor === "black"
      ? "bg-black text-background hover:bg-opacity-85"
      : "bg-transparent border-black text-black hover:bg-lightGreyApp";

  const borderClass = hasBorder ? "border-2" : "";

  const combinedClassName = className
    ? `${className} ${backgroundClass} ${borderClass} ${baseClass}`
    : `${backgroundClass} ${borderClass} ${baseClass}`;

  return (
    <button onClick={onPressed} {...props} className={combinedClassName}>
      {isLoading ? "Carregando..." : text}
    </button>
  );
}

export default Button;
