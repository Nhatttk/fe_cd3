import logo from './logo.svg';
import './App.css';
import Login from './pages/LoginScreen/login';
import { Text } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TodoList from './pages/HomeToDoList/todoList';
import Register from './pages/Register/register';
import PrivateRoute from './components/privateRoute';
function App() {
  return (
    <Router>
      {/* <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav> */}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<TodoList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
