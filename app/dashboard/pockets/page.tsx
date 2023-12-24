"use client";
import { InputField } from "@/components/InputField";
import {
  PocketIconType,
  getElement,
  pocketIconList,
} from "@/components/PocketIcon";
import { SelectField } from "@/components/SelectField";
import { SwitchField } from "@/components/SwitchField";
import { Pocket } from "@/db/db.model";
import { defaultPocket, usePocket } from "@/hooks/usePocket";
import { currency, currencyString } from "@/utils/number";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { ObjectSchema, boolean, number, object, string } from "yup";

import { NumberFormatBase } from "react-number-format";
import { CurrencyInputField } from "@/components/CurrencyInputField";
const PocketPage: FC = () => {
  const schema: ObjectSchema<Pocket> = object({
    id: number().optional(),
    name: string().required(),
    limit: number().min(100000).required(),
    icon: string().required(),
    isActive: boolean().required(),
  });

  const { handleSubmit, control, setValue, getValues } = useForm<Pocket>({
    defaultValues: defaultPocket,
    resolver: yupResolver(schema),
  });

  const { pocketList, addUpdatePocket, toggleActive } = usePocket();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const updatePocket = (pocket: Pocket) => {
    setValue("icon", pocket.icon);
    setValue("id", pocket.id);
    setValue("isActive", pocket.isActive);
    setValue("limit", pocket.limit);
    setValue("name", pocket.name);
  };

  const closeForm = () => {
    updatePocket(defaultPocket);
    onClose();
  };
  const onSubmit = handleSubmit((data) => {
    addUpdatePocket(data);
    closeForm();
  });
  const Pockets = () => {
    return (
      <>
        {pocketList?.map((i, index: number) => {
          return (
            <Card
              key={index}
              className={`flex flex-row flex-auto p-4 gap-4 justify-between items-center ${
                !i.isActive ? "bg-gray-900" : ""
              }`}
              isPressable
              isHoverable={i.isActive}
              onPress={() => {
                updatePocket(i);
                onOpen();
              }}
            >
              <div className="flex flex-row gap-3 items-center">
                <FontAwesomeIcon icon={getElement(i.icon)} size="2x" />
                <div className="text-medium font-thin">{i.name}</div>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <FontAwesomeIcon
                  icon={faCircle}
                  color={i.isActive ? "green" : "grey"}
                  size="xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleActive(i);
                  }}
                />

                <div className="text-medium font-bold ">
                  {currency(i.limit)}
                </div>
              </div>
            </Card>
          );
        })}
      </>
    );
  };

  const FormModal = () => {
    const [backdrop, setBackdrop] = useState("opaque");

    const handleOpen = () => {
      setBackdrop(backdrop);
      onOpen();
    };

    return (
      <>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="flat"
            color="primary"
            onPress={handleOpen}
            className="capitalize"
          >
            Create a new Pocket
          </Button>
        </div>
        <Modal
          backdrop="blur"
          isOpen={isOpen}
          onClose={closeForm}
          placement="auto"
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {getValues("id") ? "Update" : "Add"}
                </ModalHeader>
                <ModalBody className="flex-auto gap-2">
                  <div className="flex flex-row gap-3 items-center">
                    <SelectField
                      items={pocketIconList}
                      name="icon"
                      aria-label="Select Icon"
                      placeholder="Icon"
                      className="w-[150px]"
                      classNames={{
                        listboxWrapper: "max-h-[400px] flex justify-center",
                      }}
                      control={control}
                      renderValue={(items) => {
                        return items.map((i) => (
                          <div className="flex gap-2 items-center">
                            <FontAwesomeIcon
                              icon={i.data?.element ?? faCircle}
                              size="2x"
                            />
                          </div>
                        ));
                      }}
                    >
                      {(i: PocketIconType) => (
                        <SelectItem key={i.name} textValue={i.name}>
                          <div className="flex gap-2 items-center">
                            <FontAwesomeIcon icon={i.element} size="2x" />
                          </div>
                        </SelectItem>
                      )}
                    </SelectField>
                    <InputField
                      type="text"
                      control={control}
                      name="name"
                      label="Pocket Name"
                    />
                  </div>
                  <CurrencyInputField
                    control={control}
                    name="limit"
                    label="Budget Limit"
                    description="monthly budget limit"
                  />

                  {getValues("id") && (
                    <div className="flex flex-row-reverse">
                      <SwitchField
                        control={control}
                        name="isActive"
                        color="success"
                      />
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={onSubmit} variant="bordered">
                    {getValues("id") ? "Update" : "Add"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  };

  // Add and Update Form Component
  return (
    <div className="flex gap-4 flex-col max-w-md mx-2 sm:mx-auto">
      <div className="text-large text-center mt-4 mb-1 ">Pocket</div>
      <FormModal />
      <Pockets />
    </div>
  );
};
export default PocketPage;
