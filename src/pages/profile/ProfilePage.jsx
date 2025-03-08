import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../../components/Header";
import ProfileCard from "../../components/profile/ProfileCard";
import AchievementsList from "../../components/profile/AchievementsList";
import useUserStore from "../../store/userStore";

const ProfilePage = () => {
  // 從 Zustand store 獲取使用者狀態和相關方法
  const { user, profile, isLoading, error, fetchProfile, fetchAchievements } =
    useUserStore();

  // 載入中狀態
  const [isPageLoading, setIsPageLoading] = useState(true);

  // 初始化組件
  useEffect(() => {
    const initializeProfilePage = async () => {
      if (user) {
        // 獲取完整的使用者資料
        await fetchProfile(user.id);
        // 獲取使用者成就
        await fetchAchievements();
      }
      setIsPageLoading(false);
    };

    initializeProfilePage();
  }, [user, fetchProfile, fetchAchievements]);

  // 如果未登入，重新導向到登入頁面
  if (!isLoading && !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {isPageLoading || isLoading ? (
          // 載入中狀態顯示
          <div className="flex flex-col items-center justify-center py-12">
            <svg
              className="w-12 h-12 text-indigo-600 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            <p className="mt-4 text-lg text-gray-700">載入個人資料中...</p>
          </div>
        ) : error ? (
          // 錯誤狀態顯示
          <div className="p-4 rounded-md bg-red-50">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="w-5 h-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  載入個人資料時發生錯誤
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // 正常顯示內容
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* 左側個人資料卡 */}
            <div className="lg:col-span-1">
              <ProfileCard profile={profile} isCurrentUser={true} />
            </div>

            {/* 右側成就列表 */}
            <div className="lg:col-span-2">
              <AchievementsList achievements={profile?.achievements || []} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
