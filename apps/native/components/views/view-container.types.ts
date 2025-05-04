import { ComponentProps } from "react";
import { View } from "react-native";

export interface ViewContainerProps extends Partial<Pick<ComponentProps<typeof View>, "className">> {}
