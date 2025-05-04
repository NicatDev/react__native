import { pick } from "lodash";

import { CrossPlatformBaseSyntheticEvent } from "../../types/event-handler/cross-platform-base-synthetic-event";
import {
  AllEventsKeys,
  type EventComponentProps,
  RawNativeEvent,
  RawWebEvent
} from "../../types/event-handler/cross-platform-event-handlers";
import { Target } from "../../types/event-handler/target";
import { Platform } from "../../types/platform";

export const getBaseEvent = <TPlatform extends Platform, TEvent extends AllEventsKeys>(
  platform: TPlatform,
  event: RawWebEvent<TEvent> | RawNativeEvent<TEvent>,
  props: EventComponentProps<TEvent>
) => {
  return <TTarget extends Target>(
    target: TTarget
  ): CrossPlatformBaseSyntheticEvent<RawWebEvent<TEvent>, RawNativeEvent<TEvent>, TTarget, TTarget> => {
    return {
      eventType: platform,
      nativeEvent: (platform === Platform.Native ? event : undefined) as any,
      webEvent: (platform === Platform.Web ? event : undefined) as any,
      props: props as any,

      target,
      currentTarget: target,

      ...pick(event, ["type", "bubbles", "cancelable", "eventPhase", "timeStamp", "isTrusted", "persist"]),
      ...pick(event, ["isDefaultPrevented", "defaultPrevented", "preventDefault"]),
      ...pick(event, ["isPropagationStopped", "stopPropagation"])
    };
  };
};
