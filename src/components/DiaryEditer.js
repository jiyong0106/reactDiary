import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyHeader } from "./MyHeader";
import { MyButton } from "./MyButton";
import { EmotionItem } from "./EmotionItem";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion1.png",
    emotion_descript: "완전기쁨",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion2.png",
    emotion_descript: "기쁨",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion3.png",
    emotion_descript: "보통",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion4.png",
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion5.png",
    emotion_descript: "완전나쁨",
  },
];

const getstringDate = (date) => {
  return date.toISOString().slice(0, 10); // toISOString() 는 2021-10-20T07:00:00.000Z 이런식으로 나오는데 slice(0,10) 은 2021-10-20 이런식으로 나오게 하는것
};
export const DiaryEditer = () => {
  const [date, setDate] = useState(getstringDate(new Date()));
  const [emotion, setEmotion] = useState(3); // 기본값은 보통 [3
  const navigate = useNavigate();

  const handleEmote = (emotion) => {
    setEmotion(emotion);
  }

  const backSiteClick = () => {
    navigate(-1);
  };

  return (
    <div className="diaryEditor">
      <MyHeader
        headerText={"새로운 일기"}
        leftChild={<MyButton text={"< 뒤로가기"} onClick={backSiteClick} />}
      />

      <div>

        <section>
          <h4> 오늘은 언제인가요?</h4>
          <div className="inputbox">
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>

        <section>
          <h4>오늘의 감정</h4>
            <div className="InputBox emotionListWrapper">
            {emotionList.map((it) => (
                <EmotionItem key={it.emotion_id} {...it} onClick={handleEmote}/>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
