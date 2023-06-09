import { ReactComponent as LogoMobile } from "@/assets/icons/logo-mobile.svg";
import { ReactComponent as IconVerticalEllipsis } from "@/assets/icons/icon-vertical-ellipsis.svg";
import { ReactComponent as LogoDark } from "@/assets/icons/logo-dark.svg";
import { ReactComponent as LogoLight } from "@/assets/icons/logo-light.svg";
import { ReactComponent as IconMobileAddTask } from "@/assets/icons/icon-add-task-mobile.svg";

import {
  useBoardListShownStore,
  useEditTaskStore,
  useBoardStore,
  useColumnStore,
} from "@/lib/zustand/AppStore";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import ToggleMobileBoardList from "@/components/header/ToggleMobileBoardList";
import { toast } from "react-hot-toast";

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
          <IconVerticalEllipsis />
        </button>
      </div>
    </div>
  );
}
