import { ReactComponent as IconLight } from "@/assets/icons/icon-light-theme.svg";
import { ReactComponent as IconDark } from "@/assets/icons/icon-dark-theme.svg";

import { useAppStore } from "@/lib/zustand/AppStore";

export default function ThemeSwitcher() {
  const { toggleIsDarkMode } = useAppStore();

  return (
    <div className="flex gap-6">
      <IconLight />
      <button
        className="relative h-5 w-9 rounded-[200px] bg-primary-400 px-1 hover:bg-primary-200"
        onClick={toggleIsDarkMode}
      >
        <div className="absolute top-1/2 h-3 w-3 -translate-y-1/2 translate-x-0 transform rounded-full bg-neutral-100 transition-all duration-300 dark:translate-x-4"></div>
      </button>
      <IconDark />
    </div>
  );
}
