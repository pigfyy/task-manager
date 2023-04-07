import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useAppStore = create(
  devtools((set) => ({
    isDarkMode: false,
    toggleIsDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  }))
);

// const useAppStore = create(
//   devtools((set) => ({
//     currentSection: "friends",
//     chatId: "",
//     setCurrentSection: (section) => set(() => ({ currentSection: section })),
//     setChatId: (id) => set(() => ({ chatId: id })),
//   }))
// );
