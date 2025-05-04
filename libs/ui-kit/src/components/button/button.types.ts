import { BaseProps } from "@/types/base-props";
import { Variant } from "@/types/variant";

import { CrossPlatformEventHandlers, EventsList } from "../../types/event-handler/cross-platform-event-handlers";

interface ButtonBaseProps {
  variant?: Variant | "none";
  disabled?: boolean;
  isLoading?: boolean;
}

export interface ButtonProps
  extends BaseProps<"button", ButtonBaseProps, "variant">,
    CrossPlatformEventHandlers<ButtonSpecificEventTypes> {}

type ButtonSpecificEventTypes = EventsList<"onClick">;
