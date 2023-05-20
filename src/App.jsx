import BoardList from "@/components/boardList/BoardList";
import Header from "@/components/header/Header";
import { useAppStore, useBoardListShownStore } from "@/assets/zustand/AppStore";
import { ReactComponent as LogoDark } from "@/assets/icons/logo-dark.svg";
import { ReactComponent as LogoLight } from "@/assets/icons/logo-light.svg";

export default () => {
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const [boardListShown, setBoardListShown] = useBoardListShownStore(
    (state) => [state.boardListShown, state.setBoardListShown]
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="flex">
        {boardListShown && (
          <div className="hidden min-h-screen flex-shrink-0 flex-col bg-neutral-100 dark:bg-neutral-800 md:flex">
            <div className="mx-6 mb-7 mt-5">
              {isDarkMode ? <LogoLight /> : <LogoDark />}
            </div>
            <BoardList />
          </div>
        )}
        <div className="flex min-h-screen w-full flex-col bg-neutral-150 dark:bg-neutral-700">
          <Header />
        </div>
      </div>
    </div>
  );
};
