import { FocusEvent } from "react";
import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

import { CrossPlatformBaseSyntheticEvent } from "../cross-platform-base-synthetic-event";
import { BlurTarget } from "../targets/blur-target";

export interface OnBlurEvent<TTarget extends BlurTarget = BlurTarget>
  extends CrossPlatformBaseSyntheticEvent<
    FocusEvent<HTMLInputElement>,
    NativeSyntheticEvent<TextInputFocusEventData>,
    TTarget
  > {}
