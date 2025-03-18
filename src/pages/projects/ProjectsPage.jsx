import React, { useState } from "react";
import useUserStore from "../../store/userStore";

// 項目卡片組件
const ProjectCard = ({ project, onClick }) => {
  const statusColors = {
    planning: "bg-blue-100 text-blue-800",
    active: "bg-green-100 text-green-800",
    completed: "bg-purple-100 text-purple-800",
    paused: "bg-yellow-100 text-yellow-800",
  };

  const statusText = {
    planning: "規劃中",
    active: "進行中",
    completed: "已完成",
    paused: "暫停",
  };

  return (
    <div
      onClick={onClick}
      className="overflow-hidden transition-all duration-300 bg-white border shadow-sm cursor-pointer rounded-xl border-surface-200 hover:shadow-md hover:border-primary-200"
    >
      {/* 項目頭部 */}
      <div className="relative overflow-hidden h-28">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url(${
              project.coverImage ||
              "https://source.unsplash.com/featured/?" + project.name
            })`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white truncate">
              {project.name}
            </h3>
            <span
              className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                statusColors[project.status]
              }`}
            >
              {statusText[project.status]}
            </span>
          </div>
        </div>
      </div>

      {/* 項目內容 */}
      <div className="p-4">
        <p className="h-10 mb-4 text-sm text-surface-600 line-clamp-2">
          {project.description}
        </p>

        {/* 項目統計 */}
        <div className="flex justify-between mb-4 text-xs text-surface-500">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-1 text-surface-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            {project.taskCount} 個任務
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-1 text-surface-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {project.dueDate
              ? new Date(project.dueDate).toLocaleDateString()
              : "無截止日期"}
          </div>
        </div>

        {/* 進度條 */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1 text-xs">
            <span className="font-medium text-surface-600">完成進度</span>
            <span className="text-surface-500">{project.progress}%</span>
          </div>
          <div className="w-full bg-surface-100 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-600"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        {/* 團隊成員 */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex -space-x-2">
            {project.team?.slice(0, 3).map((member, index) => (
              <div
                key={index}
                className="flex items-center justify-center overflow-hidden text-xs font-medium border-2 border-white rounded-full w-7 h-7 bg-surface-200 text-surface-600"
                title={member.name}
              >
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  member.name?.charAt(0).toUpperCase()
                )}
              </div>
            ))}
            {project.team?.length > 3 && (
              <div className="flex items-center justify-center text-xs font-medium border-2 border-white rounded-full w-7 h-7 bg-surface-100 text-surface-600">
                +{project.team.length - 3}
              </div>
            )}
          </div>
          <span className="text-xs text-surface-500">
            {project.projectType === "sprint" && "Sprint 式"}
            {project.projectType === "kanban" && "看板式"}
            {project.projectType === "scrumban" && "Scrumban 式"}
          </span>
        </div>
      </div>
    </div>
  );
};

// 過濾器與搜尋組件
const ProjectFilter = ({ filters, setFilters }) => (
  <div className="p-4 mb-6 bg-white border shadow-sm rounded-xl border-surface-200">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {/* 搜尋 */}
      <div className="lg:col-span-2">
        <label htmlFor="search" className="sr-only">
          搜尋專案
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-surface-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="search"
            name="search"
            value={filters.searchQuery}
            onChange={(e) =>
              setFilters({ ...filters, searchQuery: e.target.value })
            }
            className="block w-full py-2 pl-10 pr-3 text-sm border rounded-md border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="搜尋專案..."
          />
        </div>
      </div>

      {/* 狀態過濾器 */}
      <div>
        <label htmlFor="status" className="sr-only">
          專案狀態
        </label>
        <select
          id="status"
          name="status"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="block w-full py-2 pl-3 pr-10 text-sm border rounded-md border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="all">所有狀態</option>
          <option value="planning">規劃中</option>
          <option value="active">進行中</option>
          <option value="completed">已完成</option>
          <option value="paused">暫停</option>
        </select>
      </div>

      {/* 專案類型過濾器 */}
      <div>
        <label htmlFor="type" className="sr-only">
          專案類型
        </label>
        <select
          id="type"
          name="type"
          value={filters.projectType}
          onChange={(e) =>
            setFilters({ ...filters, projectType: e.target.value })
          }
          className="block w-full py-2 pl-3 pr-10 text-sm border rounded-md border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="all">所有類型</option>
          <option value="sprint">Sprint 式</option>
          <option value="kanban">看板式</option>
          <option value="scrumban">Scrumban 式</option>
        </select>
      </div>

      {/* 排序過濾器 */}
      <div>
        <label htmlFor="sort" className="sr-only">
          排序
        </label>
        <select
          id="sort"
          name="sort"
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          className="block w-full py-2 pl-3 pr-10 text-sm border rounded-md border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="created-desc">最新建立</option>
          <option value="created-asc">最早建立</option>
          <option value="due-asc">最早截止</option>
          <option value="due-desc">最晚截止</option>
          <option value="progress-asc">進度：低至高</option>
          <option value="progress-desc">進度：高至低</option>
        </select>
      </div>
    </div>
  </div>
);

// 新增專案按鈕
const NewProjectButton = ({ onClick }) => (
  <div
    onClick={onClick}
    className="bg-surface-50 border-2 border-dashed border-surface-300 rounded-xl flex flex-col items-center justify-center p-8 cursor-pointer hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 h-full min-h-[280px]"
  >
    <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-primary-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </div>
    <h3 className="mb-2 text-lg font-medium text-surface-900">新增專案</h3>
    <p className="max-w-xs text-sm text-center text-surface-500">
      建立一個新的專案來組織你的任務、Sprint 和團隊協作
    </p>
  </div>
);

// 主要頁面組件
const ProjectsPage = () => {
  const { profile } = useUserStore();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [filters, setFilters] = useState({
    searchQuery: "",
    status: "all",
    projectType: "all",
    sortBy: "created-desc",
  });

  // 模擬專案數據
  const [projects, setProjects] = useState([
    {
      id: "proj-1",
      name: "網站重新設計",
      description: "重新設計公司網站，包含新的 UI、響應式設計和提升性能。",
      status: "active",
      progress: 65,
      dueDate: "2025-05-15",
      projectType: "sprint",
      coverImage: "https://source.unsplash.com/featured/?website,design",
      taskCount: 24,
      team: [
        { id: "user-1", name: "張小明", role: "設計師" },
        { id: "user-2", name: "李小華", role: "前端開發" },
        { id: "user-3", name: "王大壯", role: "後端開發" },
        { id: "user-4", name: "陳小婷", role: "專案經理" },
      ],
      created: "2025-02-10",
    },
    {
      id: "proj-2",
      name: "行動應用開發",
      description: "開發跨平台的行動應用，提供用戶帳戶管理、通知和基本功能。",
      status: "planning",
      progress: 15,
      dueDate: "2025-07-20",
      projectType: "scrumban",
      coverImage: "https://source.unsplash.com/featured/?mobile,app",
      taskCount: 18,
      team: [
        { id: "user-2", name: "李小華", role: "前端開發" },
        { id: "user-5", name: "趙小龍", role: "行動開發" },
        { id: "user-6", name: "林小雨", role: "UI/UX 設計" },
      ],
      created: "2025-03-05",
    },
    {
      id: "proj-3",
      name: "客戶支援系統",
      description: "建立內部客戶支援系統，包含工單管理、知識庫和自動回應功能。",
      status: "completed",
      progress: 100,
      dueDate: "2025-01-30",
      projectType: "kanban",
      coverImage: "https://source.unsplash.com/featured/?support,service",
      taskCount: 32,
      team: [
        { id: "user-3", name: "王大壯", role: "後端開發" },
        { id: "user-7", name: "許小剛", role: "資料庫專家" },
        { id: "user-8", name: "何小琳", role: "QA 測試" },
        { id: "user-4", name: "陳小婷", role: "專案經理" },
      ],
      created: "2024-11-15",
    },
    {
      id: "proj-4",
      name: "數據分析平台",
      description:
        "建立用於分析客戶數據的平台，支援圖表生成、報表匯出和預測分析。",
      status: "paused",
      progress: 45,
      dueDate: "2025-06-10",
      projectType: "sprint",
      coverImage: "https://source.unsplash.com/featured/?data,analytics",
      taskCount: 27,
      team: [
        { id: "user-7", name: "許小剛", role: "資料庫專家" },
        { id: "user-9", name: "周小雲", role: "資料科學家" },
        { id: "user-2", name: "李小華", role: "前端開發" },
      ],
      created: "2025-01-20",
    },
    {
      id: "proj-5",
      name: "行銷活動管理",
      description: "開發行銷活動管理系統，支援活動規劃、執行追蹤和成效分析。",
      status: "active",
      progress: 75,
      dueDate: "2025-04-30",
      projectType: "kanban",
      coverImage: "https://source.unsplash.com/featured/?marketing,campaign",
      taskCount: 19,
      team: [
        { id: "user-10", name: "楊小菲", role: "行銷專家" },
        { id: "user-6", name: "林小雨", role: "UI/UX 設計" },
        { id: "user-3", name: "王大壯", role: "後端開發" },
      ],
      created: "2025-02-28",
    },
  ]);

  // 過濾和排序專案
  const filteredProjects = projects
    .filter((project) => {
      // 搜尋過濾
      if (
        filters.searchQuery &&
        !project.name
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) &&
        !project.description
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }

      // 狀態過濾
      if (filters.status !== "all" && project.status !== filters.status) {
        return false;
      }

      // 類型過濾
      if (
        filters.projectType !== "all" &&
        project.projectType !== filters.projectType
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // 排序
      switch (filters.sortBy) {
        case "created-desc":
          return new Date(b.created) - new Date(a.created);
        case "created-asc":
          return new Date(a.created) - new Date(b.created);
        case "due-asc":
          return new Date(a.dueDate) - new Date(b.dueDate);
        case "due-desc":
          return new Date(b.dueDate) - new Date(a.dueDate);
        case "progress-asc":
          return a.progress - b.progress;
        case "progress-desc":
          return b.progress - a.progress;
        default:
          return 0;
      }
    });

  // 處理選擇專案
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    // 在實際應用中，這裡可能會導航到專案詳情頁面
    console.log("選擇專案:", project.name);
  };

  // 處理新增專案
  const handleNewProject = () => {
    setShowNewProjectModal(true);
    // 在實際應用中，這裡會打開新增專案的模態框
    console.log("新增專案");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-title">專案管理</h1>
        <button
          onClick={handleNewProject}
          className="flex items-center btn btn-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          新增專案
        </button>
      </div>

      {/* 過濾器與搜尋 */}
      <ProjectFilter filters={filters} setFilters={setFilters} />

      {/* 專案列表 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => handleProjectClick(project)}
          />
        ))}

        {/* 新增專案按鈕卡片 */}
        <NewProjectButton onClick={handleNewProject} />
      </div>

      {/* 空狀態提示 */}
      {filteredProjects.length === 0 && (
        <div className="py-12 text-center">
          <div className="w-20 h-20 mx-auto mb-4 text-surface-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-medium text-surface-900">
            沒有找到符合條件的專案
          </h3>
          <p className="max-w-md mx-auto text-surface-500">
            請嘗試調整過濾條件，或者建立一個新的專案來開始你的工作。
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
