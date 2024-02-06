import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { MyButton } from "../components/MyButton";
import { MyHeader } from "../components/MyHeader";
import { DiaryContext } from "../App";
import DiaryList from "../components/DiaryList";

export const HomePage = () => {
  const diaryList = useContext(DiaryContext);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const timeText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월 `;

  useEffect(() => {
    if (diaryList.length >= 1) {
    const firstDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      1
    ).getTime();

    const lastDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      0
    ).getTime();

    setData(
      diaryList.filter((item) => firstDay <= item.date && item.date <= lastDay)
    );
  }
  }, [diaryList, curDate]);


  useEffect(() => {
  }, [data]);

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
  };

  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
  }; //이전달로 가는 함수 newDate 는 년도, 월, 일을 받는다.

  return (
    <div>
      <MyHeader
        headerText={timeText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};
