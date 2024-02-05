import React from "react";

const API_URL = "https://jsonplaceholder.typicode.com/comments";

export const getDiaryListAPi = async () => {
  const response = await fetch(API_URL);
  const result = await response.json();
  console.log(result)
  return result;
  // console.log(result) // 이거 실행이 안되는 이유는 return이 먼저 실행되기 때문이다. return이 실행되면 함수가 종료되기 때문에 console.log(result)는 실행되지 않는다.;
};
getDiaryListAPi()