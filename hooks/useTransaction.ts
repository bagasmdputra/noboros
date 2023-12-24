import { Transaction, db } from "@/db/db.model";
import dayjs from "dayjs";
import { useLiveQuery } from "dexie-react-hooks";

export const defaultTransaction: Transaction = {
  name: "",
  date: "",
  pocketId: 0,
  sourceId: 0,
  amount: 0,
  note: "",
  status: "",
};

export const useTransaction = () => {
  // dexie hook to get live data
  const transactionList = useLiveQuery(() => db.transactions.toArray());

  // add Transaction
  const addTransaction = async (transaction: Transaction) => {
    await db.transactions.add(transaction);
  };

  // update Transaction
  const updateTransaction = async (transaction: Transaction) => {
    await db.transactions.put(transaction);
  };

  // delete Transaction
  const deleteTransaction = async (id: number) => {
    await db.transactions.delete(id);
  };

  return {
    addTransaction,
    deleteTransaction,
    transactionList,
    updateTransaction,
  };
};
