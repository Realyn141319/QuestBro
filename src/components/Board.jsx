import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

// 遊戲化元素：任務難度與獎勵
const difficulties = {
  easy: { label: "簡單", color: "green", xpReward: 10 },
  medium: { label: "中等", color: "yellow", xpReward: 30 },
  hard: { label: "困難", color: "orange", xpReward: 50 },
  epic: { label: "史詩", color: "red", xpReward: 100 },
};

// 專案初始資料
const initialData = {
  tasks: {
    "task-1": {
      id: "task-1",
      title: "建立網站設計稿",
      description: "使用 Figma 設計網站原型",
      dueDate: "2025-03-10",
      difficulty: "medium",
      points: 30,
      tags: ["設計", "前端"],
      assignedTo: "user-1",
    },
    "task-2": {
      id: "task-2",
      title: "實作前端頁面",
      description: "使用 React 和 Tailwind CSS",
      dueDate: "2025-03-15",
      difficulty: "hard",
      points: 50,
      tags: ["開發", "前端"],
      assignedTo: "user-1",
    },
    "task-3": {
      id: "task-3",
      title: "建立資料庫",
      description: "設計資料庫結構並實作",
      dueDate: "2025-03-12",
      difficulty: "medium",
      points: 30,
      tags: ["開發", "後端", "資料庫"],
      assignedTo: "user-2",
    },
    "task-4": {
      id: "task-4",
      title: "實作後端 API",
      description: "使用 Node.js 和 Express",
      dueDate: "2025-03-20",
      difficulty: "hard",
      points: 50,
      tags: ["開發", "後端"],
      assignedTo: "user-2",
    },
    "task-5": {
      id: "task-5",
      title: "進行單元測試",
      description: "為關鍵功能編寫測試",
      dueDate: "2025-03-25",
      difficulty: "medium",
      points: 30,
      tags: ["測試", "品質"],
      assignedTo: "user-1",
    },
    "task-6": {
      id: "task-6",
      title: "部署應用程式",
      description: "設定 CI/CD 流程",
      dueDate: "2025-03-30",
      difficulty: "epic",
      points: 100,
      tags: ["部署", "DevOps"],
      assignedTo: "user-2",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "待處理",
      taskIds: ["task-1", "task-2"],
    },
    "column-2": {
      id: "column-2",
      title: "進行中",
      taskIds: ["task-3", "task-4"],
    },
    "column-3": {
      id: "column-3",
      title: "已完成",
      taskIds: ["task-5", "task-6"],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

const Board = () => {
  const [boardData, setBoardData] = useState(initialData);
  const [reward, setReward] = useState(null);
  const [stats, setStats] = useState({
    completedTasks: 0,
    totalXp: 0,
    level: 1,
    xpToNextLevel: 100,
  });

  // 重置獎勵通知
  useEffect(() => {
    if (reward) {
      const timer = setTimeout(() => {
        setReward(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [reward]);

  // 處理任務拖曳結束
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // 如果沒有目的地（拖曳到看板外）或目的地與來源相同，則不做任何事
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // 取得來源欄和目的欄
    const sourceColumn = boardData.columns[source.droppableId];
    const destinationColumn = boardData.columns[destination.droppableId];
    const task = boardData.tasks[draggableId];

    // 如果在同一欄內移動
    if (sourceColumn === destinationColumn) {
      const newTaskIds = Array.from(sourceColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds,
      };

      const newState = {
        ...boardData,
        columns: {
          ...boardData.columns,
          [newColumn.id]: newColumn,
        },
      };

      setBoardData(newState);
      return;
    }

    // 如果在不同欄之間移動
    const sourceTaskIds = Array.from(sourceColumn.taskIds);
    sourceTaskIds.splice(source.index, 1);
    const newSourceColumn = {
      ...sourceColumn,
      taskIds: sourceTaskIds,
    };

    const destinationTaskIds = Array.from(destinationColumn.taskIds);
    destinationTaskIds.splice(destination.index, 0, draggableId);
    const newDestinationColumn = {
      ...destinationColumn,
      taskIds: destinationTaskIds,
    };

    const newState = {
      ...boardData,
      columns: {
        ...boardData.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      },
    };

    setBoardData(newState);

    // 當任務移動到「已完成」欄位時，顯示獎勵並更新統計資料
    if (destinationColumn.id === "column-3" && sourceColumn.id !== "column-3") {
      const difficulty = difficulties[task.difficulty];
      const xpReward = difficulty.xpReward;

      setReward({
        taskId: task.id,
        taskTitle: task.title,
        xp: xpReward,
        points: task.points,
      });

      // 更新遊戲統計資料
      setStats((prevStats) => {
        const newTotalXp = prevStats.totalXp + xpReward;
        const newCompletedTasks = prevStats.completedTasks + 1;

        // 檢查是否升級
        let newLevel = prevStats.level;
        let newXpToNextLevel = prevStats.xpToNextLevel;

        if (newTotalXp >= prevStats.level * 100) {
          newLevel = prevStats.level + 1;
          newXpToNextLevel = newLevel * 100;
        }

        return {
          completedTasks: newCompletedTasks,
          totalXp: newTotalXp,
          level: newLevel,
          xpToNextLevel: newXpToNextLevel,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* 獎勵通知 */}
      {reward && (
        <div className="fixed z-50 p-4 text-white rounded-lg shadow-lg top-20 right-4 bg-gradient-to-r from-purple-600 to-indigo-600 animate-bounce">
          <div className="text-lg font-bold">任務完成！</div>
          <div>{reward.taskTitle}</div>
          <div className="flex items-center mt-2">
            <span className="px-2 py-1 mr-2 text-yellow-800 bg-yellow-400 rounded">
              +{reward.xp} XP
            </span>
            <span className="px-2 py-1 text-blue-800 bg-blue-400 rounded">
              +{reward.points} 點數
            </span>
          </div>
        </div>
      )}

      {/* 狀態欄 */}
      <div className="p-3 mb-4 bg-gray-100 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex space-x-6">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-1 text-indigo-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">
                已完成:{" "}
                <span className="font-bold">{stats.completedTasks}</span>
              </span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-1 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707L15.414 3a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-2-2A1 1 0 0110 4.414l.293.293L11 6.414l2.293-2.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">
                總經驗值: <span className="font-bold">{stats.totalXp}</span>
              </span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-1 text-purple-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zm5 2a2 2 0 11-4 0 2 2 0 014 0zm-4 7a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zm10 10v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <span className="text-gray-700">
                等級: <span className="font-bold">{stats.level}</span>
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-600">下一級</span>
            <div className="w-40 h-2 bg-gray-300 rounded-full">
              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{
                  width: `${Math.min(
                    100,
                    (stats.totalXp / stats.xpToNextLevel) * 100
                  )}%`,
                }}
              ></div>
            </div>
            <span className="ml-2 text-xs text-gray-500">
              {stats.totalXp}/{stats.xpToNextLevel}
            </span>
          </div>
        </div>
      </div>

      <div className="flex p-4 pb-6 overflow-x-auto">
        {boardData.columnOrder.map((columnId) => {
          const column = boardData.columns[columnId];
          const tasks = column.taskIds.map((taskId) => boardData.tasks[taskId]);

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              difficulties={difficulties}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default Board;
