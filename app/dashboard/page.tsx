"use client";
import { Transaction } from "@/db/db.model";
import { usePocketConnection } from "@/hooks/usePocketConnection";
import { defaultTransaction, useTransaction } from "@/hooks/useTransaction";
import { defaultDate } from "@/utils/day";
import { currency } from "@/utils/number";
import {
  Button,
  Card,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

const StudentMngmt: FC = () => {
  const { transactionList, addTransaction } = useTransaction();
  const { register, handleSubmit, getFieldState } = useForm<Transaction>({
    defaultValues: defaultTransaction,
  });

  const { pocketList } = usePocketConnection();

  const onSubmit = handleSubmit((data) => {
    addTransaction(data);
  });

  const Transactions = () => {
    return (
      <>
        {transactionList?.map((i, index: number) => {
          return (
            <Card
              key={index}
              className="flex flex-col flex-auto p-4 gap-4"
              isPressable
              onPress={() => console.log("item pressed")}
            >
              <div className="text-xs ">{defaultDate(i.date)}</div>
              <div className="flex flex-row justify-between w-full">
                <div className="text-medium font-thin">{i.name}</div>
                <div className="text-medium font-bold">
                  {currency(i.amount)}
                </div>
              </div>
            </Card>
          );
        })}
      </>
    );
  };

  const FormModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop, setBackdrop] = useState("opaque");
    const todayDate = dayjs().toISOString().substring(0, 10);

    const handleOpen = () => {
      setBackdrop(backdrop);
      onOpen();
    };

    return (
      <>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="flat"
            color="secondary"
            onPress={handleOpen}
            className="capitalize"
          >
            Create a new Transaction
          </Button>
        </div>
        <Modal
          backdrop="blur"
          isOpen={isOpen}
          onClose={onClose}
          placement="auto"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Modal Title
                </ModalHeader>
                <ModalBody className="flex-auto gap-2">
                  <Input
                    type="date"
                    {...register("date", {
                      required: true,
                    })}
                    label="Date"
                    defaultValue={todayDate}
                    isInvalid={!!getFieldState("date").error}
                    errorMessage={getFieldState("date").error?.type}
                  />
                  <Input
                    type="text"
                    {...register("name", { required: true })}
                    label="Transaction Name"
                    isInvalid={!!getFieldState("name").error}
                    errorMessage={getFieldState("name").error?.type}
                  />

                  <Input
                    type="number"
                    {...register("amount", {
                      required: true,
                      valueAsNumber: true,
                    })}
                    label="Amount"
                    isInvalid={!!getFieldState("amount").error}
                    errorMessage={getFieldState("amount").error?.type}
                  />
                  <Select
                    placeholder="Select a pocket"
                    {...register("pocketId", {
                      required: true,
                      valueAsNumber: true,
                    })}
                    label="pocketId"
                    isInvalid={!!getFieldState("pocketId").error}
                    errorMessage={getFieldState("pocketId").error?.type}
                  >
                    {pocketList?.map((pocket, idx) => (
                      <SelectItem
                        key={pocket?.id ?? idx}
                        value={Number(pocket.id)}
                      >
                        {pocket.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    type="text"
                    {...register("sourceId", { required: true })}
                    label="sourceId"
                    isInvalid={!!getFieldState("sourceId").error}
                    errorMessage={getFieldState("sourceId").error?.type}
                  />
                  <Textarea
                    type="text"
                    {...register("note")}
                    label="note"
                    isInvalid={!!getFieldState("note").error}
                    errorMessage={getFieldState("note").error?.type}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" onClick={onSubmit}>
                    Submit
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
    <div className="flex gap-4 flex-col max-w-3xl mx-2 md:mx-auto">
      <div className="text-large text-center mt-4 mb-1">Transaction</div>
      <FormModal />
      <Transactions />
    </div>
  );
};
export default StudentMngmt;
