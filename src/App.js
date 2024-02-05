import "./App.css";
import React, { useRef, useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { DiaryPage } from "./pages/DiaryPage";
import { Newpage } from "./pages/Newpage";
import { EditPage } from "./pages/EditPage";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
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
  return newState; // newState를 반환한다.
};

export const DiaryContext = React.createContext(); // context를 생성한다.
export const DiaryDispatchContext = React.createContext(); // context를 생성한다. // 최적화 문제가 생기지 않도록 dispatch를 따로 관리한다.

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘은 첫번째로 기분이 좋아서 기분이 좋은 일기를 쓰고 싶어요",
    date: 1706959139635,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘은 두번째로 기분이 좋아서 기분이 좋은 일기를 쓰고 싶어요",
    date: 1706959139636,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘은 세번째로 기분이 좋아서 기분이 좋은 일기를 쓰고 싶어요",
    date: 1706959139637,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘은 네번째로 기분이 좋아서 기분이 좋은 일기를 쓰고 싶어요",
    date: 1706959139638,
  },{
    id: 5,
    emotion: 5,
    content: "오늘은 다섯번째로 기분이 좋아서 기분이 좋은 일기를 쓰고 싶어요",
    date: 1706959139639,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData); // useReducer를 사용하여 state와 dispatch를 생성한다. data는 일기장의 데이터를 저장한다.

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
  return (
    <DiaryContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/diary" element={<DiaryPage />} />
              <Route path="/new" element={<Newpage />} />
              <Route path="/edit" element={<EditPage />} />
            </Routes>
          </div>
        </Router>
      </DiaryDispatchContext.Provider>
    </DiaryContext.Provider>
  );
}

export default App;

/* <img src={process.env.PUBLIC_URL + "assets/emotion1.png"} alt="logo" />
<img src={process.env.PUBLIC_URL + "assets/emotion2.png"} alt="logo" />
<img src={process.env.PUBLIC_URL + "assets/emotion3.png"} alt="logo" />
<img src={process.env.PUBLIC_URL + "assets/emotion4.png"} alt="logo" />
<img src={process.env.PUBLIC_URL + "assets/emotion5.png"} alt="logo" /> */
