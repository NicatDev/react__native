import { Children, useState } from "react";

import { useChildren } from "../../../hooks/use-children";
import type { OptionProps } from "../components/option.types";
import type { SelectComponent, SelectProps } from "../select.types";

export const useSelect = <TValue>(
  Option: SelectComponent["Option"],
  { value, valueExtractor, onChange, children }: SelectProps<TValue>
) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(() =>
    value && valueExtractor ? valueExtractor(value)?.toString() || null : value ? value.toString() : null
  );
  const options = useChildren<OptionProps<TValue>>(children, [Option]);
  if (options.length !== Children.toArray(children).length) {
    throw new Error(
      "Select component only accepts Option components as children. Please review the children of the Select component."
    );
  }

  const valueExtractorMap = new Map<string, TValue>(
    valueExtractor ? options.map(option => [valueExtractor(option.props.value).toString(), option.props.value]) : []
  );

  const handleSelect = (itemValue: string | null) => {
    const val = itemValue ? valueExtractorMap.get(itemValue.toString()) || (itemValue as TValue) : null;
    setSelectedValue(itemValue);
    onChange?.(val);
  };

  return { selectedValue, options, valueExtractorMap, handleSelect };
};
