// @ts-nocheck
// ToDo: Will be implemented...
import { Children, type FC, type ReactElement, useState } from "react";

import { useWithController } from "../../hoc";
import type { ControlledBaseProps } from "../../hoc";
import { Option } from "./components/option";
import type { OptionProps } from "./components/option.types";
import type { SelectComponent, SelectProps } from "./select.types";

export const Select: SelectComponent = <TValue,>({
  children,
  value,
  onChange,
  placeholder = "Select an option...",
  disabled = false
}: SelectProps<TValue>): ReturnType<FC> => {
  const [selectedValue, setSelectedValue] = useState<TValue | null>(value || null);

  const [isOpen, setIsOpen] = useState(false);

  const options = Children.toArray(children) as ReactElement<OptionProps<any>>[];

  const handleSelect = (value: TValue) => {
    setSelectedValue(value);
    onChange?.(value);
    setIsOpen(false);
  };

  return <div>Will be implemented...</div>;
};

Select.Option = Option;
Select.Controlled = <TValue, TValues extends FieldValues = FieldValues>(
  props: SelectProps<TValue> & ControlledBaseProps<TValue, TValues>
) => useWithController<TValue, TValues, SelectProps<TValue>>(props, Select);
