import React from "react";
import { Draggable } from "react-beautiful-dnd";

// 隨機頭像圖片
const userAvatars = {
  "user-1": "https://i.pravatar.cc/150?img=10",
  "user-2": "https://i.pravatar.cc/150?img=11",
};

const Task = ({ task, index, difficulties }) => {
  // 獲取任務難度信息
  const difficulty =
    difficulties && task.difficulty ? difficulties[task.difficulty] : null;

  // 確定難度標籤的顏色
  const getDifficultyColor = () => {
    if (!difficulty) return "bg-gray-200 text-gray-700";

    switch (difficulty.color) {
      case "green":
        return "bg-green-100 text-green-800";
      case "yellow":
        return "bg-yellow-100 text-yellow-800";
      case "orange":
        return "bg-orange-100 text-orange-800";
      case "red":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 mb-3 rounded-lg shadow-sm ${
            snapshot.isDragging
              ? "bg-blue-50 shadow-md"
              : "bg-white hover:bg-gray-50"
          } border-l-4 ${
            difficulty
              ? difficulty.color === "green"
                ? "border-green-400"
                : difficulty.color === "yellow"
                ? "border-yellow-400"
                : difficulty.color === "orange"
                ? "border-orange-400"
                : difficulty.color === "red"
                ? "border-red-400"
                : "border-gray-300"
              : "border-gray-300"
          }`}
        >
          {/* 任務標題和點數 */}
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-medium text-gray-800">{task.title}</h3>
            {task.points && (
              <span className="px-2 py-1 ml-2 text-xs text-blue-800 bg-blue-100 rounded-full">
                {task.points} 點
              </span>
            )}
          </div>

          {/* 任務描述 */}
          {task.description && (
            <p className="mt-1 text-sm text-gray-600">{task.description}</p>
          )}

          {/* 標籤列 */}
          {task.tags && task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {task.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-xs bg-gray-200 text-gray-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* 底部資訊欄 */}
          <div className="flex items-center justify-between pt-2 mt-3 border-t border-gray-100">
            {/* 到期日 */}
            {task.dueDate && (
              <div className="flex items-center text-xs text-gray-500">
                <svg
                  className="w-3 h-3 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                {task.dueDate}
              </div>
            )}

            {/* 難度標籤 */}
            {difficulty && (
              <span
                className={`px-2 py-0.5 text-xs rounded-full ${getDifficultyColor()}`}
              >
                {difficulty.label}
              </span>
            )}

            {/* 指派給 */}
            {task.assignedTo && (
              <div className="flex items-center">
                <img
                  src={userAvatars[task.assignedTo]}
                  alt="User avatar"
                  className="w-5 h-5 rounded-full"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
