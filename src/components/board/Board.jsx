import Dot from "./Dot";
import {
  useColumnStore,
  useEditBoardStore,
  useBoardStore,
  useTaskStore,
  useSubtaskStore,
  useViewTaskStore,
} from "@/lib/zustand/AppStore";

export default function Board() {
  const { columns } = useColumnStore();
  const [boards, selectedBoard] = useBoardStore((state) => [
    state.boards,
    state.selectedBoard,
  ]);
  const { tasks } = useTaskStore();
  const { subtasks } = useSubtaskStore();

  const filteredColumns = columns.filter(
    (column) => column.board === selectedBoard
  );

  return (
    <div className="flex flex-grow gap-6 overflow-auto p-6">
      {!filteredColumns.length && (
        <div className="flex flex-grow flex-col items-center justify-center gap-8">
          <p className="text-h-l text-center text-neutral-400">
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
      {filteredColumns.length > 0 &&
        Object.entries(filteredColumns).map(([key, value]) => {
          return (
            <div
              className="flex w-[280px] flex-shrink-0 flex-col gap-6"
              key={key}
            >
              <div className="flex items-center gap-2">
                <Dot color={value.color} />
                <p className="text-s font-bold uppercase leading-s tracking-[2.4px] text-neutral-400">
                  {value.name}
                </p>
              </div>
              <div className="flex flex-col gap-5">
                {tasks
                  .filter((task) => task.column === value.id)
                  .map((task) => (
                    <button
                      className="flex w-[280px] flex-col gap-2 rounded-lg bg-neutral-100 px-4 py-6 text-left dark:bg-neutral-800"
                      key={crypto.randomUUID()}
                      onClick={() =>
                        useViewTaskStore.setState({
                          isOpen: true,
                          id: task.id,
                          name: task.name,
                          description: task.description,
                          column: task.column,
                          subtasks: subtasks.filter(
                            (subtask) => subtask.task === task.id
                          ),
                        })
                      }
                    >
                      <p className="text-m font-bold leading-m text-neutral-950 dark:text-neutral-100">
                        {task.name}
                      </p>
                      <p className="text-s font-bold leading-s text-neutral-400">
                        {
                          subtasks.filter(
                            (subtask) =>
                              subtask.task === task.id &&
                              subtask.isDone === true
                          ).length
                        }{" "}
                        of{" "}
                        {
                          subtasks.filter((subtask) => subtask.task === task.id)
                            .length
                        }{" "}
                        subtasks
                      </p>
                    </button>
                  ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}
