import type { JSX, JSXElementConstructor } from "react";

export type FCComponentName = keyof JSX.IntrinsicElements | JSXElementConstructor<any>;
