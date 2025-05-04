import {
  AllEventsKeys,
  CrossPlatformEventType,
  type EventComponentProps,
  EventHandlerFn,
  RawNativeEvent,
  RawWebEvent
} from "../../types/event-handler/cross-platform-event-handlers";
import { Platform } from "../../types/platform";
import { events } from "./events";
import { getBaseEvent } from "./get-base-event";
import { predefinedEventNames } from "./predefined-event-names";

export const convertEvent = <TEvent extends AllEventsKeys, TPlatform extends Platform>(
  eventName: TEvent,
  eventHandler: EventHandlerFn<CrossPlatformEventType<TEvent>>,
  props: EventComponentProps<TEvent>,
  platform: TPlatform
): EventHandlerFn<TPlatform extends typeof Platform.Web ? RawWebEvent<TEvent> : RawNativeEvent<TEvent>> => {
  return event => {
    event.persist();
    const getSyntheticEvent = getBaseEvent<TPlatform, TEvent>(platform, event, props);
    if (!events[eventName]) {
      throw new Error(`Event handler for event ${eventName} is not defined`);
    }
    const syntheticEvent = events[eventName]({ getEvent: () => event as any, getSyntheticEvent, props });
    eventHandler(syntheticEvent);
  };
};

convertEvent.web = <TEvent extends AllEventsKeys>(
  eventName: TEvent,
  event: EventHandlerFn<CrossPlatformEventType<TEvent>>,
  componentProps: EventComponentProps<TEvent>
) => convertEvent(eventName, event, componentProps, Platform.Web);
convertEvent.native = <TEvent extends AllEventsKeys>(
  eventName: TEvent,
  event: EventHandlerFn<CrossPlatformEventType<TEvent>>,
  componentProps: EventComponentProps<TEvent>
) => convertEvent(eventName, event, componentProps, Platform.Native);
convertEvent.transferEventName = (eventName: AllEventsKeys) => predefinedEventNames[eventName] ?? eventName;
