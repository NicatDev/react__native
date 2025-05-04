import { CrossPlatformBaseSyntheticEvent } from "../../../types/event-handler/cross-platform-base-synthetic-event";
import {
  AllEventsKeys,
  CrossPlatformEventType,
  type EventComponentProps,
  RawNativeEvent,
  RawWebEvent
} from "../../../types/event-handler/cross-platform-event-handlers";
import { Target } from "../../../types/event-handler/target";
import { Platform } from "../../../types/platform";
import { onBlur } from "./on-blur";
import { onChange } from "./on-change";
import { onClick } from "./on-click";

export interface EventParameters<TEvent extends AllEventsKeys> {
  getEvent: <TPlatform extends Platform>(
    platform: TPlatform
  ) => TPlatform extends typeof Platform.Web ? RawWebEvent<TEvent> : RawNativeEvent<TEvent>;
  getSyntheticEvent<TTarget extends Target>(
    target: TTarget
  ): CrossPlatformBaseSyntheticEvent<RawWebEvent<TEvent>, RawNativeEvent<TEvent>, TTarget, TTarget>;
  props: EventComponentProps<TEvent>;
}

export interface EventFn<TEvent extends AllEventsKeys> {
  (params: EventParameters<TEvent>): CrossPlatformEventType<TEvent>;
}

type Events = {
  [TEvent in AllEventsKeys]: EventFn<TEvent>;
};

export const events: Events = { onChange, onClick, onBlur };
