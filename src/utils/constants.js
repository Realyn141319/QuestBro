// 難度定義
export const DIFFICULTIES = {
  EASY: {
    key: "easy",
    label: "簡單",
    color: "green",
    xpReward: 10,
  },
  MEDIUM: {
    key: "medium",
    label: "中等",
    color: "yellow",
    xpReward: 30,
  },
  HARD: {
    key: "hard",
    label: "困難",
    color: "orange",
    xpReward: 50,
  },
  EPIC: {
    key: "epic",
    label: "史詩",
    color: "red",
    xpReward: 100,
  },
};

// 欄位定義
export const COLUMNS = {
  TODO: {
    id: "column-1",
    key: "todo",
    title: "待處理",
    bgGradient: "from-blue-500/10 to-blue-600/10",
    iconPath:
      "M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z",
    emptyMessage: "目前沒有待處理任務",
  },
  IN_PROGRESS: {
    id: "column-2",
    key: "in_progress",
    title: "進行中",
    bgGradient: "from-yellow-500/10 to-yellow-600/10",
    iconPath:
      "M10 2a2 2 0 00-2 2v4a2 2 0 104 0V4a2 2 0 00-2-2zm7 11a2 2 0 11-4 0 2 2 0 014 0zm-10 0a2 2 0 11-4 0 2 2 0 014 0z M10 14a2 2 0 104 0 2 2 0 00-4 0z",
    emptyMessage: "目前沒有進行中任務",
  },
  COMPLETED: {
    id: "column-3",
    key: "completed",
    title: "已完成",
    bgGradient: "from-green-500/10 to-green-600/10",
    iconPath:
      "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
    emptyMessage: "目前沒有已完成任務",
  },
};

// 任務標籤分類
export const TAG_CATEGORIES = {
  DEVELOPMENT: {
    key: "development",
    label: "開發",
    color: "blue",
    tags: ["前端", "後端", "資料庫", "API", "測試", "部署"],
  },
  DESIGN: {
    key: "design",
    label: "設計",
    color: "purple",
    tags: ["UI", "UX", "圖形", "動畫", "原型"],
  },
  MANAGEMENT: {
    key: "management",
    label: "管理",
    color: "orange",
    tags: ["規劃", "協調", "溝通", "監控", "決策"],
  },
  CONTENT: {
    key: "content",
    label: "內容",
    color: "green",
    tags: ["文案", "影片", "圖片", "資料", "翻譯"],
  },
};

// 遊戲效果與通知
export const GAME_EFFECTS = {
  LEVEL_UP: {
    title: "等級提升！",
    message: (level) => `你現在已經達到等級 ${level}`,
    duration: 5000,
    effect: "confetti",
  },
  ACHIEVEMENT: {
    title: "成就解鎖！",
    message: (achievement) => `你解鎖了「${achievement}」成就`,
    duration: 5000,
    effect: "achievement",
  },
  TASK_COMPLETE: {
    title: "任務完成！",
    message: (xp, points) => `獲得 ${xp} XP 和 ${points} 點數`,
    duration: 3000,
    effect: "bounce",
  },
  TREASURE: {
    title: "獲得寶箱！",
    message: "點擊開啟寶箱，獲取隨機獎勵",
    duration: 8000,
    effect: "shine",
  },
  ROLE_BONUS: {
    title: "角色加成！",
    message: (bonus, role) => `因為你是${role}，獲得 ${bonus} 額外獎勵`,
    duration: 3000,
    effect: "pulse",
  },
};

// 格式化工具
export const formatters = {
  // 格式化日期
  formatDate: (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return new Intl.DateTimeFormat("zh-TW", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  },

  // 格式化時間
  formatTime: (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return new Intl.DateTimeFormat("zh-TW", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  },

  // 格式化經驗值顯示
  formatXP: (xp) => {
    return `${xp.toLocaleString()} XP`;
  },

  // 格式化難度顯示
  formatDifficulty: (difficulty) => {
    const difficultyObject = Object.values(DIFFICULTIES).find(
      (d) => d.key === difficulty
    );
    return difficultyObject ? difficultyObject.label : "未知";
  },

  // 縮短長文字
  truncateText: (text, length = 50) => {
    if (!text) return "";
    if (text.length <= length) return text;
    return text.substring(0, length) + "...";
  },
};

// 遊戲化功能
export const gamification = {
  // 計算下一級所需經驗值
  calculateNextLevelXP: (level) => {
    return level * 100;
  },

  // 計算總經驗值到等級
  calculateLevelFromXP: (xp) => {
    return Math.floor(xp / 100) + 1;
  },

  // 計算經驗值進度百分比
  calculateLevelProgress: (xp) => {
    const level = Math.floor(xp / 100) + 1;
    const currentLevelStartXP = (level - 1) * 100;
    const nextLevelStartXP = level * 100;
    const progress =
      ((xp - currentLevelStartXP) / (nextLevelStartXP - currentLevelStartXP)) *
      100;
    return Math.min(100, Math.max(0, progress));
  },

  // 隨機生成寶箱獎勵
  generateRandomReward: () => {
    const rewardTypes = [
      { type: "xp_boost", chance: 0.5, value: 50 },
      { type: "special_title", chance: 0.3, value: "稀有稱號" },
      { type: "avatar_frame", chance: 0.2, value: "稀有頭像框" },
    ];

    const random = Math.random();
    let cumulativeChance = 0;

    for (const reward of rewardTypes) {
      cumulativeChance += reward.chance;
      if (random <= cumulativeChance) {
        return {
          type: reward.type,
          value: reward.value,
        };
      }
    }

    // 預設獎勵
    return {
      type: "xp_boost",
      value: 10,
    };
  },
};
