import create from "zustand";
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
