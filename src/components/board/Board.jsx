import Dot from "./Dot";
import {
  useColumnStore,
  useEditBoardStore,
  useBoardStore,
} from "@/lib/zustand/AppStore";

export default function Board() {
  const { columns } = useColumnStore();
  const [boards, selectedBoard] = useBoardStore((state) => [
    state.boards,
    state.selectedBoard,
  ]);

  return (
    <div className="flex flex-grow gap-6 overflow-auto p-6">
      {!columns.length && (
        <div className="flex flex-grow flex-col items-center justify-center gap-8">
          <p className="text-h-l text-neutral-400">
            This board is empty. Create a column to get started
          </p>
          <button
            onClick={() => {
              boards.forEach((board) => {
                if (board.id === selectedBoard) {
                  useEditBoardStore.setState({
                    isOpen: true,
                    id: board.id,
                    isNew: false,
                    name: board.name,
                  });
                }
              });
            }}
            className="mt-2 rounded-[20px] bg-primary-400 px-4 py-2 text-center text-[13px] font-bold leading-l text-neutral-100 hover:bg-primary-200"
          >
            + Add New Column
          </button>
        </div>
      )}
      {columns.length &&
        Object.entries(columns).map(([key, value]) => {
          return (
            <div className="flex flex-col gap-6" key={key}>
              <div className="flex items-center gap-2">
                <Dot color={value.color} />
                <p className="text-s font-bold uppercase leading-s tracking-[2.4px] text-neutral-400">
                  {value.name}
                </p>
              </div>
              <div className="flex flex-col gap-5"></div>
            </div>
          );
        })}
    </div>
  );
}

const temp = (
  <div className="flex w-[280px] flex-col gap-2 rounded-lg bg-neutral-100 px-4 py-6 dark:bg-neutral-800">
    <p className="text-m font-bold leading-m text-neutral-950 dark:text-neutral-100">
      Build UI for onboarding flow
    </p>
    <p className="text-s font-bold leading-s text-neutral-400">
      0 of 3 subtasks
    </p>
  </div>
);
