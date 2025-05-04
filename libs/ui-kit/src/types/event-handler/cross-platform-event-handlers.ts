import { CrossPlatformBaseSyntheticEvent } from "./cross-platform-base-synthetic-event";
import { OnBlurEvent } from "./events/on-blur-event";
import { OnChangeEvent } from "./events/on-change-event";
import { OnClickEvent } from "./events/on-click-event";

export interface EventHandlerFn<TEvent> {
  (event: TEvent): void;
}

export interface CrossPlatformEventHandlersList {
  onChange: OnChangeEvent;
  onClick: OnClickEvent;
  onBlur: OnBlurEvent;
}

type InferTypes<TEvent extends AllEventsKeys, TEventType extends "web" | "native" | "props"> =
  CrossPlatformEventHandlersList[TEvent] extends CrossPlatformBaseSyntheticEvent<
    infer TWebEvent,
    infer TNativeEvent,
    any,
    infer TProps
  >
    ? TEventType extends "web"
      ? TWebEvent
      : TEventType extends "native"
        ? TNativeEvent
        : TProps
    : never;

export type RawWebEvent<TEvent extends AllEventsKeys> = InferTypes<TEvent, "web">;
export type RawNativeEvent<TEvent extends AllEventsKeys> = InferTypes<TEvent, "native">;
export type EventComponentProps<TEvent extends AllEventsKeys> = InferTypes<TEvent, "props">;

export type AllEventsKeys = keyof CrossPlatformEventHandlersList;
export type EventsList<TEvents extends AllEventsKeys> = TEvents;
export type CrossPlatformEventType<TEvent extends AllEventsKeys> = CrossPlatformEventHandlersList[TEvent];
export type CrossPlatformEvents = { [TEventKey in AllEventsKeys]: CrossPlatformEventType<TEventKey> };
export type CrossPlatformEventHandlerFn<TEvent extends AllEventsKeys> = EventHandlerFn<CrossPlatformEventType<TEvent>>;

export type CrossPlatformEventHandlers<TEvents extends AllEventsKeys> = {
  [TEvent in TEvents]?: EventHandlerFn<CrossPlatformEventType<TEvent>>;
};
