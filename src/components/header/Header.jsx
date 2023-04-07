import { ReactComponent as LogoMobile } from "@/assets/icons/logo-mobile.svg";
import { ReactComponent as IconChevronUp } from "@/assets/icons/icon-chevron-up.svg";
import { ReactComponent as IconChevronDown } from "@/assets/icons/icon-chevron-down.svg";
import { ReactComponent as IconMobileAddTask } from "@/assets/icons/icon-add-task-mobile.svg";
import { ReactComponent as IconVerticalEllipsis } from "@/assets/icons/icon-vertical-ellipsis.svg";

export default () => {
  return (
    <div className="w-full bg-neutral-100 flex items-center px-4 gap-4 py-5 dark:bg-neutral-800">
      <LogoMobile />
      <div className="flex gap-2 items-center">
        <p className="text-h-l dark:text-neutral-100">Platform Launch</p>
        <IconChevronDown />
      </div>
      <button className="rounded-3xl bg-primary-400 px-[18px] py-[10px] ml-auto">
        <IconMobileAddTask />
      </button>
      <button>
        <IconVerticalEllipsis />
      </button>
    </div>
  );
};
