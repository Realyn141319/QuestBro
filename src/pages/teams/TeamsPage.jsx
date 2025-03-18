import React, { useState } from "react";
// import useUserStore from "../../store/userStore";

// 團隊卡片組件
const TeamCard = ({ team, onClick, isActive }) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded-xl mb-4 cursor-pointer ${
        isActive ? "border-primary-500 bg-primary-50" : "border-surface-200"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{team.name}</h3>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            team.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-surface-100 text-surface-600"
          }`}
        >
          {team.status === "active" ? "活躍" : "非活躍"}
        </span>
      </div>
      <p className="mb-3 text-sm text-surface-600">{team.description}</p>
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2 text-center rounded-md bg-surface-50">
          <div className="font-semibold">{team.membersCount}</div>
          <div className="text-xs text-surface-500">成員</div>
        </div>
        <div className="p-2 text-center rounded-md bg-surface-50">
          <div className="font-semibold">{team.projectsCount}</div>
          <div className="text-xs text-surface-500">專案</div>
        </div>
        <div className="p-2 text-center rounded-md bg-surface-50">
          <div className="font-semibold">{team.tasksCount}</div>
          <div className="text-xs text-surface-500">任務</div>
        </div>
      </div>
    </div>
  );
};

// 團隊詳情組件
const TeamDetails = ({ team, onClose }) => {
  if (!team) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-w-2xl w-full mx-4 bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{team.name}</h2>
            <button
              onClick={onClose}
              className="text-surface-400 hover:text-surface-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <p className="mb-6 text-surface-600">{team.description}</p>

          <div className="mb-6">
            <h3 className="mb-3 text-lg font-semibold">團隊成員</h3>
            <div className="border divide-y rounded-lg">
              {team.members.map((member, index) => (
                <div key={index} className="flex items-center p-3">
                  <div className="flex items-center justify-center w-8 h-8 text-sm font-medium rounded-full bg-surface-200">
                    {member.name[0]}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs text-surface-500">{member.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-3 text-lg font-semibold">團隊專案</h3>
            {team.projects.length > 0 ? (
              <div className="grid gap-4">
                {team.projects.map((project, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">{project.name}</h4>
                      <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">
                        {project.status}
                      </span>
                    </div>
                    <p className="mb-2 text-sm text-surface-600">
                      {project.description}
                    </p>
                    <div className="text-xs text-surface-500">
                      {project.tasksCount} 個任務
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center rounded-lg bg-surface-50">
                <p className="text-surface-600">此團隊尚未有任何專案</p>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button className="px-4 py-2 text-white rounded-md bg-primary-600">
              編輯團隊
            </button>
            <button className="px-4 py-2 text-red-600 border border-red-300 rounded-md">
              離開團隊
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 團隊過濾器
const TeamFilter = ({ filters, setFilters }) => (
  <div className="flex flex-wrap gap-4 mb-6">
    <select
      value={filters.status}
      onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      className="px-3 py-2 border rounded-md"
    >
      <option value="all">所有狀態</option>
      <option value="active">活躍</option>
      <option value="inactive">非活躍</option>
    </select>

    <input
      type="text"
      placeholder="搜尋團隊..."
      value={filters.search}
      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      className="flex-grow px-3 py-2 border rounded-md"
    />
  </div>
);

// 建立團隊按鈕
const CreateTeamButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-full p-4 mb-6 text-center border-2 border-dashed border-surface-300 rounded-xl hover:border-primary-300 hover:bg-primary-50"
  >
    <span className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-primary-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-primary-600"
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
    </span>
    <h3 className="font-medium">建立新團隊</h3>
  </button>
);

// 主頁面組件
const TeamsPage = () => {
  // const { profile } = useUserStore();
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
  });

  // 模擬團隊數據
  const teams = [
    {
      id: "team-1",
      name: "設計團隊",
      description: "負責產品UI/UX設計和品牌視覺形象",
      status: "active",
      membersCount: 5,
      projectsCount: 3,
      tasksCount: 24,
      members: [
        { id: "user-1", name: "張小明", title: "設計總監" },
        { id: "user-2", name: "李小華", title: "UI設計師" },
      ],
      projects: [
        {
          id: "proj-1",
          name: "網站重新設計",
          description: "重新設計公司網站，提升用戶體驗",
          status: "進行中",
          tasksCount: 15,
        },
      ],
    },
    {
      id: "team-2",
      name: "開發團隊",
      description: "負責產品後端和前端開發，確保技術實現和性能優化",
      status: "active",
      membersCount: 4,
      projectsCount: 2,
      tasksCount: 32,
      members: [
        { id: "user-3", name: "王大壯", title: "技術總監" },
        { id: "user-4", name: "趙小龍", title: "前端開發" },
      ],
      projects: [
        {
          id: "proj-2",
          name: "行動應用開發",
          description: "開發跨平台的行動應用",
          status: "進行中",
          tasksCount: 18,
        },
      ],
    },
  ];

  // 篩選團隊
  const filteredTeams = teams.filter((team) => {
    // 狀態過濾
    if (filters.status !== "all" && team.status !== filters.status) {
      return false;
    }

    // 搜尋過濾
    if (
      filters.search &&
      !team.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !team.description.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">我的團隊</h1>
        <button className="px-4 py-2 text-white rounded-md bg-primary-600">
          建立團隊
        </button>
      </div>

      <TeamFilter filters={filters} setFilters={setFilters} />

      <div className="grid gap-6 md:grid-cols-2">
        <CreateTeamButton onClick={() => console.log("Create team clicked")} />

        {filteredTeams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            isActive={selectedTeam?.id === team.id}
            onClick={() => setSelectedTeam(team)}
          />
        ))}
      </div>

      {selectedTeam && (
        <TeamDetails
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
        />
      )}
    </div>
  );
};

export default TeamsPage;
