import { ForwardRefRenderFunction, PropsWithChildren, forwardRef } from "react";

import { Variants } from "@/types/variant";

import { useEventHandlers } from "../../hooks/event-handler/use-event-handlers";
import { useProps } from "../../hooks/event-handler/use-props";
import { When } from "../when";
import { ButtonProps } from "./button.types";
import { getClassNames } from "./button.utils";

export type ButtonRef = HTMLButtonElement;
const ButtonBase: ForwardRefRenderFunction<ButtonRef, PropsWithChildren<ButtonProps>> = (
  { children, variant = Variants.Primary, isLoading = false, ...props },
  ref
) => {
  const { props: baseProps, handlers } = useProps(props);
  const eventHandler = useEventHandlers(handlers, {});
  return (
    <button
      ref={ref}
      data-component="button"
      data-state="default"
      aria-pressed="false"
      aria-label="button"
      aria-expanded="false"
      aria-haspopup="false"
      {...baseProps}
      {...eventHandler.webEventHandlers}
      data-testid={props.id}
      data-role={props.type}
      aria-disabled={props.disabled}
      className={getClassNames(variant, props.className)}
    >
      <When condition={isLoading}>
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-solid border-gray-200 border-t-blue-500" />
      </When>
      <When condition={!isLoading}>{children}</When>
    </button>
  );
};

export const Button = forwardRef(ButtonBase);
