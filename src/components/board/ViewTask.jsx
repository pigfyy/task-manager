import { ReactComponent as IconVerticalEllipsis } from "@/assets/icons/icon-vertical-ellipsis.svg";
import { ReactComponent as IconCheck } from "@/assets/icons/icon-check.svg";
import { GrEdit, GrTrash } from "react-icons/gr";

import TextareaAutosize from "react-textarea-autosize";
import { Dialog, Transition, Popover } from "@headlessui/react";
import { Fragment } from "react";
import {
  useViewTaskStore,
  useEditTaskStore,
  useColumnStore,
  useBoardStore,
} from "@/lib/zustand/AppStore";
import { editTask, deleteTaskAndSubtasks } from "@/lib/firebase/boardStore";

function Checkmark({ isDone }) {
  return (
    <button
      className={`flex aspect-square h-4 w-4 items-center justify-center rounded-sm border-[1px] border-neutral-200 bg-neutral-100 ${
        isDone ? "border-none bg-primary-400" : ""
      }`}
    >
      <IconCheck className="text-neutral-100" />
    </button>
  );
}

function EllipsisMenu() {
  const { id, name, description, subtasks, column } = useViewTaskStore();

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button>
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
            <Popover.Panel className="absolute right-0 z-10 mt-2 flex w-fit transform flex-col divide-y-[1px] divide-neutral-200 rounded-md border-[1px] border-neutral-200 bg-neutral-100 shadow-xl">
              <button
                onClick={() => {
                  useViewTaskStore.setState({ isOpen: false });
                  useEditTaskStore.setState({
                    isOpen: true,
                    isNew: false,
                    id: id,
                    name: name,
                    description: description,
                    subtasks: subtasks,
                    column: column,
                  });
                }}
                className="text-b-l flex items-center gap-1 px-3 py-1 text-neutral-950 hover:backdrop-brightness-90"
              >
                <GrEdit />
                Edit
              </button>
              <button
                className="text-b-l flex items-center gap-1 px-3 py-1 text-[#FF0000] hover:backdrop-brightness-90"
                onClick={() => {
                  deleteTaskAndSubtasks(id, subtasks);
                  useViewTaskStore.setState({ isOpen: false });
                }}
              >
                <GrTrash className="red-filter" />
                Delete
              </button>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

function ViewTask() {
  const { id, name, description, subtasks, column } = useViewTaskStore();
  const { columns } = useColumnStore();
  const { selectedBoard } = useBoardStore();

  const filteredColumns = columns.filter(
    (column) => column.board === selectedBoard
  );

  return (
    <div className="flex w-full flex-col gap-6 p-6">
      <div className="flex gap-4">
        <TextareaAutosize
          className="text-h-l w-full resize-none text-neutral-950 outline-none dark:bg-neutral-800 dark:text-neutral-100"
          defaultValue={name}
          maxRows={4}
          spellCheck={false}
        />
        <EllipsisMenu />
      </div>
      {description && (
        <TextareaAutosize
          className="text-b-l w-full resize-none text-neutral-400 outline-none dark:bg-neutral-800 dark:text-neutral-100"
          defaultValue={description}
          maxRows={6}
          spellCheck={false}
        />
      )}
      {subtasks.length > 0 && (
        <div className="flex flex-col gap-4">
          <p className="text-s font-bold leading-s text-neutral-400">
            Subtasks{" "}
            {`(${
              subtasks.filter((subtask) => subtask.isDone === true).length
            } of ${subtasks.length})`}
          </p>
          <div className="flex flex-col gap-2">
            {subtasks.map((subtask, i) => (
              <div
                className="flex cursor-pointer items-center gap-4 rounded-md bg-neutral-150 px-2 py-3 text-s font-bold text-neutral-950"
                key={subtask.id}
                onClick={() => {
                  let subtasksCopy = [...subtasks];
                  subtasksCopy[i].isDone = !subtasksCopy[i].isDone;
                  useViewTaskStore.setState({ subtasks: subtasksCopy });
                  editTask(id, name, description, subtasksCopy, column);
                }}
              >
                <Checkmark isDone={subtask.isDone} />
                <p>{subtask.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <p className="text-s font-bold leading-s text-neutral-400">
          Current Status
        </p>
        <select
          className="text-b-l w-full appearance-none rounded-[4px] border-[1px] border-neutral-200 bg-neutral-100 bg-[url('/icon-chevron-down.svg')] bg-right bg-no-repeat bg-origin-content px-4 py-2 outline-none placeholder:text-[#BFBFC3] focus:border-primary-400 dark:border-[#404552] dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-primary-400"
          onChange={(e) => {
            useViewTaskStore.setState({ column: e.target.value });
          }}
          value={column}
        >
          {filteredColumns.map((column) => (
            <option key={column.id} value={column.id}>
              {column.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function Wrapper() {
  const { isOpen, reset } = useViewTaskStore();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={reset}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-950 bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex w-[480px] max-w-[90vw] justify-center rounded-md bg-neutral-100 text-left dark:bg-neutral-800">
                <ViewTask />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
