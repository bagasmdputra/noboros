import { CurrencyInputField } from "@/components/CurrencyInputField";
import { InputField } from "@/components/InputField";
import { SelectField } from "@/components/SelectField";
import { SwitchField } from "@/components/SwitchField";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SelectItem,
} from "@nextui-org/react";
import Image from "next/image";
import { Control } from "react-hook-form";
import bankList, { Bank } from "../_constants";

type FormModalProps = {
  isUpdate: boolean;
  isOpen: boolean;
  control: Control<any, any>;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: () => void;
};

export const FormModal: React.FC<FormModalProps> = ({
  isUpdate,
  isOpen,
  control,
  onOpen,
  onClose,
  onSubmit,
}) => {
  return (
    <>
      <Button
        variant="flat"
        color="primary"
        onPress={onOpen}
        className="capitalize"
      >
        Create a new Source of Fund
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} placement="auto">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {isUpdate ? "Update" : "Add"}
          </ModalHeader>
          <ModalBody className="flex-auto gap-2">
            <div className="flex flex-row gap-3 items-center">
              <SelectField
                items={bankList}
                name="icon"
                aria-label="Select Icon"
                placeholder="Icon"
                className="w-[300px]"
                classNames={{
                  listboxWrapper: "max-h-[400px] flex justify-center",
                }}
                control={control}
                renderValue={(items) => {
                  return items.map((i, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <Image
                        src={i.data?.imagePath ?? ""}
                        alt={i.data?.name ?? ""}
                        width={100}
                        height={60}
                      />
                    </div>
                  ));
                }}
              >
                {(i: Bank) => (
                  <SelectItem key={i.code} textValue={i.code}>
                    <div className="flex gap-2 items-center">
                      <Image
                        src={i.imagePath}
                        alt={i.name}
                        width={100}
                        height={60}
                      />
                    </div>
                  </SelectItem>
                )}
              </SelectField>
              <InputField
                type="text"
                control={control}
                name="name"
                label="Source of Fund"
              />
            </div>

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
        </ModalContent>
      </Modal>
    </>
  );
};
