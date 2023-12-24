import { getElement } from "@/components/PocketIcon";
import { Pocket } from "@/db/db.model";
import { currency } from "@/utils/number";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "@nextui-org/react";

export const Pockets = ({
  onClickPocketCard,
  pocketList,
}: {
  pocketList: Pocket[];
  onClickPocketCard: (pocket: Pocket) => void;
}) => {
  return (
    <>
      {pocketList?.map((i, index: number) => {
        return (
          <Card
            key={index}
            className={`flex flex-row flex-auto p-4 gap-4 justify-between items-center ${
              !i.isActive ? "bg-gray-900" : ""
            }`}
            isPressable
            isHoverable={i.isActive}
            onPress={() => {
              onClickPocketCard(i);
            }}
          >
            <div className="flex flex-row gap-3 items-center">
              <FontAwesomeIcon icon={getElement(i.icon)} size="2x" />
              <div className="text-medium font-thin">{i.name}</div>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <FontAwesomeIcon
                icon={faCircle}
                color={i.isActive ? "green" : "grey"}
                size="xs"
              />

              <div className="text-medium font-bold ">{currency(i.limit)}</div>
            </div>
          </Card>
        );
      })}
    </>
  );
};
