import BoardList from "@/components/boardList/BoardList";
import Header from "@/components/header/Header";
import Board from "@/components/board/Board";
import EditBoard from "@/components/boardList/EditBoard";
import EditTask from "@/components/header/EditTask";
import ViewTask from "@/components/board/ViewTask";

import {
  useAppStore,
  useBoardListShownStore,
  useBoardStore,
  useColumnStore,
  useTaskStore,
  useSubtaskStore,
} from "@/lib/zustand/AppStore";
import { ReactComponent as LogoDark } from "@/assets/icons/logo-dark.svg";
import { ReactComponent as LogoLight } from "@/assets/icons/logo-light.svg";
import { ReactComponent as IconShowSidebar } from "@/assets/icons/icon-show-sidebar.svg";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase/index";
import SignIn from "@/components/SignIn";
import { query, collection, orderBy } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

const useDarkMode = () => {
  const isDarkMode = useAppStore((state) => state.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);
};

const useBoards = () => {
  const [user] = useAuthState(auth);
  const q = user ? query(collection(db, "users", user.uid, "boards")) : null;

  const [value, loading, error] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    if (value)
      useBoardStore.setState({
        boards: value.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      });
  }, [value]);

  return [value, loading, error];
};

const useColumns = () => {
  const [user] = useAuthState(auth);
  const selectedBoard = useBoardStore((state) => state.selectedBoard);

  const q =
    user && selectedBoard
      ? query(
          collection(db, "users", user.uid, "columns"),
          orderBy("position", "asc")
        )
      : null;

  const [value, loading, error] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    if (value)
      useColumnStore.setState({
        columns: value.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      });
  }, [value]);

  return [value, loading, error];
};

const useTasks = () => {
  const [user] = useAuthState(auth);

  const q = user ? query(collection(db, "users", user.uid, "tasks")) : null;

  const [value, loading, error] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    if (value)
      useTaskStore.setState({
        tasks: value.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      });
  }, [value]);

  return [value, loading, error];
};

const useSubtasks = () => {
  const [user] = useAuthState(auth);

  const q = user
    ? query(
        collection(db, "users", user.uid, "subtasks"),
        orderBy("position", "asc")
      )
    : null;

  const [value, loading, error] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    if (value)
      useSubtaskStore.setState({
        subtasks: value.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      });
  }, [value]);

  return [value, loading, error];
};

export default function App() {
  // getting states and using hooks
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const [boardListShown, isMobile, setBoardListShown, setIsMobile] =
    useBoardListShownStore((state) => [
      state.boardListShown,
      state.isMobile,
      state.setBoardListShown,
      state.setIsMobile,
    ]);
  const { boards, selectedBoard } = useBoardStore();
  const width = useWindowWidth();
  const [user, loading] = useAuthState(auth);
  useDarkMode();
  useBoards();
  useColumns();
  useTasks();
  useSubtasks();

  // show first board if no board is selected
  useEffect(() => {
    if (!selectedBoard) {
      if (boards.length > 0) {
        useBoardStore.setState({ selectedBoard: boards[0].id });
      }
    } else if (boards.length === 0) {
      useBoardStore.setState({ selectedBoard: "" });
    }
  }, [selectedBoard, boards]);

  // adjust board list shown on window resize
  useEffect(() => {
    if (width < 768 && !isMobile) {
      setBoardListShown(false);
      setIsMobile(true);
    } else {
      setBoardListShown(true);
      setIsMobile(false);
    }
  }, [width, isMobile, setBoardListShown, setIsMobile]);

  return (
    <>
      <Toaster />
      <EditBoard />
      <EditTask />
      <ViewTask />
      {!loading &&
        (user ? (
          <div className={`min-h-screen`}>
            {/* Board List for Desktop */}
            <div className="flex">
              {boardListShown && (
                <div
                  className={`hidden h-screen flex-shrink-0 flex-col border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 md:flex md:border-r-[1px]`}
                >
                  <div className="mx-6 mb-7 mt-5">
                    {isDarkMode ? <LogoLight /> : <LogoDark />}
                  </div>
                  <BoardList />
                </div>
              )}

              <div className="flex h-screen w-full flex-col overflow-auto bg-neutral-150 dark:bg-neutral-900">
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
