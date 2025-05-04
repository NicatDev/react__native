import { type FC, type ReactElement } from "react";
import type { FieldValues } from "react-hook-form";

import type { ControlledBaseProps, ControlledComponentBaseProps } from "../../hoc";
import type { BaseProps } from "../../types/base-props";
import type { CrossPlatformEventHandlers, EventsList } from "../../types/event-handler/cross-platform-event-handlers";
import type { OptionProps } from "./components/option.types";

export interface SelectProps<TValue>
  extends ControlledComponentBaseProps,
    Omit<BaseProps<"select">, "value">,
    CrossPlatformEventHandlers<SelectSpecificEventTypes> {
  /**
   * Label text to show above the select.
   */
  label?: string;

  /**
   * Value of the select.
   */
  value?: TValue | null;

  /**
   * Placeholder text to show when no value is selected.
   */
  placeholder?: string;
  children: ReactElement<OptionProps<TValue>> | false | (ReactElement<OptionProps<TValue>> | false)[];

  /**
   * Value extractor function.
   * Will be used to extract the value from the selected option is complex objects are used as options' values.
   * @param value
   */
  valueExtractor?(value: TValue): string | number;

  /**
   * Change event handler.
   * @param value
   */
  onChange?(value: TValue | null): void;

  /**
   * Blur event handler.
   */
  onBlur?(): void;
}

type SelectSpecificEventTypes = EventsList<never>;

export interface SelectComponent {
  Controlled: <TValue, TValues extends FieldValues>(
    props: SelectProps<TValue> & ControlledBaseProps<TValue, TValues>
  ) => ReturnType<FC>;
  Option: <TValue>(props: OptionProps<TValue>) => ReactElement<TValue>;

  <TValue>(props: SelectProps<TValue>): ReturnType<FC>;
}
