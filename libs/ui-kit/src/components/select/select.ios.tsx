import { Children, type FC, type ReactElement } from "react";
import { Pressable, Text, View } from "react-native";

import { Picker } from "@react-native-picker/picker";

import { cn } from "../../utils";
import { Icon, Modal, useModalRef } from "../index.native";
import { Option } from "./components/option.native";
import type { OptionProps } from "./components/option.types";
import { useSelect } from "./hooks/use-select";
import type { SelectComponent, SelectProps } from "./select.types";

export const SelectIOS: Omit<SelectComponent, keyof SelectComponent> = <TValue,>({
  children,
  value = null,
  onChange,
  onBlur,
  label = "Select an option...",
  valueExtractor,
  disabled = false
}: SelectProps<TValue>): ReturnType<FC> => {
  const modalRef = useModalRef();

  const { selectedValue, handleSelect, valueExtractorMap, options } = useSelect(Option, {
    value,
    valueExtractor,
    onChange,
    children
  });

  const optionsMap = new Map<TValue, string | undefined>(
    options.map(option => [option.props.value, option.props.label])
  );
  const valObject = selectedValue ? valueExtractorMap.get(selectedValue) || (selectedValue as TValue) : null;
  const placeholder = valObject && optionsMap.has(valObject) ? optionsMap.get(valObject) : label;

  return (
    <View>
      <Pressable
        onPress={() => modalRef.current?.open()}
        disabled={disabled}
        className={cn("flex flex-row items-center", "rounded-lg bg-gray-200 p-4")}
      >
        <Text>{placeholder}</Text>
        <View className="ml-auto">
          <Icon name="arrow-down-thick" />
        </View>
      </Pressable>

      <Modal type="bottom" ref={modalRef}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={handleSelect}
          onBlur={onBlur}
          enabled={!disabled}
          mode="dialog"
          prompt={placeholder}
          placeholder={placeholder}
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
                value: valueExtractor ? valueExtractor(option.props.value) : option.props.value?.toString()
              }
            })
          )}
        </Picker>
      </Modal>
    </View>
  );
};
