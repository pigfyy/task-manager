import Dot from "./Dot";
import { useColumnStore } from "@/lib/zustand/AppStore";

export default function Board() {
  const columns = useColumnStore();

  return (
    <div className="flex flex-grow gap-6 overflow-scroll p-6">
      {Object.entries(columns).map(([key, value]) => {
        return (
          <div className="flex flex-col gap-6" key={key}>
            <div className="flex items-center gap-2">
              <Dot color="bg-[#49C4E5]" />
              <p className="text-s font-bold uppercase leading-s tracking-[2.4px] text-neutral-400">
                {value.name}
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex w-[280px] flex-col gap-2 rounded-lg bg-neutral-100 px-4 py-6 dark:bg-neutral-800">
                <p className="text-m font-bold leading-m text-neutral-950 dark:text-neutral-100">
                  Build UI for onboarding flow
                </p>
                <p className="text-s font-bold leading-s text-neutral-400">
                  0 of 3 subtasks
                </p>
              </div>
              <div className="flex w-[280px] flex-col gap-2 rounded-lg bg-neutral-100 px-4 py-6 dark:bg-neutral-800">
                <p className="text-m font-bold leading-m text-neutral-950 dark:text-neutral-100">
                  Build UI for onboarding flow
                </p>
                <p className="text-s font-bold leading-s text-neutral-400">
                  0 of 3 subtasks
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
