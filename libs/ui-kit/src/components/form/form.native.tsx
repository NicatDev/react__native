import { PropsWithChildren } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { FormButton } from "./components/form-button.native";
import { UIFormProvider } from "./context";
import type { FormComponent, FormProps } from "./form.types";
import { useFormInternals } from "./hooks/use-form-internals";

export const Form: FormComponent = <TData extends FieldValues>({
  onSubmit,
  onFormError,
  defaultValues,
  schema,
  onValuesChange,
  children
}: PropsWithChildren<FormProps<TData>>) => {
  const form = useForm({
    resolver: schema ? zodResolver(schema) : void 0,
    defaultValues
  });

  useFormInternals({ form, onValuesChange });

  return (
    <UIFormProvider onSubmit={onSubmit} onFormError={onFormError}>
      <FormProvider {...form}>{children}</FormProvider>
    </UIFormProvider>
  );
};

Form.Button = FormButton;
