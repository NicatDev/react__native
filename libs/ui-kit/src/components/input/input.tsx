import { FC } from "react";

import { withController } from "@/hoc/with-controller/with-controller";
import { useEventHandlers } from "@/hooks/event-handler/use-event-handlers";
import { useProps } from "@/hooks/event-handler/use-props";
import { Variants } from "@/types/variant";

import { cn, logger } from "@/utils";

import { Button, ErrorMessageViewer, Icon } from "..";
import { When } from "../when";
import { InputProps } from "./input.types";
import { getClassNames } from "./input.utils";

export const InputBase: FC<InputProps> = ({
  variant = Variants.Primary,
  label,
  onCloseClick,
  value,
  placeholder,
  icon,
  type,
  ...props
}) => {
  const { props: baseProps, handlers } = useProps(props);
  const eventHandler = useEventHandlers(handlers, { type });

  if (icon) {
    logger.debug("Icon is not implemented yet.", icon);
  }

  return (
    <div
      className={cn(
        "relative w-full",
        "[&>input]:rounded-lg",
        "group-first:[&>input]:first:rounded-br-none group-first:[&>input]:first:rounded-tr-none",
        "group-first:[&>input]:[&:not(:first-child,:last-child)]:rounded-none",
        "group-first:[&>input]:last:rounded-bl-none group-first:[&>input]:last:rounded-tl-none"
      )}
    >
      <When condition={!!label}>
        <label>{label}</label>
      </When>

      <input
        {...baseProps}
        {...eventHandler.webEventHandlers}
        placeholder={placeholder || "Type something..."}
        className={getClassNames(variant, cn(!!onCloseClick && "pr-8", props.className))}
      />

      <ErrorMessageViewer error={props.error} />

      <Button
        variant="none"
        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center peer-placeholder-shown:hidden"
        onClick={onCloseClick}
        type="submit"
      >
        <Icon name="close" />
      </Button>
    </div>
  );
};

export const Input = withController(InputBase);
