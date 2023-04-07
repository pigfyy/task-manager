import { ReactComponent as IconLight } from "@/assets/icons/icon-light-theme.svg";
import { ReactComponent as IconDark } from "@/assets/icons/icon-dark-theme.svg";

import { useState } from "react";

export default () => {
  const [isDark, setIsDark] = useState(false);

  const handleClick = () => {
    setIsDark((state) => !state);
  };

  return (
    <div className="flex gap-6">
      <IconLight />
      <button
        className="bg-primary-400 w-9 h-5 rounded-[200px] relative px-1"
        onClick={handleClick}
      >
        <div
          className={`bg-neutral-100 rounded-full w-3 h-3 absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
            !isDark ? "translate-x-0" : "translate-x-4"
          }`}
        ></div>
      </button>
      <IconDark />
    </div>
  );
};
