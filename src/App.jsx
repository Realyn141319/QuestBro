import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import BoardPage from "./pages/board/BoardPage";
import useUserStore from "./store/userStore";
import "./App.css";

function App() {
  // 從 Zustand store 獲取初始化方法
  const { initialize } = useUserStore();

  // 應用程序啟動時初始化用戶狀態
  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <BrowserRouter>
      <Routes>
        {/* 認證路由 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 應用程序路由 */}
        <Route path="/" element={<BoardPage />} />

        {/* 重定向所有未匹配的路由到首頁 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
