import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MyHeader } from "../components/MyHeader";
import { MyButton } from "../components/MyButton";
import { DiaryContext } from "../App";

export const DiaryPage = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("해당 일기가 업습니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩중...</div>;
  } else {
    return (
      <div>
        <MyHeader
          leftChild={<MyButton text={"< 뒤로가기"} onClick={()=>navigate(-1)} />}
          headerText={"2012"}
          rightChild={<MyButton text={"수정하기"} onClick={()=>navigate(`/edit/${id}`)}/>}
        />
        <section>
          <h4>오늘의 감정</h4>
          <div></div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <textarea></textarea>
        </section>
      </div>
    );
  }
};
