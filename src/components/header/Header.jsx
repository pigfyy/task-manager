import { ReactComponent as LogoMobile } from "@/assets/icons/logo-mobile.svg";
import { ReactComponent as IconVerticalEllipsis } from "@/assets/icons/icon-vertical-ellipsis.svg";
import { ReactComponent as LogoDark } from "@/assets/icons/logo-dark.svg";
import { ReactComponent as LogoLight } from "@/assets/icons/logo-light.svg";

import { useBoardListShownStore } from "@/lib/zustand/AppStore";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import ToggleMobileBoardList from "@/components/header/ToggleMobileBoardList";
import EditTask from "@/components/header/EditTask";

export default function Header() {
  const boardListShown = useBoardListShownStore(
    (state) => state.boardListShown
  );
  const width = useWindowWidth();

  return (
    <div className="flex">
      <div
        className={`flex items-center border-b-[1px] border-neutral-200 bg-neutral-100 pl-4 dark:border-neutral-700 dark:bg-neutral-800 md:border-r-[1px] ${
          boardListShown ? "md:border-none md:px-0" : "md:px-6"
        }`}
      >
        <div className="md:hidden">
          <LogoMobile />
        </div>
        {!boardListShown && (
          <div className="hidden md:block">
            <div className="hidden dark:block">
              <LogoLight />
            </div>
            <div className="dark:hidden">
              <LogoDark />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-grow items-center gap-4 border-b-[1px] border-neutral-200 bg-neutral-100 px-4 py-5 dark:border-neutral-700 dark:bg-neutral-800 md:px-6">
        <div className="flex gap-2">
          <p className="text-h-l dark:text-neutral-100">Platform Launch</p>
          {width < 768 && <ToggleMobileBoardList />}
        </div>
        <EditTask />
        <button>
          <IconVerticalEllipsis />
        </button>
      </div>
    </div>
  );
}
