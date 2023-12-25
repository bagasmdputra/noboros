import { Transaction } from "@/db/db.model";
import {
  defaultTransaction,
  useTransactionConnection,
} from "@/hooks/useTransactionConnection";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { ObjectSchema, boolean, number, object, string } from "yup";
import { useCallback } from "react";

const schema: ObjectSchema<Transaction> = object({
  id: number().optional(),
  name: string().required(),
  date: string().required(),
  pocketId: number().required(),
  sourceId: number().required(),
  amount: number().required(),
  note: string(),
  status: string(),
});

export const useTransaction = () => {
  const { transactionList, addUpdateTransaction } = useTransactionConnection();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleSubmit, control, setValue, getValues } = useForm<Transaction>({
    defaultValues: defaultTransaction,
    resolver: yupResolver(schema),
  });

  const isUpdate = !!getValues("id");
  const updateTransaction = useCallback(
    (transaction: Transaction) => {
      setValue("id", transaction.id);
      setValue("name", transaction.name, { shouldValidate: false });
      setValue("date", transaction.date, { shouldValidate: false });
      setValue("pocketId", transaction.pocketId, { shouldValidate: false });
      setValue("sourceId", transaction.sourceId, { shouldValidate: false });
      setValue("amount", transaction.amount, { shouldValidate: false });
      setValue("note", transaction.note, { shouldValidate: false });
      setValue("status", transaction.status, { shouldValidate: false });
    },
    [setValue]
  );

  const onClickTransactionCard = useCallback(
    (transaction: Transaction) => {
      updateTransaction(transaction);
      onOpen();
    },
    [updateTransaction, onOpen]
  );

  const closeForm = useCallback(() => {
    updateTransaction(defaultTransaction);
    onClose();
  }, [updateTransaction, onClose]);

  const onSubmit = handleSubmit(
    useCallback(
      (data) => {
        addUpdateTransaction(data);
        closeForm();
      },
      [addUpdateTransaction, closeForm]
    )
  );

  return {
    closeForm,
    control,
    isOpen,
    isUpdate,
    onClickTransactionCard,
    onOpen,
    onSubmit,
    transactionList,
  };
};
