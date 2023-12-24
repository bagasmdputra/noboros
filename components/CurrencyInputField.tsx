import { Input, InputProps } from "@nextui-org/react";
import { Control, useController } from "react-hook-form";
import {
  NumberFormatBase,
  NumberFormatBaseProps,
  OnValueChange,
} from "react-number-format";
import { InputField } from "./InputField";
import { currencyString } from "@/utils/number";

export const CurrencyInputField = ({
  control,
  name,
  type,
  ...inputProps
}: {
  control: Control<any, any>;
  name: string;
} & InputProps) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const onChangeOverride: OnValueChange = (values) => {
    onChange(values.floatValue);
  };
  return (
    <NumberFormatBase
      type="tel"
      name={name}
      control={control}
      format={currencyString}
      value={value}
      {...inputProps}
      customInput={InputField}
      onValueChange={onChangeOverride}
    />
  );
};
