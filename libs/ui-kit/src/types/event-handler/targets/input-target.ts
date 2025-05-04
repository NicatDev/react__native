import { Target } from "../target";

export interface TextInputTarget extends Target {
  type?: "text";
  value: string;
}

export interface NumberInputTarget extends Target {
  type: "number";
  valueAsNumber: number;
  value: string;
}

export type InputTarget = TextInputTarget | NumberInputTarget;
