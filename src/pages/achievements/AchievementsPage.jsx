import React, { useState } from "react";
import useUserStore, { ACHIEVEMENT_TYPES } from "../../store/userStore";

// 成就卡片組件
const AchievementCard = ({ achievement, isUnlocked, progress }) => {
  // 根據解鎖狀態調整樣式
  const cardStyle = isUnlocked
    ? "border-achievement-200 bg-gradient-to-br from-achievement-50 to-white"
    : "border-surface-200 bg-surface-50 opacity-75";

  // 圖標顏色
  const iconStyle = isUnlocked
    ? "text-white bg-gradient-to-br from-achievement-400 to-achievement-600"
    : "text-surface-400 bg-surface-200";

  // 標題顏色
  const titleStyle = isUnlocked ? "text-surface-900" : "text-surface-500";

  // 進度條樣式
  const progressBarStyle = isUnlocked ? "bg-achievement-500" : "bg-surface-300";

  return (
    <div
      className={`relative rounded-xl border p-4 transition-all duration-300 hover:shadow-md ${cardStyle}`}
    >
      {/* 獎杯標記 - 僅對已解鎖的成就顯示 */}
      {isUnlocked && (
        <div className="absolute flex items-center justify-center text-white bg-yellow-400 rounded-full shadow -right-2 -top-2 h-7 w-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.937 6.937 0 006.229 6.71c.15 1.074.398 2.126.765 3.136.022.06.04.119.063.179a1.848 1.848 0 01-1.821-.664c-.41-.419-.919-.848-1.505-1.283a3.49 3.49 0 00-2.07-.642 3.49 3.49 0 00-2.07.642c-.586.435-1.094.864-1.504 1.283-.848.864-.524 2.284.683 2.498.752.135 1.53.21 2.33.21.012 0 .023 0 .036-.002.15.15.333.297.539.446.583.418 1.275.705 1.987.705 1.08 0 2.121-.765 2.706-1.305 1.086-1.002 2.264-1.516 3.414-1.305 1.16.212 2.206.992 3.212 2.449C15.25 18.756 17.394 20 19.735 20c.17 0 .34-.007.51-.02.755-.056 1.298-.736 1.298-1.466 0-.347-.121-.678-.343-.94-.728-.85-1.189-1.876-1.39-2.92a3.217 3.217 0 01.09-1.541 2.078 2.078 0 011.022-1.097c.286-.12.57-.27.846-.451.7-.457 1.148-1.185 1.148-1.987 0-1.498-1.45-2.627-3.208-2.512-1.608.106-3.049.71-4.281 1.593-1.102-.878-2.4-1.431-3.821-1.431-2.358 0-4.35 1.237-5.458 3.057a8.814 8.814 0 01-.874-.943 5.313 5.313 0 01-1.08-2.528 61.78 61.78 0 012.121-.513v.859a.75.75 0 101.5 0v-.93a60.546 60.546 0 012.25-.293v.764a.75.75 0 001.5 0V2.3c.67.018 1.337.05 2 .098v.764a.75.75 0 001.5 0v-.695c.663.061 1.322.138 1.972.229.17.024.306.17.306.343 0 .172-.134.32-.304.345a56.035 56.035 0 00-1.91.312V2.621a.75.75 0 00-1.5 0v.862c-.663.11-1.322.205-1.978.29v-.764a.75.75 0 00-1.5 0v.686c-.704.072-1.406.157-2.106.256v-.795a.75.75 0 00-1.5 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      <div className="flex items-start">
        {/* 成就圖標 */}
        <div
          className={`mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg ${iconStyle}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                achievement.icon ||
                "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              }
            />
          </svg>
        </div>

        {/* 成就內容 */}
        <div className="flex-grow">
          <h3 className={`text-lg font-semibold ${titleStyle}`}>
            {achievement.name}
          </h3>
          <p className="mt-1 text-sm text-surface-500">
            {achievement.description}
          </p>

          {/* 解鎖時間或進度 */}
          <div className="mt-3">
            {isUnlocked ? (
              <div className="text-xs text-achievement-600">
                <span className="font-medium">已解鎖</span>
                {achievement.unlockedAt && (
                  <span className="ml-2">{achievement.unlockedAt}</span>
                )}
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-surface-500">
                  <span>進度</span>
                  <span>
                    {progress.current}/{progress.total}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-100">
                  <div
                    className={`h-full rounded-full ${progressBarStyle}`}
                    style={{
                      width: `${Math.min(
                        100,
                        (progress.current / progress.total) * 100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 獎勵預覽 - 所有成就都可以看到 */}
      <div className="p-2 mt-4 rounded-md bg-surface-50">
        <div className="text-xs font-medium text-surface-600">獎勵</div>
        <div className="flex items-center mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mr-1 text-yellow-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className={isUnlocked ? "text-sm" : "text-sm text-surface-400"}>
            {achievement.reward || "+50 經驗值"}
          </span>
        </div>
      </div>
    </div>
  );
};

// 成就類別篩選元件
const CategoryFilter = ({ categories, activeCategory, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.id)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeCategory === category.id
              ? "bg-achievement-500 text-white"
              : "bg-surface-100 text-surface-700 hover:bg-surface-200"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

// 成就進度摘要
const AchievementSummary = ({ totalAchievements, unlockedCount }) => {
  const percentage = Math.round((unlockedCount / totalAchievements) * 100) || 0;

  return (
    <div className="p-6 mb-8 border rounded-xl border-achievement-200 bg-gradient-to-r from-achievement-50 to-white">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        {/* 進度統計 */}
        <div>
          <h2 className="text-xl font-bold text-surface-900">成就進度</h2>
          <p className="mt-1 text-surface-600">
            繼續努力解鎖更多成就，展示你的專業能力！
          </p>
          <div className="flex items-center mt-4">
            <span className="text-2xl font-bold text-achievement-600">
              {unlockedCount}/{totalAchievements}
            </span>
            <span className="ml-2 text-sm text-surface-500">
              已解鎖 ({percentage}%)
            </span>
          </div>
        </div>

        {/* 進度圖表 */}
        <div className="relative w-24 h-24 sm:h-32 sm:w-32">
          <svg viewBox="0 0 36 36" className="w-full h-full">
            {/* 背景圓環 */}
            <path
              className="fill-none stroke-surface-200"
              strokeWidth="3"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* 前景圓環 - 進度 */}
            <path
              className="fill-none stroke-achievement-500"
              strokeWidth="3"
              strokeDasharray={`${percentage}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              strokeLinecap="round"
            />
            {/* 中心文字 */}
            <text
              x="18"
              y="20.35"
              className="fill-surface-900 text-[9px] font-bold"
              textAnchor="middle"
            >
              {percentage}%
            </text>
          </svg>
        </div>
      </div>

      {/* 下一個成就預測 */}
      {unlockedCount < totalAchievements && (
        <div className="p-3 mt-4 bg-white bg-opacity-50 rounded-md">
          <div className="flex items-start">
            <svg
              className="mr-2 mt-0.5 h-4 w-4 text-achievement-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <p className="text-sm text-surface-700">
              <span className="font-medium">下一個可能解鎖的成就：</span>{" "}
              繼續完成任務，接近「任務大師」成就！
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// 主要成就頁面組件
const AchievementsPage = () => {
  const { profile } = useUserStore();

  // 成就分類
  const categories = [
    { id: "all", name: "全部成就" },
    { id: "unlocked", name: "已解鎖" },
    { id: "locked", name: "未解鎖" },
    { id: "tasks", name: "任務相關" },
    { id: "level", name: "等級相關" },
    { id: "collaboration", name: "協作相關" },
    { id: "special", name: "特殊成就" },
  ];

  // 活躍篩選類別
  const [activeCategory, setActiveCategory] = useState("all");

  // 模擬用戶成就數據
  const achievements = [
    {
      id: "ach-1",
      name: "初露鋒芒",
      description: "完成你的第一個任務",
      icon: "M9 12l2 2 4-4",
      category: "tasks",
      reward: "+10 經驗值",
      isUnlocked: true,
      unlockedAt: "2週前",
      progress: { current: 1, total: 1 },
    },
    {
      id: "ach-2",
      name: "效率新星",
      description: "完成10個任務",
      icon: "M5 13l4 4L19 7",
      category: "tasks",
      reward: "+30 經驗值",
      isUnlocked: true,
      unlockedAt: "4天前",
      progress: { current: 10, total: 10 },
    },
    {
      id: "ach-3",
      name: "任務大師",
      description: "完成50個任務",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      category: "tasks",
      reward: "+100 經驗值 & 特殊頭像框",
      isUnlocked: false,
      progress: {
        current: profile?.completedTasks || 12,
        total: 50,
      },
    },
    {
      id: "ach-4",
      name: "成長之路",
      description: "達到5級",
      icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
      category: "level",
      reward: "+50 經驗值",
      isUnlocked: false,
      progress: {
        current: profile?.level || 3,
        total: 5,
      },
    },
    {
      id: "ach-5",
      name: "經驗豐富",
      description: "達到10級",
      icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
      category: "level",
      reward: "+200 經驗值 & 特殊稱號",
      isUnlocked: false,
      progress: {
        current: profile?.level || 3,
        total: 10,
      },
    },
    {
      id: "ach-6",
      name: "團隊合作者",
      description: "參與5次協作任務",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656.126-1.283.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      category: "collaboration",
      reward: "+60 經驗值",
      isUnlocked: false,
      progress: { current: 2, total: 5 },
    },
    {
      id: "ach-7",
      name: "完美主義者",
      description: "連續三天每天完成至少一個任務",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      category: "special",
      reward: "+40 經驗值",
      isUnlocked: true,
      unlockedAt: "昨天",
      progress: { current: 3, total: 3 },
    },
    {
      id: "ach-8",
      name: "創意思考",
      description: "創建新專案並邀請至少2名成員參與",
      icon: "M13.5 3a1.5 1.5 0 017 0m-7 0a1.5 1.5 0 00-3 0m3 0h7.5M6 3a1.5 1.5 0 00-3 0m0 0a1.5 1.5 0 013 0m0 0h-3m10.5 0a1.5 1.5 0 013 0m0 0a1.5 1.5 0 00-3 0m3 0h-3m-9.75 9.75a1.5 1.5 0 010 3m0 0a1.5 1.5 0 010-3m0 3h10.5m-10.5-3h10.5m-10.5 3a1.5 1.5 0 010-3m0 0a1.5 1.5 0 010 3",
      category: "collaboration",
      reward: "+80 經驗值",
      isUnlocked: false,
      progress: { current: 0, total: 1 },
    },
    {
      id: "ach-9",
      name: "專業規劃",
      description: "成功完成一個至少包含10個任務的專案",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      category: "tasks",
      reward: "+120 經驗值 & 圖表生成能力",
      isUnlocked: false,
      progress: { current: 0, total: 1 },
    },
    {
      id: "ach-10",
      name: "首次轉職",
      description: "完成首次角色轉職",
      icon: "M21 3l-6 6m0 0V4m0 5h5M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z",
      category: "special",
      reward: "+150 經驗值 & 特殊能力解鎖",
      isUnlocked: false,
      progress: { current: 0, total: 1 },
    },
    {
      id: "ach-11",
      name: "及時完成",
      description: "連續5次在截止日期前至少1天完成任務",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      category: "tasks",
      reward: "+70 經驗值",
      isUnlocked: false,
      progress: { current: 3, total: 5 },
    },
    {
      id: "ach-12",
      name: "社交之星",
      description: "成功邀請3位新用戶加入平台",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
      category: "special",
      reward: "+100 經驗值 & 推薦者勳章",
      isUnlocked: false,
      progress: { current: 0, total: 3 },
    },
  ];

  // 過濾成就
  const filteredAchievements = achievements.filter((achievement) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "unlocked") return achievement.isUnlocked;
    if (activeCategory === "locked") return !achievement.isUnlocked;
    return achievement.category === activeCategory;
  });

  // 已解鎖成就計數
  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;

  return (
    <div className="space-y-6">
      <h1 className="page-title">成就系統</h1>

      {/* 成就進度摘要 */}
      <AchievementSummary
        totalAchievements={achievements.length}
        unlockedCount={unlockedCount}
      />

      {/* 成就分類篩選 */}
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onChange={setActiveCategory}
      />

      {/* 成就列表 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAchievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            isUnlocked={achievement.isUnlocked}
            progress={achievement.progress}
          />
        ))}
      </div>

      {/* 空狀態 */}
      {filteredAchievements.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <svg
            className="w-16 h-16 text-surface-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-surface-900">
            此分類下沒有成就
          </h3>
          <p className="mt-2 text-surface-500">嘗試選擇其他分類查看</p>
        </div>
      )}
    </div>
  );
};

export default AchievementsPage;
