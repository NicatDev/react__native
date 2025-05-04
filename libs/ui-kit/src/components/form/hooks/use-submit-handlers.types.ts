import { FieldValues } from "react-hook-form";

import { FormProps } from "../form.types";

export interface UseSubmitHandlersProps<TData extends FieldValues>
  extends Partial<Pick<FormProps<TData>, "onSubmit" | "onFormError">> {}
