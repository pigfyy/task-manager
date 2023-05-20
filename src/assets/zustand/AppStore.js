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
    boardListShown: false,
    setBoardListShown: (newValue) => set(() => ({ boardListShown: newValue })),
  }))
);

export const useBoardStore = create(
  devtools((set) => ({
    boards: {
      ["test-uuid1"]: "Platform Launch",
      ["test-uuid2"]: "Marketing Plan",
      ["test-uuid3"]: "Roadmap",
    },
    selectedBoard: "",
  }))
);

export const useColumnStore = create(
  devtools((set) => ({
    [crypto.randomUUID()]: {
      name: "To Do",
      boardId: "test-uuid1",
    },
  }))
);
