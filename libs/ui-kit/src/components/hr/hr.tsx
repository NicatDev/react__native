import { FC, PropsWithChildren } from "react";

import { cn } from "@/utils";

import { HrProps } from "./hr.types";

export const Hr: FC<PropsWithChildren<HrProps>> = ({ label, children, dangerouslySetInnerHTML, ...props }) => {
  return (
    <div style={props.style} className={cn("relative", props.className)}>
      <hr {...props} className="transition-all duration-200" />
      <span
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-3"
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      >
        {children || label}
      </span>
    </div>
  );
};
