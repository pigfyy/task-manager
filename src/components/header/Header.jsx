import { ReactComponent as LogoMobile } from "@/assets/icons/logo-mobile.svg";
import { ReactComponent as IconChevronUp } from "@/assets/icons/icon-chevron-up.svg";
import { ReactComponent as IconChevronDown } from "@/assets/icons/icon-chevron-down.svg";
import { ReactComponent as IconMobileAddTask } from "@/assets/icons/icon-add-task-mobile.svg";
import { ReactComponent as IconVerticalEllipsis } from "@/assets/icons/icon-vertical-ellipsis.svg";
import { ReactComponent as LogoDark } from "@/assets/icons/logo-dark.svg";
import { ReactComponent as LogoLight } from "@/assets/icons/logo-light.svg";

import BoardList from "@/components/boardList/BoardList";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
} from "@floating-ui/react";
import { useBoardListShownStore } from "@/assets/zustand/AppStore";

export default () => {
  const [boardListShown, setBoardListShown] = useBoardListShownStore(
    (state) => [state.boardListShown, state.setBoardListShown]
  );

  const { refs, floatingStyles, context } = useFloating({
    open: boardListShown,
    onOpenChange: setBoardListShown,
    middleware: [offset(45), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <div className="flex">
      <div className="flex items-center bg-neutral-100 pl-4 dark:bg-neutral-800 md:border-r-[1px] md:border-r-neutral-700 md:px-6">
        <div className="md:hidden">
          <LogoMobile />
        </div>
        {!boardListShown && (
          <div className="hidden md:block">
            <div>
              <LogoLight />
            </div>
            <div>
              <LogoDark />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-grow items-center gap-4 bg-neutral-100 px-4 py-5 dark:bg-neutral-800 md:px-6">
        <div className="flex gap-2">
          <p className="text-h-l dark:text-neutral-100">Platform Launch</p>
          <button
            className="block md:hidden"
            ref={refs.setReference}
            {...getReferenceProps()}
          >
            {boardListShown ? <IconChevronUp /> : <IconChevronDown />}
          </button>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className="block md:hidden"
            >
              {boardListShown && <BoardList />}
            </div>
          </FloatingFocusManager>
        </div>
        <button className="ml-auto rounded-3xl bg-primary-400 px-[18px] py-[10px]">
          <IconMobileAddTask />
        </button>
        <button>
          <IconVerticalEllipsis />
        </button>
      </div>
    </div>
  );
};
