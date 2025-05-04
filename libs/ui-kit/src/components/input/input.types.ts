import { JSX } from "react";

import { ControlledComponentBaseProps } from "@/hoc/with-controller/with-controller.types";
import { BaseProps } from "@/types/base-props";
import {
  CrossPlatformEventHandlerFn,
  CrossPlatformEventHandlers,
  EventsList
} from "@/types/event-handler/cross-platform-event-handlers";
import { Variant } from "@/types/variant";
import { Icons } from "@internal/icons/types";

interface LeftRightIcons {
  left?: keyof Icons;
  right?: keyof Icons;
}

export interface InputProps
  extends ControlledComponentBaseProps,
    Omit<BaseProps<"input">, "value">,
    CrossPlatformEventHandlers<InputSpecificEventTypes> {
  variant?: Variant;
  disabled?: boolean;
  label?: string | JSX.Element;
  value?: BaseProps<"input">["value"] | null;
  onCloseClick?: CrossPlatformEventHandlerFn<"onClick">;
  icon?: LeftRightIcons;
}

type InputSpecificEventTypes = EventsList<"onChange">;
