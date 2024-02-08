import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MyHeader } from "../components/MyHeader";
import { MyButton } from "../components/MyButton";
import { DiaryContext } from "../App";
import { getstringDate, emotionList } from "../util/util";

export const DiaryPage = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id) // it.id와 id가 같은것을 찾아서 targetDiary에 저장
      );
      if (targetDiary) {
        // targetDiary가 있으면 setData에 저장
        setData(targetDiary); // targetDiary를 setData에 저장
      } else {
        alert("해당 일기가 업습니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  // console.log(emotionList)  
  // const currentEmotion = emotionList.find((it)=>it.emotion_id === data.emotion)
  // console.log(currentEmotion)
  

  // console.log(data);
  // diraryList 더미데이터 배열 잘 넘어옴
  // diaryList를 filter로 id와 같은것을 찾아서 data에 저장해서 해당 id에 대한 일기 데이터 잘 가져옴

  if (!data) { 
    return <div className="DiaryPage">로딩중...</div>;
  } else {
    const currentEmotion = emotionList.find((it) => it.emotion_id === data.emotion)
    return (
      <div>
        <MyHeader
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          headerText={` ${getstringDate(new Date(parseInt(data.date)))} 기록`}
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${id}`)}
            />
          }
        />
        <div className="DiaryPageMain">
        <section>
          <h4>오늘의 감정</h4>
          <div className={["DiaryPage_imgBox",`DiaryPage_imgBox_${currentEmotion.emotion_id}` ].join(' ')}>
            <img src={currentEmotion.emotion_img} alt="emotion" />
            <p>{currentEmotion.emotion_descript}</p>
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <textarea value={data.content} disabled></textarea>
        </section>
        </div>
      </div>
    );
  }
};

// input또는 textarea 같은 폼필드에 value 속성을 제공했지만 onChange 핸들러가 없으면 에러 발생,
//-> 해당 필드를 읽기 전용으로 렌더링 하고 입력한 내용을 수정 할 수 없다.
//-> 읽기 전용으로 하려면 readonly 속성으로 사용자가 텍스트 입력 영역을 클릭할 수없도록 설정,
//-> readonly속성은 boolean속성으로 해당 속성을 명시하지 않으면 속성값이 자동으로 false값을 가지게 된다.
// 읽기만 하는 값으로 readOnly와 disabled가 있는데 form으로 값을 보낼 때 disabled값은 전송되지 않는다.
