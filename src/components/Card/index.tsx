import React from "react";

interface CardProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.JSX.Element[] | React.JSX.Element;
}

function Card(props: Readonly<CardProps>) {
  const { children } = props;
  return (
    <div
      {...props}
      className={`${props.className} border-2 border-greySecondApp px-2 py-2 rounded-xl`}
    >
      {children}
    </div>
  );
}

export default Card;
