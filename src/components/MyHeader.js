import React from "react";

export const MyHeader = ({ leftChild, headerText, rightChild }) => {
  return (
    <header>
        <div className="left_btn">{leftChild}</div>
        <div className="header_text">{headerText}</div>
        <div className="right_btn">{rightChild}</div>
    </header>
  );
};
