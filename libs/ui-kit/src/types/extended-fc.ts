import { FC, ForwardRefRenderFunction, PropsWithoutRef, forwardRef } from "react";

export type ExtendedFC<TProps = {}, TExtendedComponents = {}> = FC<TProps> & TExtendedComponents;

export const extendedForwardRef = <TElement, TProps = {}, TExtendedComponents = {}>(
  refFn: ForwardRefRenderFunction<TElement, PropsWithoutRef<TProps>>
) => Object.assign(forwardRef<TElement, TProps>(refFn), {} as TExtendedComponents);
