import { variantClassMap } from "@/utils/variant-class-map";

import { cn } from "@/utils";

import { ButtonProps } from "./button.types";

export const buttonVariantsClassMap = variantClassMap({
  primary: cn(
    "bg-primary border-primary disabled:bg-disabled",
    "hover:bg-primary-hover hover:border-primary-hover disabled:hover:bg-disabled",
    "focus:bg-primary focus:border-primary-focus disabled:focus:bg-disabled",
    "text-white dark:text-dark disabled:text-disabled-text",
    "dark:bg-primary-dark dark:border-primary-dark",
    "dark:hover:bg-primary-dark-hover dark:hover:border-primary-dark-hover",
    "dark:focus:bg-primary-dark-focus dark:focus:border-primary-dark-focus",
    "disabled:border-disabled"
  ),
  secondary: cn(
    "bg-white border-primary disabled:bg-disabled",
    "hover:bg-primary-hover hover:border-primary-hover",
    "focus:bg-primary-focus focus:border-primary-focus",
    "text-primary dark:text-dark disabled:text-disabled-text",
    "dark:border-primary-dark dark:color-primary-dark",
    "dark:hover:bg-primary-dark-hover dark:hover:border-primary-dark-hover",
    "dark:focus:bg-primary-dark-focus dark:focus:border-primary-dark-focus",
    "disabled:border-disabled"
  ),
  danger: cn("bg-danger", "text-white"),
  link: cn()
});

export const getClassNames = (variant?: ButtonProps["variant"] | false, className?: string) => {
  const variantClass = !variant || variant === "none" ? "" : buttonVariantsClassMap[variant];

  return cn(
    "transition-all duration-200",
    "border-2 border-transparent",
    variant !== "none" && "px-4 py-2",
    variantClass,
    "disabled:cursor-not-allowed",
    "rounded-lg",
    "group-first:first:rounded-br-none group-first:first:rounded-tr-none",
    "group-first:[&:not(:first-child,:last-child)]:rounded-none",
    "group-first:last:rounded-bl-none group-first:last:rounded-tl-none",
    className
  );
};
