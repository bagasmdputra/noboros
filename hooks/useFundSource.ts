import { FundSource, db } from "@/db/db.model";
import { useLiveQuery } from "dexie-react-hooks";
import { startCase } from "lodash-es";
import toast from "react-hot-toast";

export const defaultFundSource: FundSource = {
  id: undefined,
  name: "",
  icon: "cart-shopping",
  isActive: true,
};

const sortByName = (i: FundSource, j: FundSource) => (i.name < j.name ? -1 : 1);

export const useFundSourceConnection = () => {
  const fundSourceList =
    useLiveQuery(() => db.fundSources.toArray())?.sort(sortByName) ?? [];

  const addUpdateFundSource = async (fundSource: FundSource) => {
    const checkDuplicateName = fundSourceList.some(
      (i) => i.id !== fundSource.id && i.name === startCase(fundSource.name)
    );

    if (checkDuplicateName) {
      toast.error("Source of Fund Name should be unique");
      return;
    }

    const isUpdate = !!fundSource.id;
    const payload = { ...fundSource, name: startCase(fundSource.name) };

    try {
      await toast.promise(
        isUpdate ? db.fundSources.put(payload) : db.fundSources.add(payload),
        {
          loading: `${isUpdate ? "Updating" : "Adding"} Your Source of Fund`,
          success: `Source of Fund ${isUpdate ? "Updated" : "Added"}`,
          error: `Error ${isUpdate ? "updating" : "adding"} a Source of Fund`,
        }
      );
    } catch (error) {
      console.error("Failed to add or update fund source:", error);
    }
  };

  const toggleActive = async (fundSource: FundSource) => {
    try {
      await db.fundSources.put({
        ...fundSource,
        isActive: !fundSource.isActive,
      });
    } catch (error) {
      console.error("Failed to toggle fund source:", error);
    }
  };

  return {
    fundSourceList,
    addUpdateFundSource,
    toggleActive,
  };
};
