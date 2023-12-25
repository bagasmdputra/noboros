import { CurrencyInputField } from "@/components/CurrencyInputField";
import { InputField } from "@/components/InputField";
import { SelectField } from "@/components/SelectField";
import { TextareaField } from "@/components/TextareaField";
import { useFundSourceConnection } from "@/hooks/useFundSourceConnection";
import { usePocketConnection } from "@/hooks/usePocketConnection";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SelectItem,
} from "@nextui-org/react";
import dayjs from "dayjs";
import { Control } from "react-hook-form";

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
  const todayDate = dayjs().toISOString().substring(0, 10);
  const { pocketList } = usePocketConnection();
  const { fundSourceList } = useFundSourceConnection();

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
                  defaultValue={todayDate}
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
                  label="Pocket"
                  control={control}
                >
                  {pocketList?.map((pocket, idx) => (
                    <SelectItem
                      key={pocket?.id ?? idx}
                      value={Number(pocket.id)}
                    >
                      {pocket.name}
                    </SelectItem>
                  ))}
                </SelectField>
                <SelectField
                  placeholder="Select a Source of Fund"
                  name="sourceId"
                  label="Source of Fund"
                  control={control}
                >
                  {fundSourceList?.map((pocket, idx) => (
                    <SelectItem
                      key={pocket?.id ?? idx}
                      value={Number(pocket.id)}
                    >
                      {pocket.name}
                    </SelectItem>
                  ))}
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
