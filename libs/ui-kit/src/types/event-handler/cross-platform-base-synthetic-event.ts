import { BaseSyntheticEvent, SyntheticEvent } from "react";
import { NativeSyntheticEvent } from "react-native";

import { Target } from "./target";

export interface CrossPlatformBaseSyntheticEvent<
  TWebEvent extends SyntheticEvent = SyntheticEvent,
  TNativeEvent extends NativeSyntheticEvent<any> = NativeSyntheticEvent<any>,
  TTarget extends Target = Target,
  TComponentProps = {},
  TCurrentTarget = TTarget
> extends Omit<BaseSyntheticEvent<void, TCurrentTarget, TTarget>, "nativeEvent"> {
  eventType: "web" | "native";
  nativeEvent?: TNativeEvent;
  webEvent?: TWebEvent;
  props: TComponentProps;
}
