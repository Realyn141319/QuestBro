import { create } from "zustand";
import { api, subscribeToTasks } from "../lib/supabase";
import useUserStore from "./userStore";

// 任務狀態管理
const useTaskStore = create((set, get) => ({
  // 任務資料
  tasks: {},
  columns: {
    "column-1": {
      id: "column-1",
      title: "待處理",
      taskIds: [],
    },
    "column-2": {
      id: "column-2",
      title: "進行中",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "已完成",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],

  // 狀態
  isLoading: false,
  error: null,
  subscription: null,

  // 初始化任務資料
  initializeTasks: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await api.getTasks();

      if (error) {
        set({ error: error.message });
        return;
      }

      // 將任務資料轉換為適合 UI 的格式
      const tasks = {};
      const columns = {
        "column-1": {
          id: "column-1",
          title: "待處理",
          taskIds: [],
        },
        "column-2": {
          id: "column-2",
          title: "進行中",
          taskIds: [],
        },
        "column-3": {
          id: "column-3",
          title: "已完成",
          taskIds: [],
        },
      };

      // 將任務分配到對應欄位
      data.forEach((task) => {
        const taskId = task.id;
        tasks[taskId] = {
          id: taskId,
          title: task.title,
          description: task.description,
          dueDate: task.due_date,
          difficulty: task.difficulty,
          points: task.points,
          tags: task.tags || [],
          assignedTo: task.assigned_to || [],
          collaborators: task.collaborators || [],
        };

        // 根據任務狀態添加到對應欄位
        switch (task.status) {
          case "todo":
            columns["column-1"].taskIds.push(taskId);
            break;
          case "in_progress":
            columns["column-2"].taskIds.push(taskId);
            break;
          case "completed":
            columns["column-3"].taskIds.push(taskId);
            break;
        }
      });

      set({ tasks, columns });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // 創建新任務
  createTask: async (taskData) => {
    set({ isLoading: true, error: null });
    try {
      // 獲取當前使用者
      const user = useUserStore.getState().user;

      if (!user) {
        set({ error: "使用者未登入" });
        return { success: false, error: "使用者未登入" };
      }

      // 準備任務資料
      const newTask = {
        title: taskData.title,
        description: taskData.description || "",
        status: "todo",
        difficulty: taskData.difficulty || "medium",
        points: taskData.points || 30,
        tags: taskData.tags || [],
        assigned_to: taskData.assignedTo || [user.id],
        created_by: user.id,
        due_date: taskData.dueDate,
        collaborators: taskData.collaborators || [],
      };

      const { data, error } = await api.createTask(newTask);

      if (error) {
        set({ error: error.message });
        return { success: false, error };
      }

      // 檢查是否為創新者角色提出新任務
      const profile = useUserStore.getState().profile;
      const isInnovator = profile?.role === "innovator";

      if (isInnovator) {
        // 創新者有 30% 機會獲得特殊寶箱
        const chance = Math.random();
        if (chance <= 0.3) {
          // 處理獲得寶箱的邏輯，可以在這裡展示通知或實現獎勵機制
          console.log("創新者獲得特殊寶箱");
          // 在實際實作中，可以調用 useUserStore 中的方法來處理獎勵
        }
      }

      // 更新本地狀態 (實際上會由 subscription 處理)
      return { success: true, data };
    } catch (err) {
      set({ error: err.message });
      return { success: false, error: err };
    } finally {
      set({ isLoading: false });
    }
  },

  // 更新任務
  updateTask: async (taskId, updates) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await api.updateTask(taskId, updates);

      if (error) {
        set({ error: error.message });
        return { success: false, error };
      }

      return { success: true, data };
    } catch (err) {
      set({ error: err.message });
      return { success: false, error: err };
    } finally {
      set({ isLoading: false });
    }
  },

  // 刪除任務
  deleteTask: async (taskId) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await api.deleteTask(taskId);

      if (error) {
        set({ error: error.message });
        return { success: false, error };
      }

      return { success: true };
    } catch (err) {
      set({ error: err.message });
      return { success: false, error: err };
    } finally {
      set({ isLoading: false });
    }
  },

  // 處理任務拖曳結束
  onDragEnd: async (result) => {
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
    const sourceColumn = get().columns[source.droppableId];
    const destinationColumn = get().columns[destination.droppableId];
    const task = get().tasks[draggableId];

    // 如果在同一欄內移動
    if (sourceColumn === destinationColumn) {
      const newTaskIds = Array.from(sourceColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds,
      };

      set({
        columns: {
          ...get().columns,
          [newColumn.id]: newColumn,
        },
      });

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

    // 更新本地狀態
    set({
      columns: {
        ...get().columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      },
    });

    // 將狀態更新到後端
    const statusMap = {
      "column-1": "todo",
      "column-2": "in_progress",
      "column-3": "completed",
    };

    // 獲取新狀態
    const newStatus = statusMap[destination.droppableId];

    // 更新任務狀態
    await get().updateTask(draggableId, { status: newStatus });

    // 如果任務被移動到「已完成」欄位，則獎勵經驗值
    if (destinationColumn.id === "column-3" && sourceColumn.id !== "column-3") {
      // 確定完成任務的情境
      const taskContext = {
        isCompletedIndividually: task.assignedTo?.length === 1,
        isCollaborative:
          task.assignedTo?.length > 1 || task.collaborators?.length > 0,
        isAssignedByStrategist: false, // 這部分需要額外邏輯檢查
      };

      // 獲取任務難度和基礎經驗值
      const difficultyXpMap = {
        easy: 10,
        medium: 30,
        hard: 50,
        epic: 100,
      };

      const baseXp = difficultyXpMap[task.difficulty] || 30;

      // 應用角色加成
      const addExperience = useUserStore.getState().addExperience;
      const applyRoleBonus = useUserStore.getState().applyRoleBonus;

      const bonusXp = applyRoleBonus(baseXp, taskContext);

      // 增加經驗值
      await addExperience(bonusXp);

      // 更新任務完成計數並檢查成就
      const profile = useUserStore.getState().profile;
      const completedTasks = (profile?.completedTasks || 0) + 1;

      await useUserStore.getState().updateProfile({
        completedTasks,
      });

      // 檢查是否達成任務完成相關成就
      const unlockAchievement = api.unlockAchievement;
      const userId = useUserStore.getState().user.id;
      const achievementTypes = useUserStore.getState().ACHIEVEMENT_TYPES;

      if (
        completedTasks >= 10 &&
        !profile?.achievements?.some(
          (a) => a.type === achievementTypes.TASK_COMPLETE_10.key
        )
      ) {
        await unlockAchievement(userId, achievementTypes.TASK_COMPLETE_10.key);
      }

      if (
        completedTasks >= 50 &&
        !profile?.achievements?.some(
          (a) => a.type === achievementTypes.TASK_COMPLETE_50.key
        )
      ) {
        await unlockAchievement(userId, achievementTypes.TASK_COMPLETE_50.key);
      }

      return {
        didComplete: true,
        xpEarned: bonusXp,
        newTotalXp: profile?.xp + bonusXp,
      };
    }

    return { didComplete: false };
  },

  // 訂閱即時任務更新
  subscribeToTaskUpdates: () => {
    const subscription = subscribeToTasks((payload) => {
      // 根據變更事件類型進行處理
      const { eventType, new: newRecord, old: oldRecord } = payload;

      switch (eventType) {
        case "INSERT":
          set((state) => {
            // 將新任務添加到本地狀態
            const taskId = newRecord.id;
            const newTasks = {
              ...state.tasks,
              [taskId]: {
                id: taskId,
                title: newRecord.title,
                description: newRecord.description,
                dueDate: newRecord.due_date,
                difficulty: newRecord.difficulty,
                points: newRecord.points,
                tags: newRecord.tags || [],
                assignedTo: newRecord.assigned_to || [],
                collaborators: newRecord.collaborators || [],
              },
            };

            // 添加到適當的欄位
            const columnId =
              newRecord.status === "todo"
                ? "column-1"
                : newRecord.status === "in_progress"
                ? "column-2"
                : "column-3";

            const newColumns = { ...state.columns };
            newColumns[columnId].taskIds.push(taskId);

            return { tasks: newTasks, columns: newColumns };
          });
          break;

        case "UPDATE":
          set((state) => {
            // 更新現有任務
            const taskId = newRecord.id;
            const oldTask = state.tasks[taskId];

            if (!oldTask) return state;

            // 更新任務資料
            const updatedTasks = {
              ...state.tasks,
              [taskId]: {
                ...oldTask,
                title: newRecord.title,
                description: newRecord.description,
                dueDate: newRecord.due_date,
                difficulty: newRecord.difficulty,
                points: newRecord.points,
                tags: newRecord.tags || [],
                assignedTo: newRecord.assigned_to || [],
                collaborators: newRecord.collaborators || [],
              },
            };

            // 如果狀態有變化，需要移動欄位
            if (oldRecord.status !== newRecord.status) {
              const newColumns = { ...state.columns };

              // 舊欄位 ID
              const oldColumnId =
                oldRecord.status === "todo"
                  ? "column-1"
                  : oldRecord.status === "in_progress"
                  ? "column-2"
                  : "column-3";

              // 新欄位 ID
              const newColumnId =
                newRecord.status === "todo"
                  ? "column-1"
                  : newRecord.status === "in_progress"
                  ? "column-2"
                  : "column-3";

              // 從舊欄位移除
              newColumns[oldColumnId].taskIds = newColumns[
                oldColumnId
              ].taskIds.filter((id) => id !== taskId);

              // 添加到新欄位
              newColumns[newColumnId].taskIds.push(taskId);

              return { tasks: updatedTasks, columns: newColumns };
            }

            return { tasks: updatedTasks };
          });
          break;

        case "DELETE":
          set((state) => {
            // 刪除任務
            const taskId = oldRecord.id;
            const newTasks = { ...state.tasks };
            const newColumns = { ...state.columns };

            // 從任務列表中刪除
            delete newTasks[taskId];

            // 從所有欄位中刪除
            Object.keys(newColumns).forEach((columnId) => {
              newColumns[columnId].taskIds = newColumns[
                columnId
              ].taskIds.filter((id) => id !== taskId);
            });

            return { tasks: newTasks, columns: newColumns };
          });
          break;
      }
    });

    set({ subscription });
    return subscription;
  },

  // 取消訂閱
  unsubscribe: () => {
    const { subscription } = get();
    if (subscription) {
      subscription.unsubscribe();
      set({ subscription: null });
    }
  },
}));

export default useTaskStore;
