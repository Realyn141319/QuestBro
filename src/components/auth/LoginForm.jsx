import React, { useState } from "react";
import { Link } from "react-router-dom";
import useUserStore from "../../store/userStore";

const LoginForm = () => {
  // 表單狀態
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 錯誤訊息狀態
  const [errorMessage, setErrorMessage] = useState("");

  // 從 Zustand store 獲取登入方法和加載狀態
  const { signIn, isLoading, error } = useUserStore();

  // 處理輸入變化
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 處理表單提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // 基本驗證
    if (!formData.email || !formData.password) {
      setErrorMessage("請填寫所有必填欄位");
      return;
    }

    // 呼叫登入方法
    const { success, error } = await signIn(formData.email, formData.password);

    if (!success) {
      setErrorMessage(error?.message || "登入失敗，請檢查您的帳號和密碼");
    }
    // 登入成功後，用戶將被重定向到主頁面（通過路由處理）
  };

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* 錯誤訊息顯示 */}
        {(errorMessage || error) && (
          <div className="p-3 text-sm text-white bg-red-500 rounded-md">
            {errorMessage || error}
          </div>
        )}

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
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="您的密碼"
            />
          </div>
        </div>

        {/* 記住我和忘記密碼 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="remember-me"
              className="block ml-2 text-sm text-gray-700"
            >
              記住我
            </label>
          </div>

          <div className="text-sm">
            <Link
              to="/reset-password"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              忘記密碼？
            </Link>
          </div>
        </div>

        {/* 登入按鈕 */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "登入中..." : "登入"}
          </button>
        </div>
      </form>

      {/* 註冊連結 */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white">或</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            註冊新帳號
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
