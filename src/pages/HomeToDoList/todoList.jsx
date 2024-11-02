import React, { useEffect, useState } from "react";
import TodoCompo from "./TodoCompo";
import "./Todo.css";
import { createTodo, fetchTodos, removeTodo, updateTodo } from "../../services/todoApis";
import { getUser } from "../../services/auth";
import { useNavigate } from "react-router-dom";
function TodoList() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [todoData, setTodoData] = useState([]); 
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 4; 

  const handleQuery = (query) => {
    setQuery(query.target.value);
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await getUser();
        console.log("response: ", response);
        if (response.user != null) {
            loadTodos();
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Token sai", error);
        navigate("/login");
      }
    };

    const loadTodos = async () => {
      try {
        const todosData = await fetchTodos();
        console.log("data: ", todosData);
        
        setTodoData(todosData);
        setMessage("");
      } catch (error) {
        setMessage("Have some error loading");
      }
    };

    checkToken();
  }, [page]);

  const addQuery = async () => {
    if (query.trim() === "") return;

    try {
      const newTodoData = await createTodo(query);
      setTodoData((prevTodoData) => [...prevTodoData, newTodoData]);
      setQuery("");
      setMessage("");
    } catch (error) {
      setMessage("You do not permission add");
    }
  };

  const handleStatus = async (id) => {
    const todoToUpdate = todoData.find((todo) => todo.id === id);
    if (!todoToUpdate) return;
    const updatedStatus =!todoToUpdate.status
    try {
      await updateTodo(id, todoToUpdate.title, !todoToUpdate.status); // Cập nhật Todo trên server
      setTodoData((prevTodoData) =>
        prevTodoData.map((todo) =>
          todo.id === id ? { ...todo, status: updatedStatus } : todo
        )
      );// Cập nhật state
      setMessage("");
    } catch (error) {
      setMessage("You do not permission update");
    }
  };

  const remove = async (id) => {
    try {
      await removeTodo(id); // Xóa Todo trên server
      setTodoData(todoData.filter((e) => e.id !== id)); // Cập nhật state
      setMessage("")
    } catch (error) {
      setMessage("You do not permission remove");
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  }

  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = todoData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className="card">
        <h1 style={{ textAlign: "center", marginTop: 10 }}>Todo List !!</h1>
          {message && <p style={{ color: "red" }}>{JSON.stringify(message)}</p>}
        <input
          style={{ marginTop: 10, marginBottom: 20 }}
          className="form-control"
          type="text"
          placeholder="enter your list item here ..."
          onChange={handleQuery}
          value={query}
        />
        <button type="button" className="btn btn-dark" onClick={addQuery}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#Id</th>
              <th scope="col">Work</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => {
              return (
                <TodoCompo
                  key={item.id}
                  color={"red"}
                  item={item.title}
                  status={item.status}
                  id={item.id}
                  handleStatus={handleStatus}
                  remove={remove}
                />
              );
            })}
          </tbody>
        </table>
        <button
          type="button"
          onClick={() => {
            if (page === 1) return;
            setPage(page - 1);
          }}
          className="btn btn-success"
        >
          Prev
        </button>
        <br />
        <button
          type="button"
          onClick={() => {
            if (currentItems.length < itemsPerPage) return; // Không có item mới để chuyển trang
            setPage(page + 1);
          }}
          className="btn btn-success"
        >
          Next
        </button>
        <br />
        <button
          type="button"
          style={{
            marginBottom: 15,
            maxWidth: 300,
            marginLeft: "auto",
            marginRight: "auto",
          }}
          className="btn btn-dark"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default TodoList;
