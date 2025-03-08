import { create } from "zustand";
import { auth, api } from "../lib/supabase";

// 角色相關資料
export const ROLES = {
  STRATEGIST: {
    key: "strategist",
    name: "戰略家",
    description: "規劃型角色，擅長制定專案策略與資源分配",
    ability: "指派任務時，受指派成員可獲得額外 10% XP",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    color: "blue",
  },
  EXECUTOR: {
    key: "executor",
    name: "執行者",
    description: "行動型角色，擅長快速完成任務",
    ability: "獨立完成任務時，可獲得額外 20% XP",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    color: "yellow",
  },
  COLLABORATOR: {
    key: "collaborator",
    name: "協作者",
    description: "團隊型角色，擅長團隊溝通與合作",
    ability: "與其他成員共同完成任務時，團隊整體 XP 提升 10%",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    color: "green",
  },
  INNOVATOR: {
    key: "innovator",
    name: "創新者",
    description: "創意型角色，提供解決方案與改善專案流程",
    ability: "提出新任務或建議時，有機率獲得特殊寶箱（內含隨機獎勵）",
    icon: "M13 6V4h1a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h1v2H6v14h8V6h-1z M9 4v2m0 0h2m-2 0V3a1 1 0 112 0v3m-2 0h2",
    color: "purple",
  },
  MANAGER: {
    key: "manager",
    name: "管理者",
    description: "控制型角色，監督專案進度與成員表現",
    ability: "可查看團隊所有成員的 XP 總和，並分配獎勵",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    color: "red",
  },
};

// 成就類型
export const ACHIEVEMENT_TYPES = {
  TASK_COMPLETE_10: {
    key: "task_complete_10",
    name: "效率新星",
    description: "完成10個任務",
    icon: "star",
  },
  TASK_COMPLETE_50: {
    key: "task_complete_50",
    name: "任務大師",
    description: "完成50個任務",
    icon: "award",
  },
  LEVEL_5: {
    key: "level_5",
    name: "成長之路",
    description: "達到5級",
    icon: "trending-up",
  },
  LEVEL_10: {
    key: "level_10",
    name: "經驗豐富",
    description: "達到10級",
    icon: "award",
  },
  COLLABORATION_5: {
    key: "collaboration_5",
    name: "團隊合作者",
    description: "參與5次協作任務",
    icon: "users",
  },
};

// 寶箱與獎勵
export const REWARDS = {
  XP_BOOST: {
    key: "xp_boost",
    name: "經驗加成",
    description: "下一個任務獲得雙倍經驗",
    rarity: "common",
  },
  SPECIAL_TITLE: {
    key: "special_title",
    name: "特殊稱號",
    description: "獲得一個限時特殊稱號",
    rarity: "rare",
  },
  AVATAR_FRAME: {
    key: "avatar_frame",
    name: "頭像框",
    description: "獲得一個特殊的頭像裝飾框",
    rarity: "epic",
  },
};

// 使用者狀態管理
const useUserStore = create((set, get) => ({
  // 使用者資訊
  user: null,
  profile: null,
  isLoading: false,
  error: null,

  // 初始化 - 檢查當前登入狀態
  initialize: async () => {
    set({ isLoading: true });
    try {
      const { user, error } = await auth.getUser();

      if (user) {
        set({ user });
        await get().fetchProfile(user.id);
      } else {
        set({ user: null, profile: null });
      }

      if (error) {
        set({ error: error.message });
      }
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // 註冊新使用者
  signUp: async (email, password, userData) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await auth.signUp(email, password, userData);

      if (error) {
        set({ error: error.message });
        return { success: false, error };
      }

      // 註冊成功後，直接初始化使用者資料
      await get().initialize();
      return { success: true, data };
    } catch (err) {
      set({ error: err.message });
      return { success: false, error: err };
    } finally {
      set({ isLoading: false });
    }
  },

  // 登入
  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await auth.signIn(email, password);

      if (error) {
        set({ error: error.message });
        return { success: false, error };
      }

      set({ user: data.user });
      await get().fetchProfile(data.user.id);
      return { success: true, data };
    } catch (err) {
      set({ error: err.message });
      return { success: false, error: err };
    } finally {
      set({ isLoading: false });
    }
  },

  // 登出
  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await auth.signOut();

      if (error) {
        set({ error: error.message });
        return { success: false, error };
      }

      set({ user: null, profile: null });
      return { success: true };
    } catch (err) {
      set({ error: err.message });
      return { success: false, error: err };
    } finally {
      set({ isLoading: false });
    }
  },

  // 獲取使用者資料
  fetchProfile: async (userId) => {
    if (!userId) return;

    set({ isLoading: true });
    try {
      const { data, error } = await api.getProfile(userId);

      if (error) {
        set({ error: error.message });
        return;
      }

      set({ profile: data });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // 更新使用者資料
  updateProfile: async (updates) => {
    const userId = get().user?.id;
    if (!userId) return { success: false, error: "使用者未登入" };

    set({ isLoading: true, error: null });
    try {
      const { data, error } = await api.updateProfile(userId, updates);

      if (error) {
        set({ error: error.message });
        return { success: false, error };
      }

      // 更新本地狀態
      set({ profile: { ...get().profile, ...updates } });
      return { success: true, data };
    } catch (err) {
      set({ error: err.message });
      return { success: false, error: err };
    } finally {
      set({ isLoading: false });
    }
  },

  // 獲取成就
  fetchAchievements: async () => {
    const userId = get().user?.id;
    if (!userId) return;

    set({ isLoading: true });
    try {
      const { data, error } = await api.getAchievements(userId);

      if (error) {
        set({ error: error.message });
        return;
      }

      // 更新成就到使用者資料中
      set((state) => ({
        profile: {
          ...state.profile,
          achievements: data,
        },
      }));
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // 增加經驗值和檢查升級
  addExperience: async (xp) => {
    const currentProfile = get().profile;
    if (!currentProfile) return;

    const currentXp = currentProfile.xp || 0;
    const currentLevel = currentProfile.level || 1;

    // 計算新的總經驗值
    const newTotalXp = currentXp + xp;

    // 計算新等級 (每100經驗值升一級)
    const xpPerLevel = 100;
    const newLevel = Math.floor(newTotalXp / xpPerLevel) + 1;

    // 如果升級了，顯示升級信息
    const didLevelUp = newLevel > currentLevel;

    // 更新資料庫
    await get().updateProfile({
      xp: newTotalXp,
      level: newLevel,
    });

    // 檢查是否達成等級相關成就
    if (
      newLevel >= 5 &&
      !currentProfile.achievements?.some(
        (a) => a.type === ACHIEVEMENT_TYPES.LEVEL_5.key
      )
    ) {
      await api.unlockAchievement(
        currentProfile.id,
        ACHIEVEMENT_TYPES.LEVEL_5.key
      );
      await get().fetchAchievements();
    }

    if (
      newLevel >= 10 &&
      !currentProfile.achievements?.some(
        (a) => a.type === ACHIEVEMENT_TYPES.LEVEL_10.key
      )
    ) {
      await api.unlockAchievement(
        currentProfile.id,
        ACHIEVEMENT_TYPES.LEVEL_10.key
      );
      await get().fetchAchievements();
    }

    return { newLevel, newTotalXp, didLevelUp };
  },

  // 檢查角色特殊能力
  applyRoleBonus: (baseXp, taskContext) => {
    const profile = get().profile;
    if (!profile) return baseXp;

    const role = profile.role;
    let bonusXp = baseXp;

    // 根據角色和任務情境計算獎勵
    switch (role) {
      case ROLES.STRATEGIST.key:
        // 戰略家：指派任務時，受指派成員獲得額外 10% XP
        if (taskContext.isAssignedByStrategist) {
          bonusXp *= 1.1;
        }
        break;

      case ROLES.EXECUTOR.key:
        // 執行者：獨立完成任務時，獲得額外 20% XP
        if (taskContext.isCompletedIndividually) {
          bonusXp *= 1.2;
        }
        break;

      case ROLES.COLLABORATOR.key:
        // 協作者：與其他成員共同完成任務時，團隊整體 XP 提升 10%
        if (taskContext.isCollaborative) {
          bonusXp *= 1.1;
        }
        break;

      case ROLES.INNOVATOR.key:
        // 創新者：提出新任務或建議時，有機率獲得特殊寶箱
        // 此邏輯在任務創建時處理
        break;

      case ROLES.MANAGER.key:
        // 管理者：可查看團隊所有成員的 XP 總和，並分配獎勵
        // 此功能在專門的組件中實現
        break;
    }

    return Math.round(bonusXp);
  },
}));

export default useUserStore;
