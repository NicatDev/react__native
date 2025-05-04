import { FC } from "react";
import { type FieldValues, useController, useFormContext } from "react-hook-form";

import { ControlledBaseProps, ControlledComponentBaseProps } from "./with-controller.types";

export const useWithController = <TValue, TValues extends FieldValues, TProps extends ControlledComponentBaseProps>(
  props: TProps & ControlledBaseProps<TValue, TValues>,
  Component: FC<TProps>
) => {
  const form = useFormContext<TValues>();
  if (!form) {
    const isDisabled =
      typeof props.disabled === "function" ? props.disabled(undefined as unknown as TValues) : props.disabled;
    return <Component {...props} disabled={isDisabled} />;
  }

  const values = form.getValues();
  const isDisabled = typeof props.disabled === "function" ? props.disabled(values) : props.disabled;
  const { field, formState } = useController({ name: props.name, control: form.control });
  const { ref: _ref, ...fieldProps } = field;

  const onChange = (value: TValue) => {
    field.onChange(value);
    props.onChange?.(value);
  };

  return <Component {...props} {...fieldProps} disabled={isDisabled} onChange={onChange} error={formState.errors} />;
};
