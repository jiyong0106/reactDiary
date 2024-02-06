import { MyButton } from "./MyButton";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({id, emotion, author, content, date}) => {
  const navigate = useNavigate();
  const env  = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || '';

  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDiary = ()=>{
    navigate(`/diary/${id}`)
  }
  const goEdit = ()=>{
    navigate(`/edit/${id}`)
  }

  return (
    <div className="diaryItem">
      <div className={["emotionImg", `emotionImg_${emotion}`].join(' ')} onClick={goDiary}>
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} alt="emotion" />
      </div>
      <div className="itemcontent">
        <div className="diarydate">{strDate}</div>
        <div className="diarycontent">{content.slice(0,25)}</div>
      </div>
      <div className="editbtn">
        <MyButton text={'수정하기'} onClick={goEdit} />
      </div>
    </div>
  );
};

export default DiaryItem;