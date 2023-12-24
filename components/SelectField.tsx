import { Select, SelectProps } from "@nextui-org/select";
import { ReactElement } from "react";
import { Control, useController } from "react-hook-form";

type SelectFieldType = <T = object>(
  props: {
    control: Control<any, any>;
    name: string;
  } & SelectProps<T>
) => ReactElement;

export const SelectField: SelectFieldType = ({
  control,
  name,
  ...inputProps
}) => {
  const {
    field: { value, onChange, ...fields },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <Select
      selectedKeys={[value]}
      onChange={onChange}
      errorMessage={error?.message}
      isInvalid={invalid}
      {...fields}
      {...inputProps}
    />
  );
};
