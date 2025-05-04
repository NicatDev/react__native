import { PropsWithChildren } from "react";
import { FieldValues, FormProvider, type SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { FormButton } from "./components/form-button";
import { UIFormProvider } from "./context";
import { type FormComponent, FormProps } from "./form.types";
import { useFormInternals } from "./hooks/use-form-internals";

export const Form: FormComponent = <TData extends FieldValues>({
  onSubmit,
  onFormError,
  defaultValues,
  schema,
  children,
  onValuesChange,
  ...props
}: PropsWithChildren<FormProps<TData>>) => {
  const form = useForm<TData>({
    resolver: schema ? zodResolver(schema) : void 0,
    defaultValues
  });

  useFormInternals({ form, onValuesChange });

  const handleSubmit: SubmitHandler<TData> = (data, event) => {
    onSubmit?.(data, form, event);
  };

  return (
    <UIFormProvider onSubmit={onSubmit} onFormError={onFormError}>
      <FormProvider {...form}>
        <form {...props} onSubmit={form.handleSubmit(handleSubmit, onFormError)}>
          {children}
        </form>
      </FormProvider>
    </UIFormProvider>
  );
};

Form.Button = FormButton;
