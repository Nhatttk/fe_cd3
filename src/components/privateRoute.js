import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // Kiểm tra xem người dùng có token không
  const isAuthenticated = localStorage.getItem("accessToken") !== null;

  // Nếu không có token, chuyển hướng về trang đăng nhập
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
