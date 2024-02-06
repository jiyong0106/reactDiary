import React from "react";

export const EmotionItem = ({ emotion_id, emotion_img, emotion_descript, onClick }) => {
  return (
    <div className="emotionItem" onClick={emotion_id}>
      <img src={emotion_img}/>
      <span>{emotion_descript}</span>
    </div>
  );
};
