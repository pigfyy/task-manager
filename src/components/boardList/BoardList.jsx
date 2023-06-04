import { ReactComponent as IconBoard } from "@/assets/icons/icon-board.svg";
import { ReactComponent as IconHideSidebar } from "@/assets/icons/icon-hide-sidebar.svg";
import { BiLogOut } from "react-icons/bi";

import BoardListItem from "@/components/boardList/BoardListItem";
import ThemeSwitcher from "@/components/boardList/ThemeSwitcher";
import { useBoardStore, useBoardListShownStore } from "@/lib/zustand/AppStore";
import Popup from "reactjs-popup";

import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/index";
import { createBoard } from "@/lib/firebase/boardStore";

// temp imports
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

// const CreateBoard = () => {
//   const [boardListShown, setBoardListShown] = useBoardListShownStore(
//     (state) => [state.boardListShown, state.setBoardListShown]
//   );

//   const handleCreateBoard = () => {
//     const data = {
//       name: "Test Board",
//       columns: [
//         { name: "Todo", color: "#37D67A", position: 1 },
//         { name: "Doing", color: "#F47373", position: 2 },
//         { name: "Done", color: "#2CCCE4", position: 3 },
//       ],
//     };

//     createBoard(data);
//   };

//   const overlayStyle = { background: "rgba(0,0,0,0.5)" };
//   const contentStyle = {
//     width: "90%",
//     maxWidth: "480px",
//   };

//   return (
//     <>
//       <Popup
//         trigger={
//           <button onClick={() => {console.log("test")}} className="flex w-full cursor-pointer items-center gap-3 rounded-r-full py-[14px] pl-6 hover:bg-neutral-150">
//             <IconBoard fill="#635FC7" />
//             <p className="text-h-m text-primary-400">+ Create New Board</p>
//           </button>
//         }
//         {...{
//           overlayStyle,
//           contentStyle,
//         }}
//         modal
//       >
//         {(close) => (
//           <div className="flex w-full justify-center rounded-md bg-neutral-100">
//             <div className="flex w-5/6 flex-col gap-6 bg-neutral-100 py-8">
//               <p className="text-h-l">Add New Board</p>
//               <div className="flex flex-col gap-2">
//                 <p className="text-b-m text-neutral-400">Name</p>
//                 <input
//                   type="text"
//                   placeholder="e.g. Web Design"
//                   className="text-b-l rounded-[4px] border-[1px] border-neutral-200 px-4 py-2 placeholder:text-[#BFBFC3]"
//                 />
//               </div>
//               <div className="flex flex-col gap-2">
//                 <p className="text-b-m text-neutral-400">Columns</p>
//                 <div className="flex w-full flex-col gap-4">
//                   <input
//                     type="text"
//                     className="text-b-l rounded-[4px] border-[1px] border-neutral-200 px-4 py-2 placeholder:text-[#BFBFC3]"
//                   />
//                   <input
//                     type="text"
//                     className="text-b-l rounded-[4px] border-[1px] border-neutral-200 px-4 py-2 placeholder:text-[#BFBFC3]"
//                   />
//                 </div>
//                 <button className="mt-2 w-full rounded-[20px] px-2 py-2 text-center text-[13px] font-bold leading-l text-primary-400 hover:bg-primary-200 hover:text-neutral-100">
//                   + Add New Column
//                 </button>
//               </div>
//               <button className="w-full rounded-[20px] bg-primary-400 px-2 py-2 text-[13px] font-bold leading-l text-neutral-100">
//                 Create New Board
//               </button>
//             </div>
//           </div>
//         )}
//       </Popup>
//     </>
//   );
// };

const CreateBoard = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        onClick={openModal}
        className="flex w-full cursor-pointer items-center gap-3 rounded-r-full py-[14px] pl-6 hover:bg-neutral-150"
      >
        <IconBoard fill="#635FC7" />
        <p className="text-h-m text-primary-400">+ Create New Board</p>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                  <div className="flex w-[480px] max-w-[80vw] justify-center rounded-md bg-neutral-100 text-left dark:bg-neutral-800">
                    <div className="flex w-5/6 flex-col gap-6 bg-neutral-100 py-8 dark:bg-neutral-800">
                      <p className="text-h-l dark:text-neutral-100">
                        Add New Board
                      </p>
                      <div className="flex flex-col gap-2">
                        <p className="text-b-m text-neutral-400 dark:text-neutral-100">
                          Name
                        </p>
                        <input
                          type="text"
                          placeholder="e.g. Web Design"
                          className="text-b-l rounded-[4px] border-[1px] border-neutral-200 px-4 py-2 outline-none placeholder:text-[#BFBFC3] focus:border-primary-400 dark:border-[#404552] dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-primary-400"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-b-m text-neutral-400 dark:text-neutral-100">
                          Columns
                        </p>
                        <div className="flex w-full flex-col gap-4">
                          <input
                            type="text"
                            className="text-b-l rounded-[4px] border-[1px] border-neutral-200 px-4 py-2 outline-none placeholder:text-[#BFBFC3] focus:border-primary-400 dark:border-[#404552] dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-primary-400"
                          />
                          <input
                            type="text"
                            className="text-b-l rounded-[4px] border-[1px] border-neutral-200 px-4 py-2 outline-none placeholder:text-[#BFBFC3] focus:border-primary-400 dark:border-[#404552] dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-primary-400"
                          />
                        </div>
                        <button className="mt-2 w-full rounded-[20px] px-2 py-2 text-center text-[13px] font-bold leading-l text-primary-400 hover:bg-neutral-100">
                          + Add New Column
                        </button>
                      </div>
                      <button className="w-full rounded-[20px] bg-primary-400 px-2 py-2 text-[13px] font-bold leading-l text-neutral-100 hover:bg-primary-200">
                        Create New Board
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
};

export default function BoardList() {
  const [signOut, loading, error] = useSignOut(auth);

  const boards = useBoardStore((state) => state.boards);

  return (
    <div className="flex flex-grow flex-col justify-between gap-5 rounded-lg bg-neutral-100 py-4 pr-8 drop-shadow-[0_10px_20px_rgba(54,78,126,0.25)] dark:bg-neutral-800 md:rounded-none md:drop-shadow-none">
      <div className="flex flex-col gap-3">
        <p className="text-h-s pl-6 uppercase text-neutral-400">
          All Boards (3)
        </p>
        <div>
          <ul>
            {Object.entries(boards).map(([boardId]) => (
              <BoardListItem key={boardId} boardId={boardId} />
            ))}
          </ul>
          <CreateBoard />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mx-4 mb-3 flex w-full justify-center rounded-md bg-neutral-150 py-[14px] dark:bg-neutral-900">
          <ThemeSwitcher />
        </div>
        <button
          className="group hidden w-full cursor-pointer items-center gap-3 rounded-r-full py-[14px] pl-6 hover:bg-neutral-150 hover:dark:bg-neutral-100 md:flex"
          onClick={() => {
            useBoardListShownStore.setState((state) => ({
              boardListShown: false,
            }));
          }}
        >
          <div>
            <div className="group-hover:hidden">
              <IconHideSidebar fill={"#828FA3"} />
            </div>
            <div className="hidden group-hover:block">
              <IconHideSidebar fill={"#635FC7"} />
            </div>
          </div>
          <p className="text-h-m pr-16 text-neutral-400 group-hover:text-primary-400">
            Hide Sidebar
          </p>
        </button>
        <button
          className="group flex w-full cursor-pointer items-center gap-3 rounded-r-full py-[14px] pl-6 hover:bg-[#fcd2d2] hover:dark:bg-[#fcd2d2]"
          onClick={signOut}
        >
          <div>
            <div className="group-hover:hidden">
              <BiLogOut fill={"#FF0000"} />
            </div>
            <div className="hidden group-hover:block">
              <BiLogOut fill={"#8b0000"} />
            </div>
          </div>
          <p className="text-h-m pr-16 text-[#FF0000] group-hover:text-[#8b0000]">
            Logout
          </p>
        </button>
      </div>
    </div>
  );
}
