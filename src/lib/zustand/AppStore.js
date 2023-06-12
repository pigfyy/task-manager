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
    setBoardListShown: (newValue) => set(() => ({ boardListShown: newValue })),
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
    name: "",
    columns: [
      { name: "", color: "#A8A4FF" },
      { name: "", color: "#A8A4FF" },
    ],
    setName: (newValue) => set(() => ({ name: newValue })),
    setColumns: (newValue) => set(() => ({ columns: newValue })),
    addColumn: () =>
      set((state) => ({
        columns: [...state.columns, { name: "", color: "#A8A4FF" }],
      })),
    reset: () =>
      set(() => ({
        name: "",
        columns: [
          { name: "", color: "#A8A4FF" },
          { name: "", color: "#A8A4FF" },
        ],
      })),
  }))
);
