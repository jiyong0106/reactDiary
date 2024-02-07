import React, { useEffect, useContext } from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MyHeader } from "./MyHeader";
import { MyButton } from "./MyButton";
import { EmotionItem } from "./EmotionItem";
import { DiaryDispatchContext } from "../App";

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

export const DiaryEditer = ({ isEdit, originData }) => {
  const { onCreate, onEdit } = useContext(DiaryDispatchContext);
  const contentRef = useRef();
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getstringDate(new Date()));
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const backSiteClick = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
        console.log(originData.id, date, content, emotion)
      }
    }
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getstringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="diaryEditor">
      <MyHeader
        headerText={isEdit ? "일기 수정하기" : "새로운 일기"}
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
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelectedId={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="textareaBOX">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              ref={contentRef}
              placeholder="오늘은 어땠나요?"
            ></textarea>
          </div>
        </section>
        <section>
          <div className="buttonBox">
            <MyButton text={"취소하기"} onClick={() => navigate("/")} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

// 다이어리 수정완료 누르면 수정되는게 아니라 새로운 다이어리가 생성됨
