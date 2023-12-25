import { TextAreaProps, Textarea } from "@nextui-org/react";
import { Control, useController } from "react-hook-form";

export const TextareaField = ({
  control,
  name,
  ...textareaProps
}: {
  control: Control<any, any>;
  name: string;
} & TextAreaProps) => {
  const {
    field: { value, ref, ...fields },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <Textarea
      defaultValue={value}
      baseRef={ref}
      errorMessage={error?.message}
      isInvalid={invalid}
      {...fields}
      {...textareaProps}
    />
  );
};
