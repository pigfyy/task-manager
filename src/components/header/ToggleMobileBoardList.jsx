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
import { useBoardListShownStore } from "@/lib/zustand/AppStore";
import { ReactComponent as IconChevronUp } from "@/assets/icons/icon-chevron-up.svg";
import { ReactComponent as IconChevronDown } from "@/assets/icons/icon-chevron-down.svg";

export default function ToggleMobileBoardList() {
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
    <>
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
    </>
  );
}
