import { Pocket } from "@/db/db.model";
import {
  defaultPocket,
  usePocketConnection,
} from "@/hooks/usePocketConnection";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { ObjectSchema, boolean, number, object, string } from "yup";

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
  const updatePocket = (pocket: Pocket) => {
    setValue("icon", pocket.icon);
    setValue("id", pocket.id);
    setValue("isActive", pocket.isActive);
    setValue("limit", pocket.limit);
    setValue("name", pocket.name);
  };

  const onClickPocketCard = (pocket: Pocket) => {
    updatePocket(pocket);
    onOpen();
  };

  const closeForm = () => {
    updatePocket(defaultPocket);
    onClose();
  };
  const onSubmit = handleSubmit((data) => {
    addUpdatePocket(data);
    closeForm();
  });

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
