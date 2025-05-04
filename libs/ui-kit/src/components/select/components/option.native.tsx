import type { ReactElement } from "react";

import { Picker } from "@react-native-picker/picker";

import { useConvertWebPropsToNative } from "../../../hooks/use-convert-web-props-to-native";
import type { SelectComponent } from "../select.types";
import type { OptionProps } from "./option.types";

export const Option: SelectComponent["Option"] = <TValue,>({
  label,
  children,
  ...props
}: OptionProps<TValue>): ReactElement<TValue> => {
  const nativeProps = useConvertWebPropsToNative<"option", typeof Picker.Item>(props);
  return <Picker.Item label={label} {...nativeProps} />;
};
