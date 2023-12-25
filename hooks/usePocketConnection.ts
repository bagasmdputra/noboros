import { Pocket, db } from "@/db/db.model";
import { useLiveQuery } from "dexie-react-hooks";
import { startCase } from "lodash-es";
import toast from "react-hot-toast";

export const defaultPocket: Pocket = {
  id: undefined,
  name: "",
  limit: 0,
  icon: "cart-shopping",
  isActive: true,
};

const sortByName = (i: Pocket, j: Pocket) => (i.name < j.name ? -1 : 1);

export const usePocketConnection = () => {
  const pocketList =
    useLiveQuery(() => db.pockets.toArray())?.sort(sortByName) ?? [];

  const pocketOptions = pocketList.filter((i) => i.isActive);
  const getPocket = (id: number) => pocketList.find((i) => i.id == id);

  const addUpdatePocket = async (pocket: Pocket) => {
    const checkDuplicateName = pocketList.some(
      (i) => i.id !== pocket.id && i.name === startCase(pocket.name)
    );

    if (checkDuplicateName) {
      toast.error("Pocket Name should be unique");
      return;
    }

    const isUpdate = !!pocket.id;
    const payload = { ...pocket, name: startCase(pocket.name) };

    try {
      await toast.promise(
        isUpdate ? db.pockets.put(payload) : db.pockets.add(payload),
        {
          loading: `${isUpdate ? "Updating" : "Adding"} Your Pocket`,
          success: `Pocket ${isUpdate ? "Updated" : "Added"}`,
          error: `Error ${isUpdate ? "updating" : "adding"} a pocket`,
        }
      );
    } catch (error) {
      console.error("Failed to add or update pocket:", error);
    }
  };

  return {
    pocketList,
    getPocket,
    pocketOptions,
    addUpdatePocket,
  };
};
