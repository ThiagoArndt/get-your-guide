import React from "react";

interface CardProps {
  children: React.JSX.Element;
}

function Card(props: Readonly<CardProps>) {
  const { children } = props;
  return <div className="border-2 border-greySecondApp px-2 py-2 rounded-xl">{children}</div>;
}

export default Card;
