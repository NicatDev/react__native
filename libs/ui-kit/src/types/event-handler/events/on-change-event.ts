import type { ChangeEvent, HTMLInputTypeAttribute } from "react";
import type { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

import { CrossPlatformBaseSyntheticEvent } from "../cross-platform-base-synthetic-event";
import { InputTarget } from "../targets/input-target";

interface ComponentProps {
  type?: HTMLInputTypeAttribute;
}

export interface OnChangeEvent<TTarget extends InputTarget = InputTarget>
  extends CrossPlatformBaseSyntheticEvent<
    ChangeEvent<HTMLInputElement>,
    NativeSyntheticEvent<TextInputChangeEventData>,
    TTarget,
    ComponentProps
  > {}
