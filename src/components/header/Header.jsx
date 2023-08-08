import { ReactComponent as LogoMobile } from "@/assets/icons/logo-mobile.svg";
import { ReactComponent as IconVerticalEllipsis } from "@/assets/icons/icon-vertical-ellipsis.svg";
import { ReactComponent as LogoDark } from "@/assets/icons/logo-dark.svg";
import { ReactComponent as LogoLight } from "@/assets/icons/logo-light.svg";
import { ReactComponent as IconMobileAddTask } from "@/assets/icons/icon-add-task-mobile.svg";

import {
  useAppStore,
  useBoardListShownStore,
  useEditTaskStore,
  useBoardStore,
  useColumnStore,
  useEditBoardStore,
  useSubtaskStore,
  useTaskStore,
} from "@/lib/zustand/AppStore";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import ToggleMobileBoardList from "@/components/header/ToggleMobileBoardList";
import { toast } from "react-hot-toast";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { GrEdit, GrTrash } from "react-icons/gr";
import { deleteBoard } from "@/lib/firebase/boardStore";

function EllipsisMenu() {
  const { isDarkMode } = useAppStore();
  const { boards, selectedBoard } = useBoardStore();
  const { columns } = useColumnStore();
  const { tasks } = useTaskStore();
  const { subtasks } = useSubtaskStore();

  const currentColumns = columns.filter(
    (column) => column.board === selectedBoard
  );
  const currentTasks = tasks.filter((task) =>
    currentColumns.some((column) => column.id === task.column)
  );
  const currentSubtasks = subtasks.filter((subtask) =>
    currentTasks.some((task) => task.id === subtask.task)
  );

  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button
            onClick={() =>
              !selectedBoard && toast.error("You need to create a board first!")
            }
          >
            <IconVerticalEllipsis />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className={`text-h-m absolute right-0 top-7 z-10 mt-2 flex w-max transform flex-col divide-y-[1px] divide-neutral-200 rounded-md border-[1px] border-neutral-200 bg-neutral-100 font-medium shadow-xl dark:divide-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 ${
                !selectedBoard && "hidden"
              }`}
            >
              {({ close }) => (
                <>
                  <button
                    className="flex items-center gap-2 px-6 py-3 text-neutral-950 hover:backdrop-brightness-90 dark:text-neutral-100"
                    onClick={() => {
                      boards.forEach((board) => {
                        if (board.id === selectedBoard) {
                          useEditBoardStore.setState({
                            isOpen: true,
                            id: board.id,
                            isNew: false,
                            name: board.name,
                            columns: columns.filter(
                              (column) => column.board === board.id
                            ),
                          });
                        }
                      });
                    }}
                  >
                    <GrEdit className={isDarkMode && "white-filter"} />
                    Edit Board
                  </button>
                  <button
                    className="flex items-center gap-2 px-6 py-3 text-[#FF0000] hover:backdrop-brightness-90"
                    onClick={async () => {
                      const isSuccessful = await deleteBoard(
                        selectedBoard,
                        currentColumns,
                        currentTasks,
                        currentSubtasks
                      );

                      if (isSuccessful) {
                        toast.success("Board deleted successfully!");
                        close();
                      } else {
                        toast.error("Something went wrong!");
                      }
                    }}
                  >
                    <GrTrash className="red-filter" />
                    Delete Board
                  </button>
                </>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export default function Header() {
  const boardListShown = useBoardListShownStore(
    (state) => state.boardListShown
  );
  const width = useWindowWidth();
  const { boards, selectedBoard } = useBoardStore();
  const { columns } = useColumnStore();

  const canCreateTask =
    selectedBoard &&
    columns.filter((column) => column.board === selectedBoard).length > 0;

  return (
    <div className="flex">
      <div
        className={`flex items-center border-b-[1px] border-neutral-200 bg-neutral-100 pl-4 dark:border-neutral-700 dark:bg-neutral-800 md:border-r-[1px] ${
          boardListShown ? "md:border-none md:px-0" : "md:px-6"
        }`}
      >
        <div className="md:hidden">
          <LogoMobile />
        </div>
        {!boardListShown && (
          <div className="hidden md:block">
            <div className="hidden dark:block">
              <LogoLight />
            </div>
            <div className="dark:hidden">
              <LogoDark />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-grow items-center gap-4 border-b-[1px] border-neutral-200 bg-neutral-100 px-4 py-5 dark:border-neutral-700 dark:bg-neutral-800 md:px-6">
        <div className="flex gap-2">
          <p className="text-h-l dark:text-neutral-100">
            {boards.find((board) => board.id === selectedBoard)?.name}
          </p>
          {width < 768 && <ToggleMobileBoardList />}
        </div>
        <button
          className="ml-auto flex items-center gap-1 rounded-3xl bg-primary-400 px-[18px] py-[10px]"
          onClick={() => {
            if (!canCreateTask) {
              toast.error("You need to create a column first!");
              return;
            }
            useEditTaskStore.setState({ isOpen: true });
          }}
        >
          <IconMobileAddTask />
          <span className="text-h-m hidden text-neutral-100 md:block">
            Add New Task
          </span>
        </button>
        <button>
          <EllipsisMenu />
        </button>
      </div>
    </div>
  );
}
