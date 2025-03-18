import React, { useState } from "react";
import useUserStore from "../../store/userStore";

// 設置選項類別
const CATEGORIES = [
  {
    id: "profile",
    label: "個人資料",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: "notifications",
    label: "通知設置",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    id: "privacy",
    label: "隱私設置",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: "appearance",
    label: "外觀設置",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: "connections",
    label: "連結管理",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: "subscription",
    label: "訂閱方案",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
        <path
          fillRule="evenodd"
          d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

// 側邊導航項目
const NavItem = ({ category, isActive, onClick }) => (
  <li>
    <button
      onClick={() => onClick(category.id)}
      className={`flex items-center w-full px-4 py-3 rounded-lg ${
        isActive
          ? "bg-primary-100 text-primary-600"
          : "text-surface-600 hover:bg-surface-100"
      }`}
    >
      <span className="flex-shrink-0 mr-3">{category.icon}</span>
      <span className="text-sm font-medium">{category.label}</span>
    </button>
  </li>
);

// 個人資料設置內容
const ProfileSettings = () => {
  const { user } = useUserStore();
  const [formState, setFormState] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 在實際應用中這裡會更新用戶資料
    alert("個人資料已更新");
  };

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold text-surface-900">
        個人資料設置
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label className="block mb-2 text-sm font-medium text-surface-700">
            頭像
          </label>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-20 h-20 mr-4 text-2xl font-bold rounded-full bg-primary-100 text-primary-600">
              {formState.name.charAt(0) || "U"}
            </div>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium rounded-md text-primary-600 bg-primary-50 hover:bg-primary-100"
            >
              更換頭像
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-surface-700"
          >
            顯示名稱
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-surface-700"
          >
            電子郵件
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-surface-700"
          >
            更改密碼
          </label>
          <button
            type="button"
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            點擊更改密碼
          </button>
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white rounded-md bg-primary-600 hover:bg-primary-700"
        >
          儲存變更
        </button>
      </form>
    </div>
  );
};

// 通知設置內容
const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    teamUpdates: true,
    achievementAlerts: true,
  });

  const handleToggle = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  const ToggleSwitch = ({ label, isChecked, onChange }) => (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-surface-700">{label}</span>
      <button
        type="button"
        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
          isChecked ? "bg-primary-600" : "bg-surface-200"
        }`}
        onClick={onChange}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
            isChecked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold text-surface-900">通知設置</h2>

      <div className="pb-4 mb-4 space-y-1 border-b border-surface-100">
        <h3 className="mb-2 font-medium text-md text-surface-800">通知管道</h3>
        <ToggleSwitch
          label="電子郵件通知"
          isChecked={settings.emailNotifications}
          onChange={() => handleToggle("emailNotifications")}
        />
        <ToggleSwitch
          label="推送通知"
          isChecked={settings.pushNotifications}
          onChange={() => handleToggle("pushNotifications")}
        />
      </div>

      <div className="space-y-1">
        <h3 className="mb-2 font-medium text-md text-surface-800">通知類型</h3>
        <ToggleSwitch
          label="任務提醒"
          isChecked={settings.taskReminders}
          onChange={() => handleToggle("taskReminders")}
        />
        <ToggleSwitch
          label="團隊更新"
          isChecked={settings.teamUpdates}
          onChange={() => handleToggle("teamUpdates")}
        />
        <ToggleSwitch
          label="成就解鎖提醒"
          isChecked={settings.achievementAlerts}
          onChange={() => handleToggle("achievementAlerts")}
        />
      </div>

      <button
        className="px-4 py-2 mt-6 text-sm font-medium text-white rounded-md bg-primary-600 hover:bg-primary-700"
        onClick={() => alert("通知設置已更新")}
      >
        儲存設置
      </button>
    </div>
  );
};

// 簡易的空白設置頁面
const EmptySettingsPage = ({ category }) => (
  <div className="py-10 text-center">
    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 text-primary-600">
      {CATEGORIES.find((c) => c.id === category)?.icon}
    </div>
    <h2 className="mb-2 text-xl font-semibold text-surface-900">
      {CATEGORIES.find((c) => c.id === category)?.label}
    </h2>
    <p className="max-w-sm mx-auto text-surface-600">
      這個功能正在開發中，很快就會推出。敬請期待！
    </p>
  </div>
);

// 主設置頁面組件
const SettingsPage = () => {
  const [activeCategory, setActiveCategory] = useState("profile");

  // 渲染設置內容
  const renderSettingsContent = () => {
    switch (activeCategory) {
      case "profile":
        return <ProfileSettings />;
      case "notifications":
        return <NotificationSettings />;
      default:
        return <EmptySettingsPage category={activeCategory} />;
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-2xl font-bold text-surface-900">帳號設置</h1>

      <div className="overflow-hidden bg-white shadow-sm rounded-xl">
        <div className="flex flex-col md:flex-row">
          {/* 側邊導航 */}
          <div className="w-full border-r md:w-64 border-surface-100">
            <ul className="py-4 space-y-1">
              {CATEGORIES.map((category) => (
                <NavItem
                  key={category.id}
                  category={category}
                  isActive={activeCategory === category.id}
                  onClick={setActiveCategory}
                />
              ))}
            </ul>
          </div>

          {/* 主內容區 */}
          <div className="flex-1 p-6">{renderSettingsContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
