import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";
import { useAppStore } from "@/assets/zustand/AppStore";

export default () => {
  const isDarkMode = useAppStore((state) => state.isDarkMode);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="flex w-screen h-screen justify-center items-center bg-neutral-400 dark:bg-neutral-700">
        <Sidebar />
        {/* <Header /> */}
      </div>
    </div>
  );
};
