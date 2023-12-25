import { getElement } from "@/components/PocketIcon";
import { Pocket, Transaction } from "@/db/db.model";
import { defaultDate } from "@/utils/day";
import { currency } from "@/utils/number";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Tooltip } from "@nextui-org/react";
import { getBankByCode } from "../../fund-source/_constants";
import Image from "next/image";
import { usePocketConnection } from "@/hooks/usePocketConnection";
import { useFundSourceConnection } from "@/hooks/useFundSourceConnection";

type TransactionCardProps = {
  transaction: Transaction;
  onClick: () => void;
};
export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  onClick,
}) => {
  const { date, name, amount, pocketId, sourceId } = transaction;
  const pocket = usePocketConnection().getPocket(pocketId);
  const fundSource = useFundSourceConnection().getFundSource(sourceId);

  return (
    <Card
      className="flex flex-col flex-auto p-4 gap-4"
      isPressable
      isHoverable
      onPress={onClick}
    >
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col gap-2">
          <div className="text-xs ">{defaultDate(date)}</div>
          <div className="text-medium font-thin flex flex-grow">{name}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-3 items-center">
            <Tooltip content={pocket?.name}>
              <FontAwesomeIcon
                className="flex-shrink-0"
                icon={getElement(pocket?.icon ?? "") ?? faCircle}
                size="sm"
              />
            </Tooltip>
            <Tooltip content={fundSource?.name}>
              <Image
                src={getBankByCode(fundSource?.icon ?? "008").imagePath}
                alt={"kaka"}
                width={60}
                height={40}
              />
            </Tooltip>
          </div>
          <div className="text-medium font-bold">{currency(amount)}</div>
        </div>
      </div>
    </Card>
  );
};
