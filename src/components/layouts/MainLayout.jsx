import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import useUserStore from "../../store/userStore";

// 側邊欄導航項目
const navItems = [
  {
    name: "儀表板",
    path: "/",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    name: "看板",
    path: "/board",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  },
  {
    name: "專案",
    path: "/projects",
    icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
  },
  {
    name: "個人檔案",
    path: "/profile",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    name: "成就",
    path: "/achievements",
    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  },
  {
    name: "排行榜",
    path: "/leaderboard",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
  {
    name: "團隊",
    path: "/teams",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656.126-1.283.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    name: "設定",
    path: "/settings",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    iconSecondary: "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
];

// SVG 圖標組件
const SvgIcon = ({ path, secondaryPath, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "w-5 h-5"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d={path}
    />
    {secondaryPath && (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d={secondaryPath}
      />
    )}
  </svg>
);

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, signOut } = useUserStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); // 模擬有3個未讀通知

  // 處理登出
  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  // 當路由變化時關閉移動端選單
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="flex h-screen bg-surface-50">
      {/* 側邊導航 - 桌面版 */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* 側邊欄 */}
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
            <div className="flex items-center flex-shrink-0 px-4 mb-8">
              {/* Logo 和產品名稱 */}
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-lg bg-gradient-to-r from-primary-500 to-primary-600">
                  <span className="text-xl font-bold text-white">Q</span>
                </div>
                <span className="ml-2 text-xl font-bold text-surface-800">
                  QuestBro
                </span>
              </div>
            </div>
            <div className="flex flex-col flex-grow">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {navItems.map((item) => {
                  const isActive =
                    location.pathname === item.path ||
                    (item.path === "/" && location.pathname === "/") ||
                    (item.path !== "/" &&
                      location.pathname.startsWith(item.path));
                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={({ isActive }) =>
                        `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                          isActive
                            ? "bg-primary-50 text-primary-700"
                            : "text-surface-600 hover:bg-surface-100"
                        }`
                      }
                    >
                      <SvgIcon
                        path={item.icon}
                        secondaryPath={item.iconSecondary}
                        className={`mr-3 flex-shrink-0 h-5 w-5 ${
                          isActive ? "text-primary-600" : "text-surface-500"
                        }`}
                      />
                      {item.name}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
            {/* 用戶資訊 */}
            <div className="flex items-center p-4 border-t">
              <div className="flex items-center min-w-0 mx-3">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="flex items-center justify-center w-10 h-10 overflow-hidden text-white rounded-full bg-gradient-to-r from-primary-500 to-primary-600">
                      {profile?.name?.[0] || user?.email?.[0] || "U"}
                    </div>
                    <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          true ? "bg-green-400" : "bg-surface-300"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="min-w-0 ml-3">
                  <p className="text-sm font-medium truncate text-surface-800">
                    {profile?.name || user?.email}
                  </p>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-1.5 py-0.5 text-xs font-medium bg-achievement-100 text-achievement-800 rounded-full">
                      Lv. {profile?.level || 1}
                    </span>
                    <span className="ml-2 text-xs truncate text-surface-500">
                      {profile?.role === "executor" && "執行者"}
                      {profile?.role === "strategist" && "戰略家"}
                      {profile?.role === "collaborator" && "協作者"}
                      {profile?.role === "innovator" && "創新者"}
                      {profile?.role === "manager" && "管理者"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-1 ml-auto rounded-full text-surface-400 hover:text-surface-600 focus:outline-none"
              >
                <SvgIcon path="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 主要內容區 */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* 頂部導航欄 */}
        <div className="relative z-10 flex flex-shrink-0 h-16 shadow">
          <div className="flex items-center justify-between flex-1 px-4 md:px-6">
            <div className="flex items-center flex-1">
              {/* 移動端選單按鈕 */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 -ml-3 rounded-md text-surface-500 md:hidden focus:outline-none"
              >
                <span className="sr-only">開啟選單</span>
                <SvgIcon path="M4 6h16M4 12h16M4 18h16" />
              </button>
              <div className="flex items-center ml-2 md:ml-0">
                {/* 移動端 Logo */}
                <div className="flex items-center md:hidden">
                  <div className="flex items-center justify-center w-8 h-8 mr-2 overflow-hidden rounded-lg bg-gradient-to-r from-primary-500 to-primary-600">
                    <span className="text-lg font-bold text-white">Q</span>
                  </div>
                  <span className="text-lg font-semibold text-surface-800">
                    QuestBro
                  </span>
                </div>
                {/* 搜尋框 */}
                <div className="hidden w-full max-w-lg ml-2 mr-auto md:flex">
                  <label htmlFor="search" className="sr-only">
                    搜尋
                  </label>
                  <div className="relative flex items-center w-full text-surface-400 focus-within:text-surface-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <SvgIcon path="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full h-full py-2 pl-10 pr-3 border-transparent rounded-md focus:ring-0 focus:outline-none bg-surface-100 focus:bg-white text-surface-900 placeholder-surface-500 focus:placeholder-surface-400 sm:text-sm"
                      placeholder="搜尋任務、專案或團隊"
                      type="search"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              {/* 通知按鈕 */}
              <button className="relative p-2 rounded-full text-surface-500 bg-surface-100 hover:text-surface-600 hover:bg-surface-200 focus:outline-none focus:bg-surface-200 focus:text-surface-600">
                <span className="sr-only">查看通知</span>
                <SvgIcon path="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                {notifications > 0 && (
                  <span className="notification-badge">{notifications}</span>
                )}
              </button>

              {/* 移動端頭像 (僅在移動版顯示) */}
              <div className="ml-3 md:hidden">
                <div className="relative">
                  <div className="flex items-center justify-center w-8 h-8 overflow-hidden text-white rounded-full bg-gradient-to-r from-primary-500 to-primary-600">
                    {profile?.name?.[0] || user?.email?.[0] || "U"}
                  </div>
                  <div className="absolute bottom-0 right-0 p-0.5 bg-white rounded-full">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 移動端選單 */}
        <div
          className={`fixed inset-0 z-40 flex md:hidden transition-all duration-300 transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* 背景遮罩 */}
          <div
            className={`fixed inset-0 bg-surface-600 bg-opacity-75 transition-opacity ${
              isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* 側邊導航面板 */}
          <div className="relative flex flex-col flex-1 w-full max-w-xs bg-white">
            <div className="flex items-center justify-between px-4 pt-5 pb-6">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-lg bg-gradient-to-r from-primary-500 to-primary-600">
                  <span className="text-xl font-bold text-white">Q</span>
                </div>
                <span className="ml-2 text-xl font-bold text-surface-800">
                  QuestBro
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center p-2 rounded-md text-surface-400 hover:text-surface-500 focus:outline-none"
              >
                <span className="sr-only">關閉選單</span>
                <SvgIcon path="M6 18L18 6M6 6l12 12" />
              </button>
            </div>
            <div className="flex-1 h-0 overflow-y-auto">
              <nav className="px-2 space-y-1">
                {navItems.map((item) => {
                  const isActive =
                    location.pathname === item.path ||
                    (item.path === "/" && location.pathname === "/") ||
                    (item.path !== "/" &&
                      location.pathname.startsWith(item.path));
                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={({ isActive }) =>
                        `group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                          isActive
                            ? "bg-primary-50 text-primary-700"
                            : "text-surface-600 hover:bg-surface-100"
                        }`
                      }
                    >
                      <SvgIcon
                        path={item.icon}
                        secondaryPath={item.iconSecondary}
                        className={`mr-4 flex-shrink-0 h-6 w-6 ${
                          isActive ? "text-primary-600" : "text-surface-500"
                        }`}
                      />
                      {item.name}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
            <div className="flex items-center p-4 border-t">
              <div className="flex items-center min-w-0 mx-3">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 overflow-hidden text-white rounded-full bg-gradient-to-r from-primary-500 to-primary-600">
                    {profile?.name?.[0] || user?.email?.[0] || "U"}
                  </div>
                </div>
                <div className="min-w-0 ml-3">
                  <p className="text-sm font-medium truncate text-surface-800">
                    {profile?.name || user?.email}
                  </p>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-1.5 py-0.5 text-xs font-medium bg-achievement-100 text-achievement-800 rounded-full">
                      Lv. {profile?.level || 1}
                    </span>
                    <span className="ml-2 text-xs truncate text-surface-500">
                      {profile?.role === "executor" && "執行者"}
                      {profile?.role === "strategist" && "戰略家"}
                      {profile?.role === "collaborator" && "協作者"}
                      {profile?.role === "innovator" && "創新者"}
                      {profile?.role === "manager" && "管理者"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-1 ml-auto rounded-full text-surface-400 hover:text-surface-600"
              >
                <SvgIcon path="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </button>
            </div>
          </div>
        </div>

        {/* 主要內容區域 */}
        <main className="relative flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
