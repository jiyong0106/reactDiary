import React from "react";
import { useState } from "react";

const sortOptions = [
  {
    value: "ordest",
    name: "최신순",
  },
  {
    value: "ordest",
    name: "오래된순",
  },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((item, idx) => (
        <option key={idx} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState("latest");

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptions}
      />
      {diaryList.map((item) => (
        <div key={item.id}>
          <div>{item.content}</div>
          <div>{item.emotion}</div>
        </div>
      ))}
    </div>
  );
};
export default DiaryList;
