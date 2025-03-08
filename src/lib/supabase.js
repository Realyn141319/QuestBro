import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 初始化 Supabase 客戶端
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 身份驗證相關函數
export const auth = {
  signUp: async (email, password, userData) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });
    return { data, error };
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    return { user: data?.user, error };
  },
};

// 數據操作相關函數
export const api = {
  // 使用者相關
  getProfile: async (userId) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();
    return { data, error };
  },

  updateProfile: async (userId, updates) => {
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", userId);
    return { data, error };
  },

  // 任務相關
  getTasks: async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });
    return { data, error };
  },

  createTask: async (taskData) => {
    const { data, error } = await supabase
      .from("tasks")
      .insert([taskData])
      .select();
    return { data, error };
  },

  updateTask: async (taskId, updates) => {
    const { data, error } = await supabase
      .from("tasks")
      .update(updates)
      .eq("id", taskId)
      .select();
    return { data, error };
  },

  deleteTask: async (taskId) => {
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);
    return { error };
  },

  // 成就相關
  getAchievements: async (userId) => {
    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .eq("user_id", userId);
    return { data, error };
  },

  unlockAchievement: async (userId, achievementType) => {
    const { data, error } = await supabase.from("achievements").insert([
      {
        user_id: userId,
        type: achievementType,
      },
    ]);
    return { data, error };
  },

  // 排行榜
  getLeaderboard: async () => {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, role, level, xp")
      .order("xp", { ascending: false })
      .limit(50);
    return { data, error };
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
