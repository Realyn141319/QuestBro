import React, { useState } from "react";
import useUserStore from "../../store/userStore";

// 獎杯圖標組件
const TrophyIcon = ({ position }) => {
  const colors = {
    1: "text-yellow-500",
    2: "text-gray-400",
    3: "text-yellow-700",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-6 h-6 ${colors[position] || "text-surface-400"}`}
    >
      <path d="M11.25 11.25l.041-.02a.75.75 0 01.691.139l2.141 2.14a.75.75 0 11-1.06 1.06l-1.397-1.396-.563.562a1.5 1.5 0 01-2.121 0 1.5 1.5 0 010-2.121l.562-.563-1.396-1.397a.75.75 0 111.06-1.06l2.14 2.141a.75.75 0 01.14.69l-.02.042m-5.497-4.451l4.47-4.469a.75.75 0 011.06 0l4.47 4.469a3 3 0 01.883 2.121c0 .809-.312 1.616-.883 2.121l-4.47 4.47a.75.75 0 01-1.06 0l-4.47-4.47a3 3 0 01-.883-2.121c0-.809.312-1.616.883-2.121M5.25 6A3.75 3.75 0 019 2.25h6A3.75 3.75 0 0118.75 6v1.151c.443.085.866.22 1.254.401a.75.75 0 11-.508 1.408c-.837-.3-1.74-.3-2.577 0a3.69 3.69 0 01-1.589.365 3.74 3.74 0 01-1.590-.365 4.969 4.969 0 00-2.876 0 3.74 3.74 0 01-1.589.365 3.74 3.74 0 01-1.59-.365 4.968 4.968 0 00-2.576 0 .75.75 0 11-.508-1.408c.388-.18.811-.316 1.254-.401V6A2.25 2.25 0 019.75 3.75h4.5A2.25 2.25 0 0116.5 6v1.151c.443.085.866.22 1.254.401a.75.75 0 11-.508 1.408c-.837-.3-1.74-.3-2.577 0a3.69 3.69 0 01-1.589.365 3.74 3.74 0 01-1.59-.365 4.969 4.969 0 00-2.876 0 3.74 3.74 0 01-1.589.365 3.74 3.74 0 01-1.59-.365 4.968 4.968 0 00-2.576 0 .75.75 0 11-.508-1.408c.388-.18.811-.316 1.254-.401V6z" />
    </svg>
  );
};

// 排行榜過濾器
const LeaderboardFilter = ({ filters, setFilters }) => (
  <div className="flex flex-col mb-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
    <div className="w-full sm:w-auto">
      <select
        value={filters.timeframe}
        onChange={(e) => setFilters({ ...filters, timeframe: e.target.value })}
        className="block w-full py-2 pl-3 pr-10 text-sm border rounded-md border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      >
        <option value="all-time">全部時間</option>
        <option value="monthly">本月</option>
        <option value="weekly">本週</option>
        <option value="daily">今日</option>
      </select>
    </div>

    <div className="w-full sm:w-auto">
      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        className="block w-full py-2 pl-3 pr-10 text-sm border rounded-md border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      >
        <option value="xp">經驗值 (XP)</option>
        <option value="tasks-completed">已完成任務</option>
        <option value="streak">連續活躍天數</option>
        <option value="achievements">成就數量</option>
      </select>
    </div>

    <div className="w-full sm:w-auto">
      <select
        value={filters.role}
        onChange={(e) => setFilters({ ...filters, role: e.target.value })}
        className="block w-full py-2 pl-3 pr-10 text-sm border rounded-md border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      >
        <option value="all">所有角色</option>
        <option value="strategist">戰略家</option>
        <option value="executor">執行者</option>
        <option value="collaborator">協作者</option>
        <option value="innovator">創新者</option>
        <option value="manager">管理者</option>
      </select>
    </div>

    <div className="relative w-full sm:w-72">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-surface-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="搜尋用戶..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        className="block w-full py-2 pl-10 pr-3 text-sm border rounded-md border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      />
    </div>
  </div>
);

// 用戶排名列表項
const UserRankItem = ({ user, rank, currentUserId }) => {
  const isCurrentUser = user.id === currentUserId;
  const roleColors = {
    strategist: "bg-blue-100 text-blue-800",
    executor: "bg-yellow-100 text-yellow-800",
    collaborator: "bg-green-100 text-green-800",
    innovator: "bg-purple-100 text-purple-800",
    manager: "bg-red-100 text-red-800",
  };

  const roleText = {
    strategist: "戰略家",
    executor: "執行者",
    collaborator: "協作者",
    innovator: "創新者",
    manager: "管理者",
  };

  return (
    <div
      className={`p-4 border rounded-lg transition-colors ${
        isCurrentUser
          ? "bg-primary-50 border-primary-200"
          : "bg-white border-surface-200 hover:border-primary-200"
      }`}
    >
      <div className="flex items-center">
        {/* 排名與獎杯 */}
        <div className="flex-shrink-0 w-12 text-center">
          {rank <= 3 ? (
            <TrophyIcon position={rank} />
          ) : (
            <span
              className={`inline-flex items-center justify-center w-8 h-8 text-sm font-semibold ${
                isCurrentUser
                  ? "bg-primary-100 text-primary-800"
                  : "bg-surface-100 text-surface-700"
              } rounded-full`}
            >
              {rank}
            </span>
          )}
        </div>

        {/* 用戶頭像 */}
        <div className="relative flex-shrink-0">
          <div
            className={`w-12 h-12 flex items-center justify-center text-white font-bold text-lg rounded-full ${
              isCurrentUser
                ? "bg-gradient-to-br from-primary-400 to-primary-600"
                : "bg-gradient-to-br from-surface-400 to-surface-600"
            }`}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full rounded-full"
              />
            ) : (
              user.name?.charAt(0)
            )}
          </div>
        </div>

        {/* 用戶資料 */}
        <div className="flex-grow ml-4">
          <div className="flex items-center">
            <h3 className="text-base font-semibold text-surface-900">
              {user.name}
              {isCurrentUser && (
                <span className="ml-2 text-xs font-medium text-primary-600">
                  (你)
                </span>
              )}
            </h3>
          </div>
          <div className="flex items-center mt-1 space-x-2">
            <span className="inline-flex items-center px-1.5 py-0.5 text-xs font-medium rounded-full bg-achievement-100 text-achievement-800">
              Lv. {user.level}
            </span>
            <span
              className={`inline-flex items-center px-1.5 py-0.5 text-xs font-medium rounded-full ${
                roleColors[user.role]
              }`}
            >
              {roleText[user.role]}
            </span>
          </div>
        </div>

        {/* 用戶數值 */}
        <div className="flex flex-col items-end ml-4">
          <div className="text-xl font-bold text-surface-900">{user.xp}</div>
          <div className="text-xs text-surface-500">經驗值</div>
        </div>
      </div>

      {/* 其他統計數據 */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="p-2 text-center rounded-md bg-surface-50">
          <div className="text-sm font-semibold text-surface-700">
            {user.completedTasks}
          </div>
          <div className="text-xs text-surface-500">完成任務</div>
        </div>
        <div className="p-2 text-center rounded-md bg-surface-50">
          <div className="text-sm font-semibold text-surface-700">
            {user.streak || 0}
          </div>
          <div className="text-xs text-surface-500">連續活躍</div>
        </div>
        <div className="p-2 text-center rounded-md bg-surface-50">
          <div className="text-sm font-semibold text-surface-700">
            {user.achievements?.length || 0}
          </div>
          <div className="text-xs text-surface-500">成就</div>
        </div>
      </div>

      {isCurrentUser && user.nextMilestone && (
        <div className="mt-4 text-sm text-surface-600">
          <div className="mb-1 text-xs font-medium text-surface-500">
            距離下一等級還需 {user.nextMilestone.xpNeeded} XP
          </div>
          <div className="w-full h-1.5 bg-surface-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600"
              style={{ width: `${user.nextMilestone.progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

// 排行榜頁面
const LeaderboardPage = () => {
  const { user, profile } = useUserStore();
  const [filters, setFilters] = useState({
    timeframe: "all-time",
    category: "xp",
    role: "all",
    search: "",
  });

  // 模擬排行榜數據
  const [leaderboardData] = useState([
    {
      id: "user-1",
      name: "頂尖玩家",
      role: "strategist",
      level: 10,
      xp: 1250,
      completedTasks: 145,
      streak: 21,
      achievements: Array(12).fill({}),
    },
    {
      id: "user-2",
      name: "專業達人",
      role: "executor",
      level: 8,
      xp: 950,
      completedTasks: 110,
      streak: 14,
      achievements: Array(8).fill({}),
    },
    {
      id: "user-3",
      name: "合作之王",
      role: "collaborator",
      level: 7,
      xp: 780,
      completedTasks: 92,
      streak: 9,
      achievements: Array(7).fill({}),
    },
    {
      id: user?.id || "current-user",
      name: profile?.name || "您",
      role: profile?.role || "executor",
      level: profile?.level || 3,
      xp: profile?.xp || 230,
      completedTasks: profile?.completedTasks || 12,
      streak: 5,
      achievements: Array(3).fill({}),
      nextMilestone: {
        level: (profile?.level || 3) + 1,
        xpNeeded: 100 - ((profile?.xp || 230) % 100),
        progress: (profile?.xp || 230) % 100,
      },
    },
    {
      id: "user-4",
      name: "創意達人",
      role: "innovator",
      level: 5,
      xp: 520,
      completedTasks: 65,
      streak: 7,
      achievements: Array(5).fill({}),
    },
    {
      id: "user-5",
      name: "團隊領袖",
      role: "manager",
      level: 6,
      xp: 640,
      completedTasks: 75,
      streak: 12,
      achievements: Array(6).fill({}),
    },
    {
      id: "user-6",
      name: "新手玩家",
      role: "executor",
      level: 2,
      xp: 120,
      completedTasks: 8,
      streak: 3,
      achievements: Array(1).fill({}),
    },
    {
      id: "user-7",
      name: "技術專家",
      role: "strategist",
      level: 4,
      xp: 380,
      completedTasks: 43,
      streak: 0,
      achievements: Array(4).fill({}),
    },
    {
      id: "user-8",
      name: "分析精英",
      role: "strategist",
      level: 5,
      xp: 490,
      completedTasks: 55,
      streak: 5,
      achievements: Array(5).fill({}),
    },
    {
      id: "user-9",
      name: "積極貢獻者",
      role: "collaborator",
      level: 3,
      xp: 270,
      completedTasks: 32,
      streak: 2,
      achievements: Array(2).fill({}),
    },
  ]);

  // 過濾並排序數據
  const filteredAndSortedData = leaderboardData
    .filter((userData) => {
      // 搜尋過濾
      if (
        filters.search &&
        !userData.name.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // 角色過濾
      if (filters.role !== "all" && userData.role !== filters.role) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // 排序
      switch (filters.category) {
        case "xp":
          return b.xp - a.xp;
        case "tasks-completed":
          return b.completedTasks - a.completedTasks;
        case "streak":
          return b.streak - a.streak;
        case "achievements":
          return (b.achievements?.length || 0) - (a.achievements?.length || 0);
        default:
          return b.xp - a.xp;
      }
    });

  // 用戶當前排名
  const currentUserRank =
    filteredAndSortedData.findIndex(
      (u) => u.id === (user?.id || "current-user")
    ) + 1;

  // 頂部排名用戶
  const topUsers = filteredAndSortedData.slice(0, 3);

  return (
    <div className="space-y-6">
      <h1 className="page-title">排行榜</h1>

      {/* 過濾器 */}
      <LeaderboardFilter filters={filters} setFilters={setFilters} />

      {/* 頂部玩家展示 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {topUsers.map((topUser, index) => (
          <div
            key={topUser.id}
            className={`relative overflow-hidden rounded-xl border ${
              index === 0
                ? "border-yellow-300 bg-gradient-to-b from-yellow-50 to-white"
                : index === 1
                ? "border-gray-300 bg-gradient-to-b from-gray-50 to-white"
                : "border-yellow-700 bg-gradient-to-b from-yellow-50/30 to-white"
            }`}
          >
            {/* 頂部裝飾 */}
            <div
              className={`absolute top-0 inset-x-0 h-1 ${
                index === 0
                  ? "bg-yellow-500"
                  : index === 1
                  ? "bg-gray-400"
                  : "bg-yellow-700"
              }`}
            ></div>

            <div className="p-4">
              {/* 獎杯與排名 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrophyIcon position={index + 1} />
                  <span className="ml-2 text-lg font-bold text-surface-800">
                    第 {index + 1} 名
                  </span>
                </div>
                <span
                  className={`text-sm font-medium ${
                    topUser.id === (user?.id || "current-user")
                      ? "text-primary-600"
                      : "text-surface-500"
                  }`}
                >
                  {topUser.id === (user?.id || "current-user") ? "(你)" : ""}
                </span>
              </div>

              {/* 玩家資訊 */}
              <div className="flex items-center mt-3">
                <div
                  className={`flex-shrink-0 w-16 h-16 flex items-center justify-center text-white font-bold text-2xl rounded-full ${
                    index === 0
                      ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                      : index === 1
                      ? "bg-gradient-to-br from-gray-400 to-gray-600"
                      : "bg-gradient-to-br from-yellow-700 to-yellow-900"
                  }`}
                >
                  {topUser.avatar ? (
                    <img
                      src={topUser.avatar}
                      alt={topUser.name}
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    topUser.name?.charAt(0)
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-surface-900">
                    {topUser.name}
                  </h3>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-achievement-100 text-achievement-800">
                      Lv. {topUser.level}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        topUser.role === "strategist"
                          ? "bg-blue-100 text-blue-800"
                          : topUser.role === "executor"
                          ? "bg-yellow-100 text-yellow-800"
                          : topUser.role === "collaborator"
                          ? "bg-green-100 text-green-800"
                          : topUser.role === "innovator"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {topUser.role === "strategist" && "戰略家"}
                      {topUser.role === "executor" && "執行者"}
                      {topUser.role === "collaborator" && "協作者"}
                      {topUser.role === "innovator" && "創新者"}
                      {topUser.role === "manager" && "管理者"}
                    </span>
                  </div>
                </div>
              </div>

              {/* 數據統計 */}
              <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-3">
                <div
                  className={`flex flex-col items-center justify-center py-2 rounded-lg ${
                    filters.category === "xp"
                      ? "bg-primary-100 text-primary-800"
                      : "bg-surface-100"
                  }`}
                >
                  <div className="text-2xl font-bold">{topUser.xp}</div>
                  <div className="text-xs font-medium">經驗值</div>
                </div>
                <div
                  className={`flex flex-col items-center justify-center py-2 rounded-lg ${
                    filters.category === "tasks-completed"
                      ? "bg-primary-100 text-primary-800"
                      : "bg-surface-100"
                  }`}
                >
                  <div className="text-2xl font-bold">
                    {topUser.completedTasks}
                  </div>
                  <div className="text-xs font-medium">完成任務</div>
                </div>
                <div
                  className={`flex flex-col items-center justify-center py-2 rounded-lg ${
                    filters.category === "achievements"
                      ? "bg-primary-100 text-primary-800"
                      : "bg-surface-100"
                  }`}
                >
                  <div className="text-2xl font-bold">
                    {topUser.achievements?.length || 0}
                  </div>
                  <div className="text-xs font-medium">成就</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 用戶當前排名提示 */}
      {currentUserRank > 3 && (
        <div className="p-4 text-center border rounded-lg bg-primary-50 border-primary-200">
          <p className="text-surface-700">
            你目前排名第{" "}
            <span className="font-bold text-primary-700">
              {currentUserRank}
            </span>{" "}
            位
            {currentUserRank <= 10
              ? "，再接再厲，即將衝進前三名！"
              : "，努力提升，朝著前十名前進吧！"}
          </p>
        </div>
      )}

      {/* 排行榜列表 */}
      <div className="space-y-4">
        <h2 className="section-title">所有用戶排名</h2>
        <div className="grid grid-cols-1 gap-4">
          {filteredAndSortedData.slice(3).map((userData, index) => (
            <UserRankItem
              key={userData.id}
              user={userData}
              rank={index + 4} // +4 因為前三名已經單獨顯示
              currentUserId={user?.id || "current-user"}
            />
          ))}
        </div>
      </div>

      {/* 空狀態 */}
      {filteredAndSortedData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <svg
            className="w-16 h-16 text-surface-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-surface-900">
            沒有找到符合條件的用戶
          </h3>
          <p className="mt-2 text-surface-500">請嘗試調整過濾條件</p>
        </div>
      )}
    </div>
  );
};

export default LeaderboardPage;
