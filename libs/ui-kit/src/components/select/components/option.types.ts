import type { BaseProps } from "../../../types/base-props";

interface OptionBaseProps<TValue> {
  value: TValue;
}

export interface OptionProps<TValue> extends BaseProps<"option", OptionBaseProps<TValue>, "value"> {}
