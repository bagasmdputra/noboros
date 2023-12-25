import { Transaction, db } from "@/db/db.model";
import dayjs from "dayjs";
import { useLiveQuery } from "dexie-react-hooks";
import toast from "react-hot-toast";

export const defaultTransaction: Transaction = {
  name: "",
  date: dayjs().toISOString().substring(0, 10),
  pocketId: 0,
  sourceId: 0,
  amount: 0,
  note: "",
  status: "",
};

export const useTransactionConnection = () => {
  const transactionList = useLiveQuery(() => db.transactions.toArray()) ?? [];

  const addUpdateTransaction = async (transaction: Transaction) => {
    const isUpdate = !!transaction.id;

    try {
      await toast.promise(
        isUpdate
          ? db.transactions.put(transaction)
          : db.transactions.add(transaction),
        {
          loading: `${isUpdate ? "Updating" : "Adding"} Your Transaction`,
          success: `Transaction ${isUpdate ? "Updated" : "Added"}`,
          error: `Error ${isUpdate ? "updating" : "adding"} a Transaction`,
        }
      );
    } catch (error) {
      console.error("Failed to add or update Transaction:", error);
    }
  };

  const deleteTransaction = async (id: number) => {
    await db.transactions.delete(id);
  };

  return {
    addUpdateTransaction,
    deleteTransaction,
    transactionList,
  };
};
