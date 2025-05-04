import type { MouseEvent } from "react";
import type { NativeSyntheticEvent, NativeTouchEvent } from "react-native";

import { CrossPlatformBaseSyntheticEvent } from "../cross-platform-base-synthetic-event";
import { Target } from "../target";

export interface OnClickEvent<TTarget extends Target = Target>
  extends CrossPlatformBaseSyntheticEvent<
    MouseEvent<HTMLButtonElement>,
    NativeSyntheticEvent<NativeTouchEvent>,
    TTarget
  > {}
