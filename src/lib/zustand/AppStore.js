import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useAppStore = create(
  devtools(
    persist(
      (set) => ({
        isDarkMode: false,
        toggleIsDarkMode: () =>
          set((state) => ({ isDarkMode: !state.isDarkMode })),
      }),
      {
        name: "app-storage",
      }
    )
  )
);

export const useBoardListShownStore = create(
  devtools((set) => ({
    boardListShown: true,
    isMobile: false,
    setBoardListShown: (newValue) => set(() => ({ boardListShown: newValue })),
    setIsMobile: (newValue) => set(() => ({ isMobile: newValue })),
  }))
);

export const useBoardStore = create(
  devtools((set) => ({
    boards: [],
    selectedBoard: "",
    setBoards: (newValue) => set(() => ({ boards: newValue })),
    setSelectedBoard: (newValue) => set(() => ({ selectedBoard: newValue })),
  }))
);

export const useColumnStore = create(
  devtools((set) => ({
    columns: [],
  }))
);

export const useEditBoardStore = create(
  devtools((set) => ({
    isOpen: false,
    id: "",
    name: "",
    isNew: true,
    columns: [],
    setName: (newValue) => set(() => ({ name: newValue })),
    setColumns: (newValue) => set(() => ({ columns: newValue })),
    addColumn: () =>
      set((state) => ({
        columns: [
          ...state.columns,
          { id: crypto.randomUUID(), name: "", color: "#A8A4FF" },
        ],
      })),
    reset: () =>
      set(() => ({
        isOpen: false,
        id: "",
        name: "",
        isNew: true,
        columns: [],
      })),
  }))
);

export const useEditTaskStore = create(
  devtools((set) => ({
    isOpen: false,
    id: "",
    name: "",
    isNew: true,
    description: "",
    subtasks: [
      { id: crypto.randomUUID(), name: "", isDone: false },
      { id: crypto.randomUUID(), name: "", isDone: false },
    ],
    column: "",
    reset: () =>
      set(() => ({
        isOpen: false,
        id: "",
        name: "",
        isNew: true,
        description: "",
        subtasks: [
          { id: crypto.randomUUID(), name: "", isDone: false },
          { id: crypto.randomUUID(), name: "", isDone: false },
        ],
        column: "",
      })),
    addSubtask: () => {
      set((state) => ({
        subtasks: [
          ...state.subtasks,
          { id: crypto.randomUUID(), name: "", isDone: false },
        ],
      }));
    },
  }))
);

export const useTaskStore = create(
  devtools((set) => ({
    tasks: [],
  }))
);

export const useSubtaskStore = create(
  devtools((set) => ({
    subtasks: [],
  }))
);

export const useViewTaskStore = create(
  devtools((set) => ({
    isOpen: false,
    id: "",
    name: "",
    description: "",
    subtasks: [],
    reset: () =>
      set(() => ({
        isOpen: false,
        id: "",
        name: "",
        description: "",
        subtasks: [],
      })),
  }))
);
