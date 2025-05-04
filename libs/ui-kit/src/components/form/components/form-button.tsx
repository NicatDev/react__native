import { type FieldValues, useFormContext } from "react-hook-form";

import { Button } from "../../button";
import type { FormButtonProps } from "../form.types";
import { useSubmitHandlers } from "../hooks/use-submit-handlers";

export const FormButton = <TData extends FieldValues>({
  children,
  onSubmit,
  onFormError,
  isLoading,
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
    <Button variant="primary" {...props} onClick={onClick} isLoading={isLoading}>
      {children}
    </Button>
  );
};
