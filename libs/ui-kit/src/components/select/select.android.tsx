import { Children, type FC, type ReactElement } from "react";
import { View } from "react-native";

import { Picker } from "@react-native-picker/picker";

import { Option } from "./components/option.native";
import type { OptionProps } from "./components/option.types";
import { useSelect } from "./hooks/use-select";
import type { SelectComponent, SelectProps } from "./select.types";

export const SelectAndroid: Omit<SelectComponent, keyof SelectComponent> = <TValue,>({
  children,
  value = null,
  onChange,
  onBlur,
  label = "Select an option...",
  valueExtractor,
  disabled = false
}: SelectProps<TValue>): ReturnType<FC> => {
  const { selectedValue, handleSelect, options } = useSelect(Option, {
    value,
    valueExtractor,
    onChange,
    children
  });

  return (
    <View>
      <Picker
        selectedValue={selectedValue}
        onValueChange={handleSelect}
        onBlur={onBlur}
        enabled={!disabled}
        mode="dialog"
        accessibilityLabel={label}
        itemStyle={{ color: "black" }}
      >
        <Picker.Item label={label} value={null} />
        {Children.map<ReactElement<OptionProps<string | number | undefined>>, ReactElement<OptionProps<TValue>>>(
          options,
          option => ({
            ...option,
            props: {
              ...option.props,
              value: (valueExtractor?.(option.props.value) || option.props.value) as any
            }
          })
        )}
      </Picker>
    </View>
  );
};
