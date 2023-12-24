import { CurrencyInputField } from "@/components/CurrencyInputField";
import { InputField } from "@/components/InputField";
import { pocketIconList, PocketIconType } from "@/components/PocketIcon";
import { SelectField } from "@/components/SelectField";
import { SwitchField } from "@/components/SwitchField";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  SelectItem,
  ModalFooter,
} from "@nextui-org/react";
import { useState } from "react";
import { Control } from "react-hook-form";

export const FormModal = ({
  isUpdate,
  isOpen,
  onOpen,
  onClose,
  onSubmit,
  control,
}: {
  isUpdate: boolean;
  isOpen: boolean;
  control: Control<any, any>;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: () => void;
}) => {
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
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} placement="auto">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isUpdate ? "Update" : "Add"}
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
                      return items.map((i, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
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

                {isUpdate && (
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
                  {isUpdate ? "Update" : "Add"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
