import { Input, InputProps } from "@nextui-org/react";
import { Control, useController } from "react-hook-form";

export const InputField = ({
  control,
  name,
  ...inputProps
}: {
  control: Control<any, any>;
  name: string;
} & InputProps) => {
  const {
    field: { value, ref, ...fields },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <Input
      defaultValue={value}
      baseRef={ref}
      errorMessage={error?.message}
      isInvalid={invalid}
      {...fields}
      {...inputProps}
    />
  );
};
