import { FundSource } from "@/db/db.model";
import {
  defaultFundSource,
  useFundSourceConnection,
} from "@/hooks/useFundSourceConnection";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { ObjectSchema, boolean, number, object, string } from "yup";
import { useCallback } from "react";

const schema: ObjectSchema<FundSource> = object({
  id: number().optional(),
  name: string().required(),
  icon: string().required(),
  isActive: boolean().required(),
});

export const useFundSource = () => {
  const { fundSourceList, addUpdateFundSource } = useFundSourceConnection();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleSubmit, control, setValue, getValues } = useForm<FundSource>({
    defaultValues: defaultFundSource,
    resolver: yupResolver(schema),
  });

  const isUpdate = !!getValues("id");
  const updateFundSource = useCallback(
    (fundSource: FundSource) => {
      setValue("icon", fundSource.icon);
      setValue("id", fundSource.id);
      setValue("isActive", fundSource.isActive);
      setValue("name", fundSource.name, { shouldValidate: false });
    },
    [setValue]
  );

  const onClickFundSourceCard = useCallback(
    (pocket: FundSource) => {
      updateFundSource(pocket);
      onOpen();
    },
    [updateFundSource, onOpen]
  );

  const closeForm = useCallback(() => {
    updateFundSource(defaultFundSource);
    onClose();
  }, [updateFundSource, onClose]);

  const onSubmit = handleSubmit(
    useCallback(
      (data) => {
        addUpdateFundSource(data);
        closeForm();
      },
      [addUpdateFundSource, closeForm]
    )
  );

  return {
    closeForm,
    control,
    isOpen,
    isUpdate,
    onClickFundSourceCard,
    onOpen,
    onSubmit,
    fundSourceList,
  };
};
