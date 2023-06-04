import BoardList from "@/components/boardList/BoardList";
import Header from "@/components/header/Header";
import Board from "@/components/board/Board";

import { useAppStore, useBoardListShownStore } from "@/lib/zustand/AppStore";
import { ReactComponent as LogoDark } from "@/assets/icons/logo-dark.svg";
import { ReactComponent as LogoLight } from "@/assets/icons/logo-light.svg";
import { ReactComponent as IconShowSidebar } from "@/assets/icons/icon-show-sidebar.svg";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import { useEffect } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/index";
import SignIn from "@/components/SignIn";

export default function App() {
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const [boardListShown, setBoardListShown] = useBoardListShownStore(
    (state) => [state.boardListShown, state.setBoardListShown]
  );
  const width = useWindowWidth();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      {!loading &&
        (user ? (
          <div className={`min-h-screen`}>
            {/* Board List for Desktop */}
            <div className="flex">
              {boardListShown && (
                <div
                  className={`hidden min-h-screen flex-shrink-0 flex-col border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 md:flex md:border-r-[1px]`}
                >
                  <div className="mx-6 mb-7 mt-5">
                    {isDarkMode ? <LogoLight /> : <LogoDark />}
                  </div>
                  <BoardList />
                </div>
              )}

              <div className="flex min-h-screen w-full flex-col bg-neutral-150 dark:bg-neutral-900">
                <Header />
                <Board />
              </div>
            </div>

            {/* Show Board List Button */}
            {!boardListShown && width > 768 && (
              <button
                onClick={() => setBoardListShown(true)}
                className="fixed bottom-10 left-0 rounded-r-full bg-primary-400 p-5 pl-4 transition-all hover:bg-primary-200"
              >
                <IconShowSidebar fill="#FFFFFF" />
              </button>
            )}
          </div>
        ) : (
          <SignIn />
        ))}
    </>
  );
}
