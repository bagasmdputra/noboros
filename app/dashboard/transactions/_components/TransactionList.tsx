import { Transaction } from "@/db/db.model";
import { TransactionCard } from "./TransactionCard";

export const TransactionList: React.FC<{
  transactionList: Transaction[];
  onClickTransactionCard: (transaction: Transaction) => void;
}> = ({ transactionList, onClickTransactionCard }) => {
  return (
    <>
      {transactionList?.map((transaction, index) => (
        <TransactionCard
          key={index}
          transaction={transaction}
          onClick={() => onClickTransactionCard(transaction)}
        />
      ))}
    </>
  );
};
