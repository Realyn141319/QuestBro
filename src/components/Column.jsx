import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

// 每一欄的風格配置
const columnStyles = {
  "column-1": {
    title: "待處理",
    bgGradient: "from-blue-500/10 to-blue-600/10",
    iconPath:
      "M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z",
    emptyMessage: "目前沒有待處理任務",
  },
  "column-2": {
    title: "進行中",
    bgGradient: "from-yellow-500/10 to-yellow-600/10",
    iconPath:
      "M10 2a2 2 0 00-2 2v4a2 2 0 104 0V4a2 2 0 00-2-2zm7 11a2 2 0 11-4 0 2 2 0 014 0zm-10 0a2 2 0 11-4 0 2 2 0 014 0z M10 14a2 2 0 104 0 2 2 0 00-4 0z",
    emptyMessage: "目前沒有進行中任務",
  },
  "column-3": {
    title: "已完成",
    bgGradient: "from-green-500/10 to-green-600/10",
    iconPath:
      "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
    emptyMessage: "目前沒有已完成任務",
  },
};

const Column = ({ column, tasks, difficulties }) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const style = columnStyles[column.id] || {
    title: column.title,
    bgGradient: "from-gray-100 to-gray-200",
    iconPath:
      "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    emptyMessage: "沒有任務",
  };

  // 計算此欄位的總點數
  const totalPoints = tasks.reduce((sum, task) => sum + (task.points || 0), 0);

  return (
    <div
      className={`flex flex-col w-80 rounded-lg p-4 mx-2 bg-gradient-to-b ${style.bgGradient}`}
    >
      {/* 欄位標題 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-white p-1.5 rounded-md shadow-sm mr-2">
            <svg
              className="w-5 h-5 text-indigo-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d={style.iconPath} clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-700">{style.title}</h2>
            <div className="flex text-xs text-gray-500 mt-0.5">
              <span>{tasks.length} 任務</span>
              {totalPoints > 0 && (
                <span className="ml-2">{totalPoints} 點</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-1">
          <button className="p-1 rounded-md hover:bg-white hover:bg-opacity-50">
            <svg
              className="w-4 h-4 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* 拖放區域 */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-grow min-h-[300px] ${
              snapshot.isDraggingOver
                ? "bg-white bg-opacity-50"
                : "bg-white bg-opacity-30"
            } rounded-md p-2 transition-colors duration-200`}
          >
            {tasks.length === 0 ? (
              <div className="flex items-center justify-center h-full text-sm text-gray-400">
                {style.emptyMessage}
              </div>
            ) : (
              tasks.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  difficulties={difficulties}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* 添加任務按鈕或表單 */}
      {!showAddTask ? (
        <button
          className="w-full py-2 mt-3 text-sm font-medium text-center text-indigo-700 transition-colors duration-150 bg-indigo-100 rounded-md hover:bg-indigo-200"
          onClick={() => setShowAddTask(true)}
        >
          + 新增任務
        </button>
      ) : (
        <div className="p-3 mt-3 bg-white rounded-md shadow-sm">
          <input
            type="text"
            placeholder="輸入任務標題..."
            className="w-full p-2 mb-2 text-sm border border-gray-300 rounded-md"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            autoFocus
          />
          <div className="flex justify-end space-x-2">
            <button
              className="px-3 py-1 text-xs text-gray-600 rounded-md hover:bg-gray-100"
              onClick={() => {
                setShowAddTask(false);
                setNewTaskTitle("");
              }}
            >
              取消
            </button>
            <button
              className="px-3 py-1 text-xs text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              onClick={() => {
                // 此處僅是UI演示，實際新增功能會串接後端
                setShowAddTask(false);
                setNewTaskTitle("");
              }}
            >
              新增
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Column;
