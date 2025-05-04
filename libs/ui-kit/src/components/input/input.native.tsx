import { cssInterop } from "nativewind";
import { FC } from "react";
import { TextInput as RNTextInput, Text, View } from "react-native";

import { withController } from "@/hoc/with-controller/with-controller";
import { useEventHandlers } from "@/hooks/event-handler/use-event-handlers";
import { useProps } from "@/hooks/event-handler/use-props";
import { useConvertWebPropsToNative } from "@/hooks/use-convert-web-props-to-native";
import { Variants } from "@/types/variant";

import { cn } from "@/utils";

import { ErrorMessageViewer } from "../error-message-viewer/error-message-viewer.native";
import { Button, Icon, When } from "../index.native";
import { InputProps } from "./input.types";
import { getClassNames, keyboardTypes } from "./input.utils";

const TextInput = cssInterop(RNTextInput, { className: "style" });

export const InputBase: FC<InputProps> = ({
  variant = Variants.Primary,
  label,
  onCloseClick,
  value,
  placeholder,
  error,
  ...props
}) => {
  const { props: baseProps, handlers } = useProps(props);
  const nativeProps = useConvertWebPropsToNative<"input", typeof TextInput>(baseProps);
  const eventHandler = useEventHandlers(handlers, props);
  const className = getClassNames(variant, cn(!!onCloseClick && "pr-8", baseProps.className));

  return (
    <View
      className={cn(
        "relative",
        "[&>input]:rounded-lg",
        "group-first:[&>input]:first:rounded-br-none group-first:[&>input]:first:rounded-tr-none",
        "group-first:[&>input]:[&:not(:first-child,:last-child)]:rounded-none",
        "group-first:[&>input]:last:rounded-bl-none group-first:[&>input]:last:rounded-tl-none"
      )}
    >
      <When condition={!!label}>
        <Text id={props.name} className="mb-2">
          {label}
        </Text>
      </When>

      <TextInput
        {...nativeProps}
        {...eventHandler.nativeEventHandlers}
        placeholder={placeholder}
        placeholderTextColor={variant === Variants.Link ? "blue" : "black"}
        className={className}
        secureTextEntry={props.type === "password"}
        aria-label="input"
        aria-labelledby={props.name}
        keyboardType={props.type ? keyboardTypes[props.type] : "default"}
        autoCapitalize="none"
        value={value?.toString()}
      />

      <ErrorMessageViewer error={error} />

      <When condition={!!onCloseClick}>
        <Button
          variant="none"
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center peer-placeholder-shown:hidden"
          onClick={onCloseClick}
          type="submit"
        >
          <Icon name="close" />
        </Button>
      </When>
    </View>
  );
};

export const Input = withController(InputBase);
