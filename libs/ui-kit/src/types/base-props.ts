import { ComponentProps, JSX, JSXElementConstructor } from "react";

import { Variant } from "./variant";

export interface InitialBaseProps {
  variant?: Variant;
}

export type BaseProps<
  TElement extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
  TProps = unknown,
  TOmitKeys extends keyof (ComponentProps<TElement> & InitialBaseProps) = never
> = Omit<InitialBaseProps & Omit<ComponentProps<TElement>, `on${string}`>, TOmitKeys> & TProps;
