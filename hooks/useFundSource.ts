import { FundSource, db } from "@/db/db.model";
import { useLiveQuery } from "dexie-react-hooks";
import { startCase } from "lodash-es";
import toast from "react-hot-toast";

export const defaultFundSource: FundSource = {
  name: "",
  icon: "",
  isActive: true,
};

export const useFundSource = () => {
  // dexie hook to get live data
  const fundSourceList =
    useLiveQuery(() => db.fundSources.toArray())?.sort((i, j) =>
      i.name < j.name ? -1 : 1
    ) ?? [];

  // add FundSource
  const addFundSource = async (fundSource: FundSource) => {
    if (fundSourceList.find((i) => i.name == startCase(fundSource.name)))
      return toast.error("FundSource Name should be unique");

    toast.promise(
      db.fundSources.add({ ...fundSource, name: startCase(fundSource.name) }),
      {
        loading: "Adding Your Fund Source",
        success: "Fund Source Added",
        error: "Error adding a fund Source",
      }
    );
  };

  // update FundSource
  const updateFundSource = async (fundSource: FundSource) => {
    await db.fundSources.put({
      ...fundSource,
      name: startCase(fundSource.name),
    });
  };

  // delete FundSource
  const toggleActive = async (fundSource: FundSource) => {
    await db.fundSources.put({
      ...fundSource,
      isActive: !fundSource.isActive,
    });
  };

  return {
    addFundSource,
    toggleActive,
    fundSourceList,
    updateFundSource,
  };
};
