import "./App.css";
import React, { useRef, useReducer, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { DiaryPage } from "./pages/DiaryPage";
import { Newpage } from "./pages/Newpage";
import { EditPage } from "./pages/EditPage";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": { // init는 초기화를 의미한다.
      return action.data; // action.data는 diaryList를 전달한다.
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [...state, newItem];
      break;
    }
    case "REMOVE": {
      newState = state.filter((item) => item.id !== action.targetId);
      break;
      // targetId를 filter 한 나머지 id들을 newstate에 저장한다.
    }
    case "EDIT": {
      newState = state.map((item) =>
        item.id === action.targetId ? { ...action.data } : item
      );
      // action.targetId로 전달된 값만 저장
      //action.targetId와 같은 값을 가진 id는 action.data로 저장하고 아니면 그대로 유지한다.
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("dirayId", JSON.stringify(newState));
  return newState; // newState를 반환한다.
};

export const DiaryContext = React.createContext(); // context를 생성한다.
export const DiaryDispatchContext = React.createContext(); // context를 생성한다. // 최적화 문제가 생기지 않도록 dispatch를 따로 관리한다.

function App() {
  const [data, dispatch] = useReducer(reducer, []); // useReducer를 사용하여 state와 dispatch를 생성한다. data는 일기장의 데이터를 저장한다.
  const dataId = useRef(0); // data의 id값을 관리하기 위한 useRef

  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1; // dataId를 1 증가시킨다. // useRef는 값이 바뀌어도 리렌더링이 되지 않는다.
  };
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE", // action.type을 전달한다.
      targetId, // targetId를 전달한다.
    });
  };

  //onEdit
  const onEdit = (targetId, date, content, emotion) => {
    // 일기의 모든 부분을 수정해야 되니까 prop을 다 받아옴
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  useEffect(() => {
    const localData = localStorage.getItem("dirayId");
    if(localData){
      const diaryList = JSON.parse(localData).sort((a,b) => parseInt(b.id) - parseInt(a.id));
      dataId.current = parseInt(diaryList[0].id) + 1;
      dispatch({ type: "INIT", data: diaryList });
      // type은 INIT이고 data는 diaryList를 전달한다.
    }
  }, []);

  return (
    <DiaryContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/diary/:id" element={<DiaryPage />} />
              <Route path="/new" element={<Newpage />} />
              <Route path="/edit/:id" element={<EditPage />} />
            </Routes>
          </div>
        </Router>
      </DiaryDispatchContext.Provider>
    </DiaryContext.Provider>
  );
}

export default App;

//DiaryEditer 수정하기 구현x
//더미데이터 삭제
//로컬스토리로 저장해서 새로고침해도 데이터가 날라가지 않게 구현하기
//삭제하기구현하기

//객체는 JSON.stringify로 문자열로 바꾸고 JSON.parse로 객체로 바꿀 수 있다.
