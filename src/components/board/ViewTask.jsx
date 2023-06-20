import { ReactComponent as IconVerticalEllipsis } from "@/assets/icons/icon-vertical-ellipsis.svg";
import { ReactComponent as IconCheck } from "@/assets/icons/icon-check.svg";
// import TextareaAutosize from "react-textarea-autosize";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  useViewTaskStore,
  useColumnStore,
  useBoardStore,
} from "@/lib/zustand/AppStore";

function ViewTask() {
  const { id, name, description, subtasks, column } = useViewTaskStore();
  const { columns } = useColumnStore();
  const { selectedBoard } = useBoardStore();

  const filteredColumns = columns.filter(
    (column) => column.board === selectedBoard
  );

  return (
    <div className="flex w-full flex-col gap-6 p-6">
      <div className="flex">
        {/* <TextareaAutosize value={name} /> */}
        <button>
          <IconVerticalEllipsis />
        </button>
      </div>
      <p>{description}</p>
      <div>
        <p>
          Subtasks{" "}
          {`(${
            subtasks.filter((subtask) => subtask.isDone === true).length
          } of ${subtasks.length})`}
        </p>
        {subtasks.map((subtask) => (
          <div className="flex" key={subtask.id}>
            <input type="checkbox" name="" id="" />
            <p>{subtask.name}</p>
          </div>
        ))}
      </div>
      <div>
        <p>Current Status</p>
        <select>
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