import { ReactComponent as IconBoard } from "@/assets/icons/icon-board.svg";

import SidebarItem from "@/components/sidebar/SidebarItem";
import ThemeSwitcher from "@/components/sidebar/ThemeSwitcher";

export default () => {
  const boards = ["Platform Launch", "Marketing Plan", "Roadmap"];
  const selected = "Marketing Plan";

  return (
    <div className="bg-neutral-100 rounded-lg pr-6 py-4 gap-5 flex flex-col max-w-[300px] drop-shadow-[0_10px_20px_rgba(54,78,126,0.25)] dark:bg-neutral-800">
      <p className="text-h-s uppercase text-neutral-400 pl-6">All Boards (3)</p>
      <ul>
        {boards.map((board) => {
          return (
            <SidebarItem
              boardName={board}
              isSelected={board === selected}
              key={crypto.randomUUID()}
            />
          );
        })}
        <li className="flex items-center gap-3 pl-6 w-full py-[14px] rounded-r-full cursor-pointer hover:bg-neutral-150">
          <IconBoard fill="#635FC7" />
          <p className="text-primary-400 text-h-m">+ Create New Board</p>
        </li>
      </ul>
      <div className="flex flex-col gap-2">
        <div className="rounded-md flex justify-center bg-neutral-150 w-full mx-4 py-[14px] dark:bg-neutral-900">
          <ThemeSwitcher />
        </div>
        <button className="text-[#FF0000] rounded-md w-full hover:bg-[#ffe3e3] hover:dark:bg-[#291313] mx-4 py-[14px]">
          Logout
        </button>
      </div>
    </div>
  );
};
