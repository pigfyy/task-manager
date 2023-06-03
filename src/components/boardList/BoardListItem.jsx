import { ReactComponent as IconBoard } from "@/assets/icons/icon-board.svg";
import { useBoardStore } from "@/lib/zustand/AppStore";

export default function BoardListItem({ boardId }) {
  const [boards, selectedBoard] = useBoardStore((state) => [
    state.boards,
    state.selectedBoard,
  ]);

  const boardName = boards[boardId];
  const isSelected = selectedBoard === boardId;

  return (
    <li
      className={`group flex w-full cursor-pointer items-center gap-3 rounded-r-full py-[14px] pl-6 ${
        isSelected
          ? "bg-primary-400"
          : "hover:bg-neutral-150 hover:dark:bg-neutral-100"
      }`}
      onClick={() => useBoardStore.setState({ selectedBoard: boardId })}
    >
      <div>
        <div className={`${!isSelected && "group-hover:hidden"} block`}>
          <IconBoard fill={isSelected ? "white" : "#828FA3"} />
        </div>
        {!isSelected && (
          <div className="hidden group-hover:block">
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
