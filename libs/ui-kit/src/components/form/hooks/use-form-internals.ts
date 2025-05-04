import { useEffect } from "react";
import { type FieldValues } from "react-hook-form";

import type { UseFormOptions } from "./use-form-internals.types";

export const useFormInternals = <TData extends FieldValues>(options: UseFormOptions<TData>) => {
  const formValues = options.form.watch();

  useEffect(() => {
    const originalFormSetValue = options.form.setValue;
    options.form.setValue = (name, value, opts) => {
      originalFormSetValue(name, value, opts);
      options?.onValuesChange?.(formValues);
    };

    return () => {
      options.form.setValue = originalFormSetValue;
    };
  }, []);
};
