import { type FieldValues, useFormContext } from "react-hook-form";

import { Button } from "../../button/index.native";
import type { FormButtonProps } from "../form.types";
import { useSubmitHandlers } from "../hooks/use-submit-handlers";

export const FormButton = <TData extends FieldValues>({
  children,
  onSubmit,
  onFormError,
  ...props
}: FormButtonProps<TData>) => {
  const form = useFormContext<TData>();
  const { handleSubmit, handleFormError } = useSubmitHandlers({ onSubmit, onFormError });

  const onClick: typeof props.onClick = e => {
    if (props.onClick) {
      props.onClick(e);
    }

    form.handleSubmit(handleSubmit, handleFormError)();
  };

  return (
    <Button {...props} onClick={onClick}>
      {children}
    </Button>
  );
};
