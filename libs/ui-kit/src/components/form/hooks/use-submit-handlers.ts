import { FieldValues, SubmitErrorHandler, SubmitHandler, useFormContext } from "react-hook-form";

import { useUIFormContext } from "../context";
import { UseSubmitHandlersProps } from "./use-submit-handlers.types";

export const useSubmitHandlers = <TData extends FieldValues>(handlers?: UseSubmitHandlersProps<TData> | null) => {
  const ctx = useUIFormContext<TData>();
  const form = useFormContext<TData>();

  const handleSubmit: SubmitHandler<TData> = (data, event) => {
    if (ctx?.onSubmit === handlers?.onSubmit) {
      handlers?.onSubmit?.(data, form, event);
      return;
    }

    ctx?.onSubmit?.(data, form, event);
    handlers?.onSubmit?.(data, form, event);
  };

  const handleFormError: SubmitErrorHandler<TData> = (errors, event) => {
    if (ctx?.onFormError === handlers?.onFormError) {
      handlers?.onFormError?.(errors, event);
      return;
    }

    ctx?.onFormError?.(errors, event);
    handlers?.onFormError?.(errors, event);
  };

  return { handleSubmit, handleFormError };
};
