import { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./App.css";
// import Data from "./Utils/dataset";
import TodoCard from "./Component/TodoCard/TodoCard";

// Main Function

function App(props) {
  const [toDos, setToDos] = useState([]);

  const [newTitle, setNewTitle] = useState("");
  const [newDetail, setNewDetail] = useState("");

  useEffect(() => {
    let data = localStorage.getItem("data");
    if (data) {
      setToDos(JSON.parse(data));
    }
  }, []);

  // Check if input is empty
  const emptyHandler = () => {
    newTitle.trim().length === 0 || newDetail.trim().length === 0
      ? alert("Task Title or Detail is missing\nPlease fill it")
      : addHandler();
  };

  // Handle event when new task is added
  const addHandler = () => {
    let newTodo = {
      id: Math.random(),
      title: newTitle,
      detail: newDetail,
      isCompleted: false,
      isDeleted: false,
    };

    toDos.push(newTodo);
    setToDos([...toDos]);
    setNewTitle("");
    setNewDetail("");
    localStorage.setItem("data", JSON.stringify(toDos));
  };

  // Handle Event when Complete button is clicked
  const onCompleteHandler = (id) => {
    const todo = toDos.find((e) => e.id === id);
    todo.isCompleted = true;
    setToDos([...toDos]);
    localStorage.setItem("data", JSON.stringify(toDos));
  };

  //  Handle Event when Delete button is clicked
  const onDeleteHandler = (id) => {
    const todo = toDos.find((e) => e.id === id);
    todo.isDeleted = true;
    setToDos([...toDos]);
    localStorage.setItem("data", JSON.stringify(toDos));
  };

  // Page Showing Start
  return (
    <>
      <div className="todo-main-container">
        {/* // Input Section */}

        <div className="todo-input">
          <div className="text-input-area">
            <label htmlFor="add-title">
              To-do Title :
              <input
                type="text"
                id="add-title"
                placeholder="Add Title"
                value={newTitle || ""}
                className="todo-input-textarea"
                onChange={(data) => setNewTitle(data.target.value)}
              />
            </label>

            <label htmlFor="add-details">
              To-do Detail :
              <input
                type="text"
                id="add-details"
                placeholder="Add Detail"
                value={newDetail || ""}
                className="todo-input-textarea"
                onChange={(data) => setNewDetail(data.target.value)}
              />
            </label>
          </div>

          <Button
            className="submit-button"
            variant="contained"
            onClick={emptyHandler}
          >
            Add Task
          </Button>
        </div>
        <div className="todo-output">
          <div className="todo-card-container">
            <h2>Pending</h2>
            <div className="todo-card">
              {toDos?.map((e) => {
                if (e.isCompleted) {
                  return <></>;
                }
                return (
                  <div>
                    {!e.isDeleted && (
                      <TodoCard
                        title={e.title}
                        details={e.detail}
                        key={e.id}
                        id={e.id}
                        onComplete={onCompleteHandler}
                        isCompleted={e.isCompleted}
                        onDelete={onDeleteHandler}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="todo-card-container">
            <h2>Complited</h2>
            <div className="todo-card">
              {toDos?.map((e) => {
                if (e.isCompleted)
                  return (
                    <div>
                      {!e.isDeleted && (
                        <TodoCard
                          title={e.title}
                          details={e.detail}
                          key={e.id}
                          id={e.id}
                          onComplete={onCompleteHandler}
                          onDelete={onDeleteHandler}
                          isCompleted={e.isCompleted}
                        />
                      )}
                    </div>
                  );
                return <></>;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
