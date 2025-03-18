import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://example.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "dummy-key";

// 初始化 Supabase 客戶端
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 模擬用戶數據 - 用於離線模式
const MOCK_USER = {
  id: "demo-user-123456",
  email: "demo@questbro.com",
  user_metadata: {
    name: "測試帳號",
  },
};

// 模擬用戶檔案數據
const MOCK_PROFILE = {
  id: "demo-user-123456",
  name: "測試帳號",
  role: "executor",
  level: 3,
  xp: 230,
  completedTasks: 12,
  createdAt: new Date().toISOString(),
};

// 模擬任務數據
const MOCK_TASKS = [
  {
    id: "task-1",
    title: "建立網站設計稿",
    description: "使用 Figma 設計網站原型",
    status: "todo",
    points: 30,
    tags: ["設計", "前端"],
    assignee: "demo-user-123456",
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "中等",
  },
  {
    id: "task-2",
    title: "建立資料庫",
    description: "設計資料庫結構並實作",
    status: "in_progress",
    points: 30,
    tags: ["開發", "後端", "資料庫"],
    assignee: "demo-user-123456",
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "中等",
  },
  {
    id: "task-3",
    title: "進行單元測試",
    description: "為關鍵功能編寫測試",
    status: "done",
    points: 30,
    tags: ["測試", "品質"],
    assignee: "demo-user-123456",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "中等",
  },
  {
    id: "task-4",
    title: "實作前端頁面",
    description: "使用 React 和 Tailwind CSS",
    status: "todo",
    points: 50,
    tags: ["前端"],
    assignee: "demo-user-123456",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "困難",
  },
  {
    id: "task-5",
    title: "實作後端 API",
    description: "使用 Node.js 和 Express",
    status: "in_progress",
    points: 50,
    tags: ["開發", "後端"],
    assignee: "demo-user-123456",
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "困難",
  },
  {
    id: "task-6",
    title: "部署應用程式",
    description: "設定 CI/CD 流程",
    status: "done",
    points: 100,
    tags: ["部署", "DevOps"],
    assignee: "demo-user-123456",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "困難",
  },
];

// 模擬成就數據
const MOCK_ACHIEVEMENTS = [
  {
    id: "ach-1",
    user_id: "demo-user-123456",
    type: "task_complete_10",
    unlocked_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ach-2",
    user_id: "demo-user-123456",
    type: "level_5",
    unlocked_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// 身份驗證相關函數 - 離線模式優先
export const auth = {
  signUp: async (email, password, userData) => {
    console.log("模擬註冊用戶", email);
    // 一律返回成功，模擬註冊
    return {
      data: {
        user: MOCK_USER,
      },
      error: null,
    };
  },

  signIn: async (email, password) => {
    console.log("模擬登入用戶", email);
    // 一律返回成功，模擬登入
    return {
      data: {
        user: MOCK_USER,
      },
      error: null,
    };
  },

  signOut: async () => {
    console.log("模擬登出用戶");
    return { error: null };
  },

  getUser: async () => {
    console.log("獲取當前用戶（模擬）");
    // 一律返回已登入狀態
    return {
      user: MOCK_USER,
      error: null,
    };
  },
};

// 數據操作相關函數 - 離線模式
export const api = {
  // 使用者相關
  getProfile: async (userId) => {
    console.log("獲取使用者資料（模擬）", userId);
    // 永遠返回模擬資料
    return { data: MOCK_PROFILE, error: null };
  },

  updateProfile: async (userId, updates) => {
    console.log("更新使用者資料（模擬）", updates);
    // 模擬更新成功
    return {
      data: { ...MOCK_PROFILE, ...updates },
      error: null,
    };
  },

  // 任務相關
  getTasks: async () => {
    console.log("獲取所有任務（模擬）");
    // 返回模擬任務數據
    return { data: MOCK_TASKS, error: null };
  },

  createTask: async (taskData) => {
    console.log("創建新任務（模擬）", taskData);
    const newTask = {
      id: `task-${Date.now()}`,
      ...taskData,
      created_at: new Date().toISOString(),
    };
    // 模擬創建成功
    return { data: [newTask], error: null };
  },

  updateTask: async (taskId, updates) => {
    console.log("更新任務（模擬）", taskId, updates);
    // 找到對應任務
    const taskIndex = MOCK_TASKS.findIndex((task) => task.id === taskId);
    let updatedTask = { ...MOCK_TASKS[taskIndex], ...updates };

    // 模擬更新成功
    return { data: [updatedTask], error: null };
  },

  deleteTask: async (taskId) => {
    console.log("刪除任務（模擬）", taskId);
    // 模擬刪除成功
    return { error: null };
  },

  // 成就相關
  getAchievements: async (userId) => {
    console.log("獲取成就（模擬）", userId);
    // 返回模擬成就數據
    return { data: MOCK_ACHIEVEMENTS, error: null };
  },

  unlockAchievement: async (userId, achievementType) => {
    console.log("解鎖成就（模擬）", achievementType);
    const newAchievement = {
      id: `ach-${Date.now()}`,
      user_id: userId,
      type: achievementType,
      unlocked_at: new Date().toISOString(),
    };
    // 模擬解鎖成功
    return { data: [newAchievement], error: null };
  },

  // 排行榜
  getLeaderboard: async () => {
    console.log("獲取排行榜（模擬）");
    // 模擬排行榜數據
    const leaderboard = [
      {
        id: "user-1",
        name: "頂尖玩家",
        role: "strategist",
        level: 10,
        xp: 1250,
      },
      { id: "user-2", name: "專業達人", role: "executor", level: 8, xp: 950 },
      {
        id: MOCK_USER.id,
        name: MOCK_USER.user_metadata.name,
        role: MOCK_PROFILE.role,
        level: MOCK_PROFILE.level,
        xp: MOCK_PROFILE.xp,
      },
      {
        id: "user-3",
        name: "新手玩家",
        role: "collaborator",
        level: 2,
        xp: 120,
      },
    ];
    return { data: leaderboard, error: null };
  },
};

// 訂閱即時更新
export const subscribeToTasks = (callback) => {
  return supabase
    .channel("task-changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "tasks" },
      (payload) => callback(payload)
    )
    .subscribe();
};
