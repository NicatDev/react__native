import type { BaseSyntheticEvent, PropsWithChildren, ReactElement } from "react";
import type { DefaultValues, FieldValues, SubmitErrorHandler, UseFormReturn } from "react-hook-form";
import { ZodSchema } from "zod";

import { BaseProps } from "@/types/base-props";

import { ButtonProps } from "../button/button.types";

export interface FormProps<TData extends FieldValues> extends Omit<BaseProps<"form">, "onSubmit" | "ref"> {
  onSubmit?(data: TData, form: UseFormReturn<TData>, event?: BaseSyntheticEvent): unknown | Promise<unknown>;
  onFormError?: SubmitErrorHandler<TData>;
  schema?: ZodSchema<TData>;
  defaultValues?: DefaultValues<TData>;

  onValuesChange?(values: TData): void;
}

export interface FormButtonProps<TData extends FieldValues>
  extends Omit<ButtonProps, "onSubmit" | "ref">,
    Pick<FormProps<TData>, "onSubmit" | "onFormError"> {}

export interface FormRef<TData extends FieldValues> extends UseFormReturn<TData> {}

export interface FormComponent {
  Button: <TData extends FieldValues>(props: FormButtonProps<TData>) => ReactElement<FormButtonProps<TData>>;

  <TData extends FieldValues>(props: PropsWithChildren<FormProps<TData>>): ReactElement;
}
