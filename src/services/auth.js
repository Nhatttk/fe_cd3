import { API_URL } from "./../utils/api_url";
import axios from "axios";


export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}login/`, {
      username: username,
      password: password,
    });
    console.log("token: ", response.data)
    return response.data;
  } catch (error) {
    console.error("Có lỗi khi thêm Todo:", error);
    throw error;  
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}register/`, userData);
    return response.data; // Trả về dữ liệu từ phản hồi
  } catch (error) {
    throw error.response ? error.response.data : new Error("An error occurred");
  }
};

export const getUser = async () => {
  try {
    const response = await axios.post(`${API_URL}get-user/`, {
        token: localStorage.getItem("accessToken"),
    });
    return response.data;
  } catch (error) {
    console.error("getUser errors", error);
    throw error;
  }
};