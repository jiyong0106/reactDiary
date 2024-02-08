import React, { useContext, useEffect, useState } from "react";
import { DiaryEditer } from "../components/DiaryEditer";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryContext } from "../App";

export const EditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const diaryList = useContext(DiaryContext);
  const [originData, setOriginData] = useState(); // targetDiary를 찾아서 originData에 저장 //

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert("해당 일기가 없습니다.");
        navigate("/", { replace: true }); //replace: true 를 사용하면 뒤로가기 했을 때 이전 페이지로 이동하지 않는다.
      }console.log(targetDiary)
    }
  }, [id, diaryList]);
  

  return (
    <div>
      {originData && <DiaryEditer isEdit={true} originData={originData} />}
    </div>
  );
};
//isEdit는 수정인지 새로운 일기인지 구분하기 위한 변수
