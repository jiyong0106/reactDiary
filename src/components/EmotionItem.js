import React from "react";

export const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  isSelectedId,
}) => {
  return (
    <div
      onClick={() => onClick(emotion_id)} // emotion_id를 클릭하면 onClick함수를 실행한다.
      className={[
        "emotionItem",
        isSelectedId ? `emotionItemOn_${emotion_id}` : `emotionItemOff`,
      ].join(" ")}
    >
      <img src={emotion_img} />
      <span>{emotion_descript}</span>
    </div>
  );
};
