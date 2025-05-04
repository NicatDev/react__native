import "react-native";

declare module "react-native" {
  export interface ViewProps {
    className?: string;
  }

  export interface TextProps {
    className?: string;
  }
}
