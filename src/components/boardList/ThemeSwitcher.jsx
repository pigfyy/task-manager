import { ReactComponent as IconLight } from "@/assets/icons/icon-light-theme.svg";
import { ReactComponent as IconDark } from "@/assets/icons/icon-dark-theme.svg";

import { useAppStore } from "@/assets/zustand/AppStore";

export default () => {
  const { toggleIsDarkMode } = useAppStore();

  return (
    <div className="flex gap-6">
      <IconLight />
      <button
        className="bg-primary-400 w-9 h-5 rounded-[200px] relative px-1 hover:bg-primary-200"
        onClick={toggleIsDarkMode}
      >
        <div className="bg-neutral-100 rounded-full w-3 h-3 absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 dark:translate-x-4 translate-x-0"></div>
      </button>
      <IconDark />
    </div>
  );
};