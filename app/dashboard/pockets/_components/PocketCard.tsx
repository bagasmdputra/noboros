import { getElement } from "@/components/PocketIcon";
import { Pocket } from "@/db/db.model";
import { currency } from "@/utils/number";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "@nextui-org/react";

type PocketCardProps = {
  pocket: Pocket;
  onClick: () => void;
};
export const PocketCard: React.FC<PocketCardProps> = ({ pocket, onClick }) => {
  const { isActive, icon, name, limit } = pocket;

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
        <FontAwesomeIcon icon={getElement(icon)} size="2x" />
        <div className="text-medium font-thin">{name}</div>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <FontAwesomeIcon
          icon={faCircle}
          color={isActive ? "green" : "grey"}
          size="xs"
        />
        <div className="text-medium font-bold ">{currency(limit)}</div>
      </div>
    </Card>
  );
};
