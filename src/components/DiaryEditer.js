import React, { useEffect, useContext } from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MyHeader } from "./MyHeader";
import { MyButton } from "./MyButton";
import { EmotionItem } from "./EmotionItem";
import { DiaryDispatchContext } from "../App";
import { getstringDate, emotionList } from "../util/util"

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

export const DiaryEditer = ({ isEdit, originData }) => {
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
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
      if (!isEdit) { //isEdit는 수정인지 새로운 일기인지 구분하기 위한 변수
        onCreate(date, content, emotion);
         //
      } else {
        onEdit(originData.id, date, content, emotion)
      }
    }
    navigate("/", { replace: true });
  };

  const handleRemove = () => {
    if(window.confirm("정말 삭제하시나요?")){
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  }

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
        rightChild={
          isEdit &&
          <MyButton text={"삭제하기"} type ={'negative'}onClick={handleRemove} />}
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
