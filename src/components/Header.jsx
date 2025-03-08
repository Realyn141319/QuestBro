import React from "react";
import { Link, useLocation } from "react-router-dom";
import useUserStore from "../store/userStore";
import { gamification } from "../utils/constants";

const Header = () => {
  const location = useLocation();
  const { user, profile, isLoading } = useUserStore();

  // 計算下一級所需經驗值和進度
  const nextLevelXp = profile
    ? gamification.calculateNextLevelXP(profile.level || 1)
    : 100;
  const progressPercentage = profile
    ? ((profile.xp || 0) / nextLevelXp) * 100
    : 0;

  return (
    <header className="shadow-md bg-gradient-to-r from-indigo-600 to-blue-500">
      <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* 左側 Logo 和標語 */}
        <div>
          <Link
            to="/"
            className="flex items-center text-3xl font-bold text-white"
          >
            <svg
              className="w-8 h-8 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
            </svg>
            QuestBro
          </Link>
          <p className="text-sm text-blue-100">完成任務，升級技能，成為傳奇</p>
        </div>

        {/* 右側導航和用戶資訊 */}
        <div className="flex items-center space-x-4">
          {!isLoading && user && profile ? (
            <>
              {/* 用戶資料與經驗值 */}
              <Link
                to="/profile"
                className={`items-center hidden p-2 text-white bg-white rounded-lg md:flex bg-opacity-10 hover:bg-opacity-20 transition-colors ${
                  location.pathname === "/profile"
                    ? "ring-2 ring-white ring-opacity-60"
                    : ""
                }`}
              >
                <div className="flex items-center justify-center w-10 h-10 border-2 border-yellow-300 rounded-full bg-indigo-50">
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-2">
                  <div className="flex items-center">
                    <span className="font-medium">{profile.name}</span>
                    <span className="px-2 py-1 ml-2 text-xs bg-yellow-500 rounded-full">
                      Lv.{profile.level || 1}
                    </span>
                    {profile.title && (
                      <span className="ml-2 text-xs text-blue-200">
                        {profile.title}
                      </span>
                    )}
                  </div>
                  <div className="h-2 mt-1 bg-gray-200 rounded-full w-36 bg-opacity-30">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs mt-0.5 text-blue-100">
                    XP: {profile.xp || 0}/{nextLevelXp}
                  </div>
                </div>
              </Link>

              {/* 功能按鈕 */}
              <div className="flex space-x-2">
                {/* 看板頁面按鈕 */}
                <Link
                  to="/"
                  className={`flex items-center px-4 py-2 text-white transition-colors duration-200 rounded-md ${
                    location.pathname === "/"
                      ? "bg-indigo-700 hover:bg-indigo-800"
                      : "bg-indigo-500 bg-opacity-50 hover:bg-opacity-80"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
                  </svg>
                  看板
                </Link>

                {/* 新增任務按鈕 */}
                <button className="flex items-center px-4 py-2 text-white transition-colors duration-200 bg-green-500 rounded-md hover:bg-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  新增任務
                </button>
              </div>
            </>
          ) : (
            // 未登入狀態或載入中
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="flex items-center px-4 py-2 text-white transition-colors duration-200 bg-indigo-500 bg-opacity-50 rounded-md hover:bg-opacity-80"
              >
                登入
              </Link>
              <Link
                to="/register"
                className="flex items-center px-4 py-2 text-white transition-colors duration-200 bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                註冊
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
