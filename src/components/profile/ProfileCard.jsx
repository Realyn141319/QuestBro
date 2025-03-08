import React from "react";
import { Link } from "react-router-dom";
import { ROLES } from "../../store/userStore";
import { gamification } from "../../utils/constants";

const ProfileCard = ({ profile, isCurrentUser = false }) => {
  if (!profile) return null;

  // 獲取角色資訊
  const role = ROLES[profile.role?.toUpperCase()] || {
    name: "未知角色",
    description: "",
    color: "gray",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-8 3.59-8 8z",
  };

  // 計算進度百分比
  const levelProgress = gamification.calculateLevelProgress(profile.xp || 0);
  const nextLevelXp = gamification.calculateNextLevelXP(profile.level || 1);

  return (
    <div className="w-full overflow-hidden bg-white rounded-lg shadow-lg">
      {/* 頭部背景區 */}
      <div
        className={`h-32 bg-gradient-to-r from-${role.color}-500 to-${role.color}-600 relative`}
      >
        {/* 編輯按鈕（僅當前用戶可見） */}
        {isCurrentUser && (
          <Link
            to="/profile/edit"
            className="absolute p-2 transition-colors bg-white rounded-full top-4 right-4 bg-opacity-20 hover:bg-opacity-30"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </Link>
        )}
      </div>

      {/* 使用者資訊區 */}
      <div className="relative px-6 pb-6">
        {/* 頭像 */}
        <div className="absolute transform -translate-x-1/2 -top-16 left-1/2">
          <div className="w-32 h-32 p-1 bg-white rounded-full">
            <div
              className={`w-full h-full rounded-full bg-${role.color}-100 flex items-center justify-center`}
            >
              <svg
                className={`w-20 h-20 text-${role.color}-600`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d={role.icon}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 使用者名稱和角色 */}
        <div className="pt-3 mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900">{profile.name}</h3>

          <div className="flex items-center justify-center mt-1">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${role.color}-100 text-${role.color}-800`}
            >
              {role.name}
            </span>

            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              Lv. {profile.level || 1}
            </span>

            {profile.title && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                {profile.title}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-gray-500">{role.description}</p>
        </div>

        {/* 等級和經驗值 */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-1 text-sm text-gray-500">
            <span>等級 {profile.level || 1}</span>
            <span>
              {profile.xp || 0}/{nextLevelXp} XP
            </span>
          </div>
          <div className="w-full h-2 overflow-hidden bg-gray-200 rounded-full">
            <div
              className={`h-full bg-${role.color}-500 rounded-full`}
              style={{ width: `${levelProgress}%` }}
            ></div>
          </div>
          <div className="mt-1 text-xs text-right text-gray-400">
            還需 {nextLevelXp - (profile.xp || 0)} XP 升至下一級
          </div>
        </div>

        {/* 統計數據區 */}
        <div className="grid grid-cols-3 gap-3 pt-5 mt-6 border-t border-gray-100">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">
              {profile.completedTasks || 0}
            </div>
            <div className="text-xs text-gray-500">已完成任務</div>
          </div>

          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">
              {profile.achievements?.length || 0}
            </div>
            <div className="text-xs text-gray-500">解鎖成就</div>
          </div>

          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">
              {(profile.teamContributions || 0) > 1000
                ? `${Math.floor((profile.teamContributions || 0) / 1000)}K`
                : profile.teamContributions || 0}
            </div>
            <div className="text-xs text-gray-500">團隊貢獻</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
