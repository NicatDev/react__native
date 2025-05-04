import type { FieldValues, UseFormReturn } from "react-hook-form";

export interface UseFormOptions<TData extends FieldValues> {
  form: UseFormReturn<TData>;
  onValuesChange?(values: TData): void;
}
