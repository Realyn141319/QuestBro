import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Header from "../../components/Header";
import Board from "../../components/Board";
import useUserStore from "../../store/userStore";
import useTaskStore from "../../store/taskStore";

const BoardPage = () => {
  // 從 Zustand store 獲取用戶狀態和任務狀態
  const { user, isLoading: userLoading, initialize } = useUserStore();
  const { initializeTasks, subscribeToTaskUpdates, unsubscribe } =
    useTaskStore();

  // 初始化用戶資料和任務資料
  useEffect(() => {
    // 初始化用戶資料
    initialize();

    // 初始化任務資料
    initializeTasks();

    // 訂閱即時任務更新
    const subscription = subscribeToTaskUpdates();

    // 組件卸載時取消訂閱
    return () => {
      if (subscription) {
        unsubscribe();
      }
    };
  }, [initialize, initializeTasks, subscribeToTaskUpdates, unsubscribe]);

  // 如果未登入，重定向到登入頁面
  if (!userLoading && !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Board />
      </main>
    </div>
  );
};

export default BoardPage;
