import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { ControlledBaseProps, ControlledComponentBaseProps } from "./with-controller.types";

export const withController = <TValue, TProps extends ControlledComponentBaseProps>(Component: FC<TProps>) => {
  return Object.assign<FC<TProps>, { Controlled: FC<TProps & ControlledBaseProps<TValue>> }>(Component, {
    Controlled(props): ReturnType<FC> {
      const form = useFormContext();
      if (!form) return <Component {...props} />;
      return (
        <Controller
          name={props.name}
          control={form.control}
          render={({ field: { ref: _ref, ...field }, formState }) => (
            <Component {...props} {...field} error={formState.errors?.[props.name]} />
          )}
        />
      );
    }
  });
};
