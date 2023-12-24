import { Switch, SwitchProps } from "@nextui-org/react";
import { Control, useController } from "react-hook-form";

export const SwitchField = ({
  control,
  name,
  ...inputProps
}: {
  control: Control<any, any>;
  name: string;
} & SwitchProps) => {
  const {
    field: { value, onChange, ref, ...field },
  } = useController({
    name,
    control,
  });

  return (
    <Switch
      isSelected={value}
      onChange={(e) => {
        onChange(e.target.checked);
      }}
      {...field}
      {...inputProps}
    ></Switch>
  );
};
