import React, { useState, useEffect } from "react";
import useUserStore from "../../store/userStore";
import useTaskStore from "../../store/taskStore";

// 遊戲化磁貼組件
const StatCard = ({ title, value, icon, color, valueSuffix = "" }) => (
  <div className="p-4 transition-all duration-300 bg-white border shadow-sm rounded-xl hover:shadow-md border-surface-200 hover:border-primary-200">
    <div className="flex items-center">
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          color || "bg-gradient-to-r from-primary-500 to-primary-600"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={icon}
          />
        </svg>
      </div>
      <div className="ml-4">
        <h3 className="text-sm font-medium text-surface-500">{title}</h3>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-surface-900">{value}</span>
          {valueSuffix && (
            <span className="ml-1 text-sm text-surface-500">{valueSuffix}</span>
          )}
        </div>
      </div>
    </div>
  </div>
);

// 任務列表組件
const TaskList = ({ title, tasks, emptyText }) => (
  <div className="p-4 bg-white border shadow-sm rounded-xl border-surface-200">
    <h3 className="mb-4 text-lg font-semibold text-surface-700">{title}</h3>
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <div className="py-6 text-center text-surface-400">{emptyText}</div>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="p-3 transition-all duration-200 border rounded-lg cursor-pointer border-surface-200 hover:border-primary-200"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium text-surface-800">{task.title}</div>
                <div className="mt-1 text-sm text-surface-500">
                  {task.description?.substring(0, 50)}
                  {task.description?.length > 50 ? "..." : ""}
                </div>
              </div>
              <div
                className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                  task.difficulty === "easy"
                    ? "bg-green-100 text-green-800"
                    : task.difficulty === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : task.difficulty === "hard"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {task.difficulty === "easy" && "簡單"}
                {task.difficulty === "medium" && "中等"}
                {task.difficulty === "hard" && "困難"}
                {task.difficulty === "epic" && "史詩"}
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex space-x-2">
                {task.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-surface-100 text-surface-800 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-xs text-surface-400">
                {task.dueDate &&
                  `截止：${new Date(task.dueDate).toLocaleDateString()}`}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

// 活動流組件
const ActivityStream = ({ activities }) => (
  <div className="p-4 bg-white border shadow-sm rounded-xl border-surface-200">
    <h3 className="mb-4 text-lg font-semibold text-surface-700">近期活動</h3>
    {activities.length === 0 ? (
      <div className="py-6 text-center text-surface-400">暫無活動記錄</div>
    ) : (
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start">
            <div className="relative mt-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.iconBg}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={activity.icon}
                  />
                </svg>
              </div>
              {activity.id !== activities[activities.length - 1].id && (
                <div className="absolute top-8 left-4 w-0.5 h-full -mt-2 bg-surface-200"></div>
              )}
            </div>
            <div className="flex-1 min-w-0 ml-4">
              <div className="text-sm font-medium text-surface-900">
                {activity.title}
              </div>
              <div className="text-sm text-surface-500 mt-0.5">
                {activity.description}
              </div>
              <div className="mt-2 text-xs text-surface-400">
                {activity.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// 成就組件
const RecentAchievements = ({ achievements }) => (
  <div className="p-4 bg-white border shadow-sm rounded-xl border-surface-200">
    <h3 className="mb-4 text-lg font-semibold text-surface-700">最新成就</h3>
    {achievements.length === 0 ? (
      <div className="py-6 text-center text-surface-400">
        還沒有獲得任何成就
      </div>
    ) : (
      <div className="space-y-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="flex items-center p-3 transition-all duration-300 border rounded-lg border-surface-200 bg-gradient-to-r from-achievement-50 to-white hover:shadow-achievement"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-achievement-400 to-achievement-600`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={achievement.icon}
                />
              </svg>
            </div>
            <div className="ml-3">
              <div className="font-medium text-surface-800">
                {achievement.name}
              </div>
              <div className="text-xs text-surface-500">
                {achievement.description}
              </div>
            </div>
            <div className="ml-auto text-xs text-surface-400">
              {achievement.unlocked_at}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// 排行榜組件
const LeaderboardPreview = ({ users }) => (
  <div className="p-4 bg-white border shadow-sm rounded-xl border-surface-200">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-surface-700">排行榜</h3>
      <a
        href="/leaderboard"
        className="text-sm font-medium text-primary-600 hover:text-primary-800"
      >
        查看全部
      </a>
    </div>
    <div className="space-y-2">
      {users.map((user, index) => (
        <div
          key={user.id}
          className="flex items-center p-2 transition-colors duration-200 rounded-lg hover:bg-surface-50"
        >
          <div
            className={`w-7 h-7 flex items-center justify-center rounded-full ${
              index === 0
                ? "bg-yellow-100 text-yellow-600"
                : index === 1
                ? "bg-gray-100 text-gray-600"
                : index === 2
                ? "bg-yellow-100 text-yellow-800"
                : "bg-surface-100 text-surface-700"
            } font-medium text-sm`}
          >
            {index + 1}
          </div>
          <div className="flex-grow ml-3">
            <div className="text-sm font-medium text-surface-800">
              {user.name}
            </div>
            <div className="flex items-center">
              <span className="text-xs font-medium text-surface-500">
                Lv. {user.level}
              </span>
              <span
                className={`ml-2 inline-flex items-center px-1.5 py-0.5 text-xs font-medium rounded-full ${
                  user.role === "strategist"
                    ? "bg-blue-100 text-blue-800"
                    : user.role === "executor"
                    ? "bg-yellow-100 text-yellow-800"
                    : user.role === "collaborator"
                    ? "bg-green-100 text-green-800"
                    : user.role === "innovator"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {user.role === "strategist" && "戰略家"}
                {user.role === "executor" && "執行者"}
                {user.role === "collaborator" && "協作者"}
                {user.role === "innovator" && "創新者"}
                {user.role === "manager" && "管理者"}
              </span>
            </div>
          </div>
          <div className="text-sm font-semibold text-surface-700">
            {user.xp} XP
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 經驗等級進度組件
const ExpProgress = ({ profile }) => {
  const currentLevel = profile?.level || 1;
  const currentXp = profile?.xp || 0;
  const xpForNextLevel = currentLevel * 100;
  const xpInCurrentLevel = currentXp % 100;
  const progressPercent = (xpInCurrentLevel / xpForNextLevel) * 100;

  return (
    <div className="p-4 bg-white border shadow-sm rounded-xl border-surface-200">
      <h3 className="mb-4 text-lg font-semibold text-surface-700">等級進度</h3>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white rounded-full bg-gradient-to-br from-achievement-400 to-achievement-600">
          {currentLevel}
        </div>
        <div className="flex-grow ml-4">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-surface-800">{currentXp} XP</span>
            <span className="text-surface-500">
              {xpForNextLevel - xpInCurrentLevel} XP 到 Lv. {currentLevel + 1}
            </span>
          </div>
          <div className="w-full h-2 mt-2 rounded-full bg-surface-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-achievement-400 to-achievement-600"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className="mt-4 text-sm text-surface-600">
            <span className="font-medium">
              {profile?.role === "executor"
                ? "執行者"
                : profile?.role === "strategist"
                ? "戰略家"
                : profile?.role === "collaborator"
                ? "協作者"
                : profile?.role === "innovator"
                ? "創新者"
                : "管理者"}
            </span>
            <span> 角色優勢：</span>
            {profile?.role === "executor" && "獨立完成任務時，獲得額外 20% XP"}
            {profile?.role === "strategist" &&
              "指派任務時，受指派成員可獲得額外 10% XP"}
            {profile?.role === "collaborator" &&
              "與其他成員共同完成任務時，團隊整體 XP 提升 10%"}
            {profile?.role === "innovator" &&
              "提出新任務或建議時，有機率獲得特殊寶箱"}
            {profile?.role === "manager" &&
              "可查看團隊所有成員的 XP 總和，並分配獎勵"}
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const { profile } = useUserStore();
  const { tasks: allTasks, initializeTasks, columns } = useTaskStore();
  const [loading, setLoading] = useState(true);

  // 模擬數據
  const [mockData, setMockData] = useState({
    todoTasks: [],
    inProgressTasks: [],
    upcomingTasks: [],
    activities: [
      {
        id: 1,
        title: "任務完成",
        description: "你完成了任務「建立資料庫」",
        icon: "M5 13l4 4L19 7",
        iconBg: "bg-green-500",
        timestamp: "今天 14:32",
      },
      {
        id: 2,
        title: "獲得成就",
        description: "你獲得了「效率新星」成就",
        icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
        iconBg: "bg-achievement-500",
        timestamp: "昨天 18:45",
      },
      {
        id: 3,
        title: "經驗值提升",
        description: "你獲得了 30 點經驗值，當前等級：3",
        icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
        iconBg: "bg-primary-500",
        timestamp: "昨天 18:45",
      },
      {
        id: 4,
        title: "新任務",
        description: "任務「實作前端頁面」已被指派給你",
        icon: "M12 6v6m0 0v6m0-6h6m-6 0H6",
        iconBg: "bg-blue-500",
        timestamp: "2 天前",
      },
    ],
    achievements: [
      {
        id: 1,
        name: "效率新星",
        description: "完成 10 個任務",
        icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
        unlocked_at: "昨天",
      },
      {
        id: 2,
        name: "成長之路",
        description: "達到 5 級",
        icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
        unlocked_at: "3 天前",
      },
    ],
    leaderboard: [
      {
        id: "user-1",
        name: "頂尖玩家",
        role: "strategist",
        level: 10,
        xp: 1250,
      },
      {
        id: "user-2",
        name: "專業達人",
        role: "executor",
        level: 8,
        xp: 950,
      },
      {
        id: "user-3",
        name: profile?.name || "您",
        role: profile?.role || "executor",
        level: profile?.level || 3,
        xp: profile?.xp || 230,
      },
      {
        id: "user-4",
        name: "新手玩家",
        role: "collaborator",
        level: 2,
        xp: 120,
      },
    ],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        await initializeTasks();
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [initializeTasks]);

  useEffect(() => {
    if (!loading) {
      // 將狀態數據轉換為數組形式
      const tasksArray = Object.values(allTasks);
      const todoTasks =
        columns["column-1"]?.taskIds
          .map((id) => allTasks[id])
          .filter(Boolean) || [];
      const inProgressTasks =
        columns["column-2"]?.taskIds
          .map((id) => allTasks[id])
          .filter(Boolean) || [];

      // 更新模擬數據中的任務
      setMockData((prev) => ({
        ...prev,
        todoTasks,
        inProgressTasks,
        // 模擬即將到期的任務 - 在實際應用中應該根據截止日期篩選
        upcomingTasks: tasksArray
          .filter((task) => task.dueDate && new Date(task.dueDate) > new Date())
          .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
          .slice(0, 3),
      }));
    }
  }, [allTasks, columns, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="w-12 h-12 border-4 rounded-full border-primary-300 border-t-primary-600 animate-spin"></div>
      </div>
    );
  }

  const taskCount = Object.keys(allTasks).length;
  const completedTaskCount = columns["column-3"]?.taskIds.length || 0;
  const totalXp = profile?.xp || 0;

  return (
    <div className="space-y-6">
      <h1 className="page-title">我的儀表板</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="總任務數"
          value={taskCount}
          icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          color="bg-gradient-to-r from-quest-500 to-quest-600"
        />
        <StatCard
          title="已完成任務"
          value={completedTaskCount}
          icon="M5 13l4 4L19 7"
          color="bg-gradient-to-r from-green-500 to-green-600"
        />
        <StatCard
          title="當前等級"
          value={profile?.level || 1}
          icon="M13 10V3L4 14h7v7l9-11h-7z"
          color="bg-gradient-to-r from-achievement-500 to-achievement-600"
        />
        <StatCard
          title="經驗值"
          value={totalXp}
          valueSuffix="XP"
          icon="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          color="bg-gradient-to-r from-reward-500 to-reward-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ExpProgress profile={profile} />

          <div className="grid gap-6 md:grid-cols-2">
            <TaskList
              title="待處理任務"
              tasks={mockData.todoTasks}
              emptyText="目前沒有待處理任務"
            />
            <TaskList
              title="進行中任務"
              tasks={mockData.inProgressTasks}
              emptyText="目前沒有進行中任務"
            />
          </div>

          <TaskList
            title="即將到期的任務"
            tasks={mockData.upcomingTasks}
            emptyText="目前沒有即將到期的任務"
          />
        </div>

        <div className="space-y-6">
          <ActivityStream activities={mockData.activities} />
          <RecentAchievements achievements={mockData.achievements} />
          <LeaderboardPreview users={mockData.leaderboard} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
