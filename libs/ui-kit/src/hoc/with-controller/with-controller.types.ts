import type { FieldPath, FieldValues } from "react-hook-form";

export interface ControlledBaseProps<TValue, TValues extends FieldValues = FieldValues> {
  name: FieldPath<TValues>;
  onChange?(value: TValue): void;
  disabled?: boolean | ((values: TValues) => boolean);
}

export interface ControlledComponentBaseProps {
  error?: { message: string } | { message: string }[] | string[] | string | false;
}
