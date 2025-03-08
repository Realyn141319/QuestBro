import React from "react";
import { Navigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import RegisterForm from "../../components/auth/RegisterForm";
import useUserStore from "../../store/userStore";

const RegisterPage = () => {
  // 從 Zustand store 獲取使用者狀態
  const { user, isLoading } = useUserStore();

  // 如果已經登入，重新導向到首頁
  if (user && !isLoading) {
    return <Navigate to="/" replace />;
  }

  return (
    <AuthLayout
      title="註冊 QuestBro"
      subtitle="創建帳號以開始您的任務與成就之旅"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
