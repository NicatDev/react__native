import { ComponentProps, type HTMLInputTypeAttribute } from "react";
import type { KeyboardTypeOptions } from "react-native";

import { Variant, Variants } from "@/types/variant";

import { cn } from "@/utils";

import { InputProps } from "./input.types";

export const inputVariantsClassMap: Record<Variant, ComponentProps<"div">["className"]> = {
  [Variants.Primary]: cn(),
  [Variants.Secondary]: cn(),
  [Variants.Danger]: cn(),
  [Variants.Link]: cn()
};

export const getClassNames = (variant: InputProps["variant"] = Variants.Primary, className?: string) => {
  const variantClass = inputVariantsClassMap[variant];

  return cn(
    "transition-all duration-200",
    "border-2 border-neutral-50",
    variantClass,
    "disabled:cursor-not-allowed",
    "px-3 py-2.5",
    "w-full",
    className
  );
};

export const keyboardTypes: Record<HTMLInputTypeAttribute, KeyboardTypeOptions> = {
  "number": "number-pad",
  "date": "numeric",
  "email": "email-address",
  "password": "default",
  "text": "default",
  "submit": "default",
  "datetime-local": "numeric",
  "url": "url",
  "tel": "phone-pad",
  "button": "default",
  "color": "default",
  "file": "default",
  "hidden": "default",
  "image": "default",
  "month": "numeric",
  "radio": "default",
  "range": "numeric",
  "reset": "default",
  "search": "default",
  "time": "numeric",
  "week": "numeric",
  "checkbox": "default"
};
