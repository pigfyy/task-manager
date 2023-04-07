import { ReactComponent as IconBoard } from "@/assets/icons/icon-board.svg";

export default ({ boardName, isSelected }) => {
  return (
    <li
      className={`flex items-center gap-3 pl-6 w-full py-[14px] rounded-r-full cursor-pointer group ${
        isSelected ? "bg-primary-400" : "hover:dark:bg-neutral-100"
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
};
