import { CurrencyInputField } from "@/components/CurrencyInputField";
import { InputField } from "@/components/InputField";
import { getElement } from "@/components/PocketIcon";
import { SelectField } from "@/components/SelectField";
import { TextareaField } from "@/components/TextareaField";
import { FundSource, Pocket } from "@/db/db.model";
import { useFundSourceConnection } from "@/hooks/useFundSourceConnection";
import { usePocketConnection } from "@/hooks/usePocketConnection";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { getBankByCode } from "../../fund-source/_constants";

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
  const { pocketOptions } = usePocketConnection();
  const { fundSourceOptions } = useFundSourceConnection();

  return (
    <>
      <Button
        variant="flat"
        color="secondary"
        onPress={onOpen}
        className="capitalize"
      >
        Create a new Transaction
      </Button>

      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} placement="auto">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isUpdate ? "Update" : "Add"}
              </ModalHeader>
              <ModalBody className="flex-auto gap-2">
                <InputField
                  type="date"
                  control={control}
                  name="date"
                  label="Date"
                />
                <InputField
                  type="text"
                  name="name"
                  control={control}
                  label="Transaction Name"
                />

                <CurrencyInputField
                  type="number"
                  name="amount"
                  control={control}
                  label="Amount"
                />
                <SelectField
                  placeholder="Select a pocket"
                  name="pocketId"
                  items={pocketOptions}
                  label="Pocket"
                  control={control}
                  renderValue={(items) => {
                    return items.map((i) => (
                      <div key={i.key} className="flex items-center gap-2">
                        <FontAwesomeIcon
                          className="flex-shrink-0"
                          icon={getElement(i.data?.icon ?? "") ?? faCircle}
                          size="lg"
                        />
                        <div className="flex flex-col">
                          <span>{i.data?.name}</span>
                        </div>
                      </div>
                    ));
                  }}
                >
                  {(i: Pocket) => (
                    <SelectItem key={i.id!}>
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon
                          className="flex-shrink-0"
                          icon={getElement(i.icon ?? "") ?? faCircle}
                          size="lg"
                        />
                        <div className="flex flex-col">
                          <span>{i.name}</span>
                        </div>
                      </div>
                    </SelectItem>
                  )}
                </SelectField>
                <SelectField
                  placeholder="Select a Source of Fund"
                  name="sourceId"
                  items={fundSourceOptions}
                  label="Source of Fund"
                  control={control}
                  renderValue={(items) => {
                    return items.map((i) => (
                      <div
                        key={i.key}
                        className="flex items-center justify-between"
                      >
                        <div className="flex flex-col">
                          <span>{i.data?.name}</span>
                        </div>
                        <Image
                          src={getBankByCode(i.data?.icon ?? "008").imagePath}
                          alt={i.data?.name ?? ""}
                          width={80}
                          height={60}
                        />
                      </div>
                    ));
                  }}
                >
                  {(i: FundSource) => (
                    <SelectItem key={i.id!}>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span>{i.name}</span>
                        </div>
                        <Image
                          src={getBankByCode(i.icon).imagePath}
                          alt={i.name}
                          width={80}
                          height={60}
                        />
                      </div>
                    </SelectItem>
                  )}
                </SelectField>
                <TextareaField
                  type="text"
                  name="note"
                  label="note"
                  control={control}
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onClick={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onClick={onSubmit}>
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
