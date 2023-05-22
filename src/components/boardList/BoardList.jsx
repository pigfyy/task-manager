import { ReactComponent as IconBoard } from "@/assets/icons/icon-board.svg";
import { ReactComponent as IconHideSidebar } from "@/assets/icons/icon-hide-sidebar.svg";
import { BiLogOut } from "react-icons/bi";

import BoardListItem from "@/components/boardList/BoardListItem";
import ThemeSwitcher from "@/components/boardList/ThemeSwitcher";
import {
  useBoardStore,
  useBoardListShownStore,
} from "@/assets/zustand/AppStore";

export default () => {
  const boards = useBoardStore((state) => state.boards);

  return (
    <div className="flex flex-grow flex-col justify-between gap-5 rounded-lg bg-neutral-100 py-4 pr-8 drop-shadow-[0_10px_20px_rgba(54,78,126,0.25)] dark:bg-neutral-800 md:rounded-none md:drop-shadow-none">
      <div className="flex flex-col gap-3">
        <p className="text-h-s pl-6 uppercase text-neutral-400">
          All Boards (3)
        </p>
        <ul>
          {Object.entries(boards).map(([boardId]) => (
            <BoardListItem key={boardId} boardId={boardId} />
          ))}
          <li className="flex w-full cursor-pointer items-center gap-3 rounded-r-full py-[14px] pl-6 hover:bg-neutral-150">
            <IconBoard fill="#635FC7" />
            <p className="text-h-m text-primary-400">+ Create New Board</p>
          </li>
        </ul>
      </div>
      <div className="flex flex-col">
        <div className="mx-4 mb-3 flex w-full justify-center rounded-md bg-neutral-150 py-[14px] dark:bg-neutral-900">
          <ThemeSwitcher />
        </div>
        <button
          className="group flex w-full cursor-pointer items-center gap-3 rounded-r-full py-[14px] pl-6 hover:bg-neutral-150 hover:dark:bg-neutral-100"
          onClick={() => {
            useBoardListShownStore.setState((state) => ({
              boardListShown: false,
            }));
          }}
        >
          <div>
            <div className="group-hover:hidden">
              <IconHideSidebar fill={"#828FA3"} />
            </div>
            <div className="hidden group-hover:block">
              <IconHideSidebar fill={"#635FC7"} />
            </div>
          </div>
          <p className="text-h-m pr-16 text-neutral-400 group-hover:text-primary-400">
            Hide Sidebar
          </p>
        </button>
        <button className="group flex w-full cursor-pointer items-center gap-3 rounded-r-full py-[14px] pl-6 hover:bg-[#fcd2d2] hover:dark:bg-[#fcd2d2]">
          <div>
            <div className="group-hover:hidden">
              <BiLogOut fill={"#FF0000"} />
            </div>
            <div className="hidden group-hover:block">
              <BiLogOut fill={"#8b0000"} />
            </div>
          </div>
          <p className="text-h-m pr-16 text-[#FF0000] group-hover:text-[#8b0000]">
            Logout
          </p>
        </button>
      </div>
    </div>
  );
};
