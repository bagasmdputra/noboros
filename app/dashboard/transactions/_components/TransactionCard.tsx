import { getElement } from "@/components/PocketIcon";
import { Pocket, Transaction } from "@/db/db.model";
import { defaultDate } from "@/utils/day";
import { currency } from "@/utils/number";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "@nextui-org/react";

type TransactionCardProps = {
  transaction: Transaction;
  onClick: () => void;
};
export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  onClick,
}) => {
  const { date, name, amount } = transaction;

  return (
    <Card
      className="flex flex-col flex-auto p-4 gap-4"
      isPressable
      isHoverable
      onPress={onClick}
    >
      <div className="text-xs ">{defaultDate(date)}</div>
      <div className="flex flex-row justify-between w-full">
        <div className="text-medium font-thin">{name}</div>
        <div className="text-medium font-bold">{currency(amount)}</div>
      </div>
    </Card>
  );
};
