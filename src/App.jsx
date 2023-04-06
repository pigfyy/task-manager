import { ReactComponent as IconBoard } from "../public/icon-board.svg";
import { ReactComponent as IconLight } from "../public/icon-light-theme.svg";
import { ReactComponent as IconDark } from "../public/icon-dark-theme.svg";

function SidebarItem({ boardName, isSelected }) {
  return (
    <li
      className={`flex items-center gap-3 pl-6 w-full py-[14px] rounded-r-full cursor-pointer group ${
        isSelected && "bg-primary-400"
      }`}
    >
      <div>
        <div className={`${!isSelected && "group-hover:hidden"} block`}>
          <IconBoard fill={isSelected ? "white" : "#828FA3"} />
        </div>
        {!isSelected && (
          <div className="group-hover:block hidden">
            <IconBoard fill={"#635FC7"} />
          </div>
        )}
      </div>
      <p
        className={`${
          isSelected
            ? "text-neutral-100"
            : "text-neutral-400 group-hover:text-primary-400"
        } text-h-m pr-16`}
      >
        {boardName}
      </p>
    </li>
  );
}

function Sidebar() {
  const boards = ["Platform Launch", "Marketing Plan", "Roadmap"];
  const selected = "Marketing Plan";

  return (
    <div className="bg-neutral-100 rounded-lg pr-6 py-4 gap-5 flex flex-col max-w-[300px]">
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
        <li className="flex items-center gap-3 pl-6 w-full py-[14px] rounded-r-full cursor-pointer">
          <IconBoard fill="#635FC7" />
          <p className="text-primary-400 text-h-m">+ Create New Board</p>
        </li>
        {/* <div className="bg-primary-400 flex items-center gap-3 pl-6 w-full py-[14px] rounded-r-full">
          <div>
            <IconBoard fill="white" />
          </div>
          <p className="text-neutral-100 text-h-m pr-16">Platform Launch</p>
        </div> */}
      </ul>
      <div className="flex flex-col gap-2">
        <div className="rounded-md flex justify-center bg-neutral-150 w-full mx-4 py-[14px]">
          <div className="flex gap-6">
            <IconLight />
            <div className="bg-primary-400 w-10 h-5 rounded-[200px] flex flex-col justify-center px-1">
              <div className="bg-neutral-100 rounded-full w-3 h-3 self-end"></div>
            </div>
            <IconDark />
          </div>
        </div>
        <button className="text-[#FF0000] rounded-md w-full hover:bg-[#ffe3e3] mx-4 py-[14px]">
          Logout
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex w-screen h-screen justify-center items-center bg-neutral-400">
      <Sidebar />
    </div>
  );
}
