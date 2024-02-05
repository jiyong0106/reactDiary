import React from "react";

export const MyButton = ({ onClick, text, type }) => {
  
  const styleBtn = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button
      className={["MyButton", `MyButton_${styleBtn}`].join(" ")}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};

//const styleBtn = () =>["positive", "negative"].includes(type) ? type : "default";
// type이 positive나 negative면 type을 반환하고 아니면 default를 반환한다.
