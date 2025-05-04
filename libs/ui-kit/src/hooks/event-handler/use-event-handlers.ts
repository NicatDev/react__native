import {
  AllEventsKeys,
  CrossPlatformEventHandlers,
  CrossPlatformEventType,
  type EventComponentProps,
  EventHandlerFn,
  RawNativeEvent,
  RawWebEvent
} from "../../types/event-handler/cross-platform-event-handlers";
import { convertEvent } from "../../utils/event-handler/convert-event";

export const useEventHandlers = <TEvents extends AllEventsKeys>(
  eventHandlers: CrossPlatformEventHandlers<TEvents>,
  props: EventComponentProps<TEvents>
): {
  webEventHandlers: { [TEvent in TEvents]: EventHandlerFn<RawWebEvent<TEvents>> };
  nativeEventHandlers: {
    [TEvent in TEvents]: EventHandlerFn<RawNativeEvent<TEvents>>;
  };
} => {
  const allHandlers = Object.entries(eventHandlers) as Array<
    [TEvents, EventHandlerFn<CrossPlatformEventType<TEvents>>]
  >;

  return {
    webEventHandlers: allHandlers.reduce(
      (acc, [key, value]) => ({ ...acc, [key]: convertEvent.web(key, value, props) }),
      {} as { [TEvent in TEvents]: EventHandlerFn<RawWebEvent<TEvents>> }
    ),
    nativeEventHandlers: allHandlers.reduce(
      (acc, [key, value]) => ({
        ...acc,
        [convertEvent.transferEventName(key)]: convertEvent.native(key, value, props)
      }),
      {} as { [TEvent in TEvents]: EventHandlerFn<RawNativeEvent<TEvents>> }
    )
  };
};
