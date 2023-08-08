import {
  useBoardStore,
  useEditBoardStore,
  useColumnStore,
} from "@/lib/zustand/AppStore";
import { Dialog, Transition, Popover } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { ReactComponent as IconCross } from "@/assets/icons/icon-cross.svg";

import { editBoard } from "@/lib/firebase/boardStore";

export default function EditBoard() {
  const {
    isOpen,
    name,
    id,
    isNew,
    columns,
    setName,
    setColumns,
    addColumn,
    reset,
  } = useEditBoardStore();
  const selectedBoard = useBoardStore((state) => state.selectedBoard);
  const prevColumns = useColumnStore((state) => state.columns).filter(
    (column) => column.board === selectedBoard
  );
  const setSelectedBoard = useBoardStore((state) => state.setSelectedBoard);

  function closeModal() {
    useEditBoardStore.setState({ isOpen: false });
    reset();
  }

  useEffect(() => {
    if (isOpen && isNew) {
      useEditBoardStore.setState({ id: crypto.randomUUID() });
    }
    if (isOpen && columns.length === 0) {
      addColumn();
      addColumn();
    }
  }, [isOpen, isNew, addColumn, columns.length]);

  const handleSubmit = async () => {
    await editBoard(id, name, columns, prevColumns);
    setSelectedBoard(id || "");
    closeModal();
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          {/* overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-950 bg-opacity-25" />
          </Transition.Child>

          {/* content */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel>
                  <div className="flex w-[480px] max-w-[90vw] justify-center rounded-md bg-neutral-100 dark:bg-neutral-800">
                    <div className="flex w-5/6 flex-col gap-6 bg-neutral-100 py-8 dark:bg-neutral-800">
                      <p className="text-h-l dark:text-neutral-100">
                        {isNew ? "Create New Board" : "Edit Board"}
                      </p>
                      <div className="flex flex-col gap-2">
                        <p className="text-b-m text-neutral-400 dark:text-neutral-100">
                          Name
                        </p>
                        <input
                          type="text"
                          placeholder="e.g. Web Design"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          value={name}
                          className="text-b-l rounded-[4px] border-[1px] border-neutral-200 px-4 py-2 outline-none placeholder:text-[#BFBFC3] focus:border-primary-400 dark:border-[#404552] dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-primary-400"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-b-m text-neutral-400 dark:text-neutral-100">
                          Columns
                        </p>
                        <div className="flex w-full flex-col gap-4">
                          {columns.map((column, index) => {
                            return (
                              <div
                                className="flex items-center gap-2"
                                key={index}
                              >
                                <Popover className="relative">
                                  <Popover.Button
                                    style={{
                                      backgroundColor: column.color,
                                    }}
                                    className="my-auto flex aspect-square w-5 rounded-full border-[1px] border-neutral-400"
                                  ></Popover.Button>

                                  <Popover.Panel className="absolute z-10 my-3">
                                    <HexColorPicker
                                      color={column.color}
                                      onChange={(e) => {
                                        const value = e;
                                        const columnsCopy = [...columns];
                                        columnsCopy[index].color = value;
                                        setColumns(columnsCopy);
                                      }}
                                    />
                                  </Popover.Panel>
                                </Popover>
                                <input
                                  type="text"
                                  className="text-b-l w-full rounded-[4px] border-[1px] border-neutral-200 px-4 py-2 outline-none placeholder:text-[#BFBFC3] focus:border-primary-400 dark:border-[#404552] dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-primary-400"
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const columnsCopy = [...columns];
                                    columnsCopy[index].name = value;
                                    useEditBoardStore.setState({
                                      columns: columnsCopy,
                                    });
                                  }}
                                  value={column.name}
                                />
                                <button
                                  className="fill-primary-400 transition-all hover:fill-secondary-400"
                                  onClick={() => {
                                    const columnsCopy = [...columns];
                                    columnsCopy.splice(index, 1);
                                    setColumns(columnsCopy);
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
                            addColumn();
                          }}
                          className="mt-2 w-full rounded-[20px] px-2 py-2 text-center text-[13px] font-bold leading-l text-primary-400 hover:bg-[#d8d7f1] dark:hover:bg-neutral-100"
                        >
                          + Add New Column
                        </button>
                      </div>
                      <button
                        className="w-full rounded-[20px] bg-primary-400 px-2 py-2 text-[13px] font-bold leading-l text-neutral-100 hover:bg-primary-200"
                        onClick={handleSubmit}
                      >
                        {isNew ? "Create New Board" : "Save Changes"}
                      </button>
                    </div>
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
