import { Pocket } from "@/db/db.model";
import {
  defaultPocket,
  usePocketConnection,
} from "@/hooks/usePocketConnection";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { ObjectSchema, boolean, number, object, string } from "yup";
import { useCallback } from "react";

const schema: ObjectSchema<Pocket> = object({
  id: number().optional(),
  name: string().required(),
  limit: number().min(100000).required(),
  icon: string().required(),
  isActive: boolean().required(),
});

export const usePocket = () => {
  const { pocketList, addUpdatePocket } = usePocketConnection();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleSubmit, control, setValue, getValues } = useForm<Pocket>({
    defaultValues: defaultPocket,
    resolver: yupResolver(schema),
  });

  const isUpdate = !!getValues("id");
  const updatePocket = useCallback(
    (pocket: Pocket) => {
      setValue("icon", pocket.icon);
      setValue("id", pocket.id);
      setValue("isActive", pocket.isActive);
      setValue("limit", pocket.limit, { shouldValidate: false });
      setValue("name", pocket.name, { shouldValidate: false });
    },
    [setValue]
  );

  const onClickPocketCard = useCallback(
    (pocket: Pocket) => {
      updatePocket(pocket);
      onOpen();
    },
    [updatePocket, onOpen]
  );

  const closeForm = useCallback(() => {
    updatePocket(defaultPocket);
    onClose();
  }, [updatePocket, onClose]);

  const onSubmit = handleSubmit(
    useCallback(
      (data) => {
        addUpdatePocket(data);
        closeForm();
      },
      [addUpdatePocket, closeForm]
    )
  );

  return {
    closeForm,
    control,
    isOpen,
    isUpdate,
    onClickPocketCard,
    onOpen,
    onSubmit,
    pocketList,
  };
};
