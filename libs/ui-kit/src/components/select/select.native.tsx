import type { FieldValues } from "react-hook-form";
import { Platform } from "react-native";

import { type ControlledBaseProps, useWithController } from "../../hoc";
import { Option } from "./components/option.native";
import { SelectAndroid } from "./select.android";
import { SelectIOS } from "./select.ios";
import type { SelectComponent, SelectProps } from "./select.types";

export const Select = Platform.select({
  android: SelectAndroid,
  ios: SelectIOS
}) as SelectComponent;
Select.Option = Option;
Select.Controlled = <TValue, TValues extends FieldValues = FieldValues>(
  props: SelectProps<TValue> & ControlledBaseProps<TValue, TValues>
) => useWithController<TValue, TValues, SelectProps<TValue>>(props, Select);
