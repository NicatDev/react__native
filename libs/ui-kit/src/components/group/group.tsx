import { type FC, type PropsWithChildren } from "react";

import { cn } from "@/utils";

import { GroupProps } from "./group.types";

export const Group: FC<PropsWithChildren<GroupProps>> = ({ children, ...props }) => {
  return (
    <div {...props} className={cn(props.className, "group flex")}>
      {children}
    </div>
  );
};
