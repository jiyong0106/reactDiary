import React from "react";
import { useState, useCallback } from "react";
import { MyButton } from "./MyButton";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

const sortOptions = [
  {
    value: "latest",
    name: "최신순",
  },
  {
    value: "ordest",
    name: "오래된순",
  },
];

const filteroption = [
  {
    value: "all",
    name: "전체보기",
  },
  {
    value: "happy",
    name: "좋은 감정",
  },
  {
    value: "bad",
    name: "나쁜 감정",
  },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className="controlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((item, idx) => (
        <option key={idx} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState("latest");
  const [filterEmotion, setFilterEmotion] = useState("all");
  const navigate = useNavigate();

  const getProcessdDiaryList = () => {
    const filterCallback = (item) => {
      if (filterEmotion === "happy") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const compare = (a, b) => {
      // compare함수를 만들어서 sort함수에 넣어서 정렬을 할 수 있다.
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date); // 최근에 작성한게 앞에 오도록 정렬
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList)); // 배열을 json화 시켜서 문자열로 바꿈 그리고 다시 json화 시켜서 배열로 바꿈
    const filterList =
      filterEmotion === "all"
        ? copyList
        : copyList.filter((item) => filterCallback(item));
    const sortedList = filterList.sort(compare); // compare함수를 통해 정렬
    return sortedList;
  };

  return (
    <div className="DiatyList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptions}
          />
          <ControlMenu
            value={filterEmotion}
            onChange={setFilterEmotion}
            optionList={filteroption}
          />
        </div>
        <div className="right_col">
          <MyButton
            text={"새 일기쓰기"}
            type={"positive"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
      {getProcessdDiaryList().map((item) => (
        <DiaryItem key={item.id} {...item} />
      ))}
    </div>
  );
};
export default DiaryList;

//주석추가
//const handleSetFilter = (filter)=>{
//   setFilter(filter)
// }

//컴포넌트가 리렌더링 될때 다시 생성이됨 -> react.memo에서 비교를 했을 때 다른 prop이라 간주해서 리렌더링이 됨
//하지만 useState에서 반환받은 상태변함수들은 동일한 id를 보장함, 그래서 리렌더링이 되지 않음
//상태변화 자체를 내려주면 편하게 상태변화 할 수 있다. 