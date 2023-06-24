import { ReactComponent as IconMobileAddTask } from "@/assets/icons/icon-add-task-mobile.svg";
import { ReactComponent as IconCross } from "@/assets/icons/icon-cross.svg";

import {
  useEditTaskStore,
  useColumnStore,
  useBoardStore,
} from "@/lib/zustand/AppStore";
import { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { editTask } from "@/lib/firebase/boardStore";

export default function EditTask() {
  const [
    id,
    isOpen,
    isNew,
    name,
    description,
    subtasks,
    column,
    reset,
    addSubtask,
  ] = useEditTaskStore((state) => [
    state.id,
    state.isOpen,
    state.isNew,
    state.name,
    state.description,
    state.subtasks,
    state.column,
    state.reset,
    state.addSubtask,
  ]);
  const { columns } = useColumnStore();
  const { selectedBoard } = useBoardStore();

  const filteredColumns = columns.filter(
    (column) => column.board === selectedBoard
  );

  useEffect(() => {
    if (isNew && isOpen) {
      useEditTaskStore.setState({ id: crypto.randomUUID() });
    }
  }, [isNew, isOpen]);

  useEffect(() => {
    if (!column && isNew && isOpen) {
      useEditTaskStore.setState({ column: filteredColumns[0].id });
    }
  }, [filteredColumns, isNew, isOpen, column]);

  return (
    <>
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
                  <div className="flex w-5/6 flex-col gap-6 bg-neutral-100 py-8 dark:bg-neutral-800">
                    <Dialog.Title
                      as="p"
                      className="text-h-l text-neutral-950 dark:text-neutral-100"
                    >
                      {isNew ? "Add New Task" : "Edit Task"}
                    </Dialog.Title>
                    <div className="flex flex-col gap-2">
                      <p className="text-b-m text-neutral-400 dark:text-neutral-100">
                        Name
                      </p>
                      <input
                        type="text"
                        placeholder="e.g. Take coffee break"
                        className="text-b-l rounded-[4px] border-[1px] border-neutral-200 px-4 py-2 outline-none placeholder:text-[#BFBFC3] focus:border-primary-400 dark:border-[#404552] dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-primary-400"
                        onChange={(e) =>
                          useEditTaskStore.setState({ name: e.target.value })
                        }
                        value={name}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-b-m text-neutral-400 dark:text-neutral-100">
                        Description
                      </p>
                      <textarea
                        rows="3"
                        placeholder="e.g. It's always good  to take a break. This 15 minute break will recharge the batteries a little"
                        className="text-b-l resize-none rounded-[4px] border-[1px] border-neutral-200 px-4 py-2 outline-none placeholder:text-[#BFBFC3] focus:border-primary-400 dark:border-[#404552] dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-primary-400"
                        onChange={(e) =>
                          useEditTaskStore.setState({
                            description: e.target.value,
                          })
                        }
                        value={description}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-b-m text-neutral-400 dark:text-neutral-100">
                        Subtasks
                      </p>
                      <div className="flex w-full flex-col gap-4">
                        {subtasks.map((subtask, index) => {
                          return (
                            <div
                              className="flex items-center gap-2"
                              key={index}
                            >
                              <input
                                type="text"
                                className="text-b-l w-full rounded-[4px] border-[1px] border-neutral-200 px-4 py-2 outline-none placeholder:text-[#BFBFC3] focus:border-primary-400 dark:border-[#404552] dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-primary-400"
                                onChange={(e) => {
                                  const value = e.target.value;
                                  let subtasksCopy = [...subtasks];
                                  subtasksCopy[index] = {
                                    ...subtasksCopy[index],
                                    name: value,
                                  };

                                  useEditTaskStore.setState({
                                    subtasks: subtasksCopy,
                                  });
                                }}
                                value={subtask.name}
                              />
                              <button
                                className="fill-primary-400 transition-all hover:fill-secondary-400"
                                onClick={() => {
                                  const subtasksCopy = [...subtasks];
                                  subtasksCopy.splice(index, 1);
                                  useEditTaskStore.setState({
                                    subtasks: subtasksCopy,
                                  });
                                }}
                              >
                                <IconCross />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      <button
                        onClick={() => {
                          addSubtask();
                        }}
                        className="mt-2 w-full rounded-[20px] px-2 py-2 text-center text-[13px] font-bold leading-l text-primary-400 hover:bg-[#d8d7f1] dark:hover:bg-neutral-100"
                      >
                        + Add New Subtask
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-b-m text-neutral-400 dark:text-neutral-100">
                        Status
                      </p>
                      <select
                        onChange={(e) => {
                          useEditTaskStore.setState({ column: e.target.value });
                        }}
                        value={column}
                        className="text-b-l w-full appearance-none rounded-[4px] border-[1px] border-neutral-200 bg-neutral-100 bg-[url('/icon-chevron-down.svg')] bg-right bg-no-repeat bg-origin-content px-4 py-2 outline-none placeholder:text-[#BFBFC3] focus:border-primary-400 dark:border-[#404552] dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-primary-400"
                      >
                        {filteredColumns.length > 0 &&
                          filteredColumns.map((column) => {
                            return (
                              <option key={column.id} value={column.id}>
                                {column.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <button
                      className="w-full rounded-[20px] bg-primary-400 px-2 py-2 text-[13px] font-bold leading-l text-neutral-100 hover:bg-primary-200"
                      onClick={() => {
                        editTask(id, name, description, subtasks, column);
                        reset();
                      }}
                    >
                      {isNew ? "Create Task" : "Save Changes"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
