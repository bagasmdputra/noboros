import { FundSource } from "@/db/db.model";
import { Card } from "@nextui-org/react";
import Image from "next/image";
import { getBankByCode } from "../_constants";

type FundSourceCardProps = {
  fundSource: FundSource;
  onClick: () => void;
};

export const FundSourceCard: React.FC<FundSourceCardProps> = ({
  fundSource,
  onClick,
}) => {
  const { isActive, name, icon } = fundSource;

  const { name: bankName, imagePath } = getBankByCode(icon);
  console.log(imagePath);
  return (
    <Card
      className={`flex flex-row flex-auto p-4 gap-4 justify-between items-center ${
        !isActive ? "bg-gray-900" : ""
      }`}
      isPressable
      isHoverable={isActive}
      onPress={onClick}
    >
      <div className="flex flex-row gap-3 items-center">
        <Image src={imagePath} alt={bankName} width={100} height={60} />

        <div className="text-medium font-thin">{name}</div>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <div className="text-medium font-bold ">{}</div>
      </div>
    </Card>
  );
};
