import { FundSource } from "@/db/db.model";
import { FundSourceCard } from "./FundSourceCard";

export const FundSourceList: React.FC<{
  fundSourceList: FundSource[];
  onClickFundSourceCard: (fundSource: FundSource) => void;
}> = ({ fundSourceList, onClickFundSourceCard }) => {
  return (
    <>
      {fundSourceList?.map((fundSource, index) => (
        <FundSourceCard
          key={index}
          fundSource={fundSource}
          onClick={() => onClickFundSourceCard(fundSource)}
        />
      ))}
    </>
  );
};
