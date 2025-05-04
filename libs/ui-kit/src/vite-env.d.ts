/// <reference types="vite/client" />
/// <reference types="nativewind/types" />
import { FC } from "react";


declare module "*.svg" {
  import { FC, SVGProps } from "react";
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module "react-native" {
  interface ViewProps {
    className?: string;
  }
}

declare global {
  export type Variants = string[];
  export type States = string[];
}
