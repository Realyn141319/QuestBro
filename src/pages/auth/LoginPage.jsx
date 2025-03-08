import React from "react";
import { Navigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";
import useUserStore from "../../store/userStore";

const LoginPage = () => {
  // 從 Zustand store 獲取使用者狀態
  const { user, isLoading } = useUserStore();

  // 如果已經登入，重新導向到首頁
  if (user && !isLoading) {
    return <Navigate to="/" replace />;
  }

  return (
    <AuthLayout
      title="登入 QuestBro"
      subtitle="使用您的帳號完成任務、獲得成就並提升等級"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
