import { getElement } from "@/components/PocketIcon";
import { Pocket } from "@/db/db.model";
import { currency } from "@/utils/number";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "@nextui-org/react";
import { PocketCard } from "./PocketCard";

export const PocketList: React.FC<{
  pocketList: Pocket[];
  onClickPocketCard: (pocket: Pocket) => void;
}> = ({ pocketList, onClickPocketCard }) => {
  return (
    <>
      {pocketList?.map((pocket, index) => (
        <PocketCard
          key={index}
          pocket={pocket}
          onClick={() => onClickPocketCard(pocket)}
        />
      ))}
    </>
  );
};
