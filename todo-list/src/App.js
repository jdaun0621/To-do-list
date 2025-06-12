import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const ToDoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "자바스크립트 공부하기", completed: false },
    { id: 2, text: "수행평가 준비하기", completed: false },
    { id: 3, text: "운동하기", completed: false },
  ]);

  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleAdd = () => {
    if (!input.trim()) {
      alert("빈 문자열은 입력할 수 없음");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setInput("");
    inputRef.current.focus();
  };

  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("정말 삭제하겠습니까?");
    if (confirmDelete) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  return (
    <div>
      <header>
        <div className="logo">
          <a href="#" className="logo">
            <img src="images/Check.png" alt="Logo" />
          </a>
        </div>
      </header>

      <div className="container">
      <div className="banner"
  style={{ backgroundImage: "url('/images/banner.jpg')" }}>

          
          <div className="overlay"></div>
          <div className="text">
            <div className="title">목표를 달성하는 첫 걸음</div>
            <div className="sub">
              완벽한 할 일 관리의 시작<br />
              To-do List로 당신의 하루를 효율적으로 관리하세요.
            </div>
          </div>
        </div>

        <div className="contents">
          <p>리스트 목록</p>
          <div className="todoInput">
            <input
              type="text"
              className="todoText"
              placeholder="해야할 일을 입력하세요."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              ref={inputRef}
            />
            <button className="addBtn" onClick={handleAdd}>
              추가
            </button>
          </div>

          <ul className="todoList">
            {todos.map((todo) => (
              <li className="todo" key={todo.id}>
                <span
                  className={`task ${todo.completed ? "completed" : ""}`}
                  onClick={() => handleToggle(todo.id)}
                >
                  {todo.text}
                </span>
                <span className="trash" onClick={() => handleDelete(todo.id)}>
                  x
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
