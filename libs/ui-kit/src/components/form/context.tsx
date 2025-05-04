import { type BaseSyntheticEvent, PropsWithChildren, createContext, useContext } from "react";
import { FieldValues, SubmitErrorHandler, type UseFormReturn } from "react-hook-form";

interface UIFormContext<TData extends FieldValues> {
  onFormError?: SubmitErrorHandler<TData>;

  onSubmit?(data: TData, form: UseFormReturn<TData>, event?: BaseSyntheticEvent): unknown | Promise<unknown>;
}

export const uiFormContext = createContext<UIFormContext<any> | null>(null);

export const useUIFormContext = <TData extends FieldValues>() => {
  return useContext<UIFormContext<TData> | null>(uiFormContext);
};

export const UIFormProvider = <TData extends FieldValues>({
  children,
  ...props
}: PropsWithChildren<UIFormContext<TData>>) => {
  return <uiFormContext.Provider value={props}>{children}</uiFormContext.Provider>;
};
