import React, { useState } from "react";

import "./App.css";
import { CreateTodo } from "./components/CreateTodo/CreateTodo";
import Header from "./components/Header/Header";
import { TodoList } from "./components/TodoList/TodoList";

function App() {
  const [refreshList, setRefreshList] = useState(0);
  return (
    <div className="App">
      <Header />
      {/* <div>Form for create todo</div> */}
      <CreateTodo
        onCreate={() => {
          setRefreshList(Date.now());
        }}
      />

      <TodoList refreshRef={refreshList} />
    </div>
  );
}

export default App;
