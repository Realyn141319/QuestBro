import React, { useState } from "react";
import { Link } from "react-router-dom";
import useUserStore, { ROLES } from "../../store/userStore";

const RegisterForm = () => {
  // 表單狀態
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    role: "", // 初始沒有選擇角色
  });

  // 表單步驟
  const [formStep, setFormStep] = useState(1); // 1: 基本資訊, 2: 角色選擇

  // 錯誤訊息狀態
  const [errorMessage, setErrorMessage] = useState("");

  // 從 Zustand store 獲取註冊方法和載入狀態
  const { signUp, isLoading, error } = useUserStore();

  // 處理輸入變化
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 處理角色選擇
  const handleRoleSelect = (roleKey) => {
    setFormData((prev) => ({
      ...prev,
      role: roleKey,
    }));
  };

  // 前進到下一步
  const goToNextStep = (e) => {
    e.preventDefault();
    setErrorMessage("");

    // 基本驗證
    if (
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.name
    ) {
      setErrorMessage("請填寫所有必填欄位");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("兩次輸入的密碼不一致");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("密碼長度必須至少為 6 個字元");
      return;
    }

    // 進入下一步
    setFormStep(2);
  };

  // 返回上一步
  const goToPreviousStep = () => {
    setFormStep(1);
  };

  // 處理表單提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // 確保選擇了角色
    if (!formData.role) {
      setErrorMessage("請選擇一個角色");
      return;
    }

    // 準備使用者資料
    const userData = {
      name: formData.name,
      role: formData.role,
      level: 1,
      xp: 0,
      completedTasks: 0,
      createdAt: new Date().toISOString(),
    };

    // 呼叫註冊方法
    const { success, error } = await signUp(
      formData.email,
      formData.password,
      userData
    );

    if (!success) {
      setErrorMessage(error?.message || "註冊失敗，請稍後再試");
    }
    // 註冊成功後，使用者將被重新導向到主頁面（透過路由處理）
  };

  // 渲染第一步 - 基本資訊表單
  const renderBasicInfoForm = () => (
    <form className="space-y-6" onSubmit={goToNextStep}>
      {/* 錯誤訊息顯示 */}
      {(errorMessage || error) && (
        <div className="p-3 text-sm text-white bg-red-500 rounded-md">
          {errorMessage || error}
        </div>
      )}

      {/* 名稱輸入 */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          顯示名稱
        </label>
        <div className="mt-1">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="您的顯示名稱"
          />
        </div>
      </div>

      {/* 電子郵件輸入 */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          電子郵件
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="your@email.com"
          />
        </div>
      </div>

      {/* 密碼輸入 */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          密碼
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleChange}
            className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="至少 6 個字元"
          />
        </div>
      </div>

      {/* 確認密碼輸入 */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          確認密碼
        </label>
        <div className="mt-1">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="再次輸入密碼"
          />
        </div>
      </div>

      {/* 下一步按鈕 */}
      <div>
        <button
          type="submit"
          className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          下一步：選擇角色
        </button>
      </div>

      {/* 登入連結 */}
      <div className="text-sm text-center">
        已經有帳號？{" "}
        <Link
          to="/login"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          登入
        </Link>
      </div>
    </form>
  );

  // 渲染第二步 - 角色選擇表單
  const renderRoleSelectionForm = () => (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* 錯誤訊息顯示 */}
      {(errorMessage || error) && (
        <div className="p-3 text-sm text-white bg-red-500 rounded-md">
          {errorMessage || error}
        </div>
      )}

      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900">選擇您的角色</h3>
        <p className="mt-1 text-sm text-gray-500">
          每個角色都有獨特的能力和優勢，請選擇一個最適合您的角色
        </p>
      </div>

      {/* 角色選擇網格 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Object.values(ROLES).map((role) => (
          <div
            key={role.key}
            className={`relative flex flex-col p-4 border rounded-lg cursor-pointer hover:border-indigo-500 ${
              formData.role === role.key
                ? "border-indigo-500 ring-2 ring-indigo-500"
                : "border-gray-300"
            }`}
            onClick={() => handleRoleSelect(role.key)}
          >
            <div className="flex items-center mb-3">
              <div className={`p-2 rounded-md bg-${role.color}-100`}>
                <svg
                  className={`w-6 h-6 text-${role.color}-600`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={role.icon}
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900">
                  {role.name}
                </h4>
              </div>
            </div>
            <p className="text-sm text-gray-500">{role.description}</p>
            <div className="mt-2">
              <span className="inline-block px-2 py-1 text-xs text-indigo-800 bg-indigo-100 rounded-full">
                {role.ability}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 提交和返回按鈕 */}
      <div className="flex space-x-3">
        <button
          type="button"
          onClick={goToPreviousStep}
          className="flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          上一步
        </button>
        <button
          type="submit"
          disabled={isLoading || !formData.role}
          className={`flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isLoading || !formData.role ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "註冊中..." : "完成註冊"}
        </button>
      </div>
    </form>
  );

  return (
    <div>
      {formStep === 1 ? renderBasicInfoForm() : renderRoleSelectionForm()}
    </div>
  );
};

export default RegisterForm;
