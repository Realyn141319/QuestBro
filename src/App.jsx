import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useUserStore from "./store/userStore";

// 懶加載頁面組件，提高應用性能
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const MainLayout = lazy(() => import("./components/layouts/MainLayout"));
const BoardPage = lazy(() => import("./pages/board/BoardPage"));
const ProfilePage = lazy(() => import("./pages/profile/ProfilePage"));
const DashboardPage = lazy(() => import("./pages/dashboard/DashboardPage"));
const ProjectsPage = lazy(() => import("./pages/projects/ProjectsPage"));
const LeaderboardPage = lazy(() =>
  import("./pages/leaderboard/LeaderboardPage")
);
const AchievementsPage = lazy(() =>
  import("./pages/achievements/AchievementsPage")
);
const TeamsPage = lazy(() => import("./pages/teams/TeamsPage"));
const SettingsPage = lazy(() => import("./pages/settings/SettingsPage"));

// 加載指示器
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-surface-50">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 border-4 rounded-full border-primary-300 border-t-primary-600 animate-spin"></div>
      <p className="font-medium text-surface-600">載入中...</p>
    </div>
  </div>
);

// 需要認證的路由保護
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useUserStore();

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  // 從 Zustand store 獲取初始化方法
  const { initialize, user } = useUserStore();

  // 應用程序啟動時初始化用戶狀態
  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* 公開路由 */}
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" replace /> : <RegisterPage />}
          />

          {/* 需要認證的路由 */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            {/* 使用MainLayout作為這些路由的父組件 */}
            <Route index element={<DashboardPage />} />
            <Route path="board" element={<BoardPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="achievements" element={<AchievementsPage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="teams" element={<TeamsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* 重定向所有未匹配的路由到首頁 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
