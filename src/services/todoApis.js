// src/api/todoApi.js

import axios from "axios";
import { API_URL } from "./../utils/api_url";

const API_URL_TODO = `${API_URL}todos/`;

// Lấy token từ localStorage
const getToken = () => localStorage.getItem("accessToken");

// Cấu hình header Authorization với token
const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const fetchTodos = async () => {
  try {
    const response = await axios.get(API_URL_TODO, getAuthHeader());
    
    return response.data;
  } catch (error) {
    console.log("getAuthHeader: ", getAuthHeader());
    console.error("Có lỗi khi lấy danh sách Todo:", error);
    throw error;
  }
};

export const createTodo = async (title) => {
  try {
    const response = await axios.post(
      API_URL_TODO,
      { title, status: false },
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    console.error("Có lỗi khi thêm Todo:", error);
    throw error;
  }
};

export const updateTodo = async (id, title, status) => {
  try {
    const response = await axios.put(
      `${API_URL_TODO}${id}/`,
      { title, status },
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    console.error("Có lỗi khi cập nhật Todo:", error);
    throw error;
  }
};

export const removeTodo = async (id) => {
  try {
    await axios.delete(`${API_URL_TODO}${id}/`, getAuthHeader());
  } catch (error) {
    console.error("Có lỗi khi xóa Todo:", error);
    throw error;
  }
};
