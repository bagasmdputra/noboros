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

export const usePocketConnection = () => {
  // dexie hook to get live data
  const pocketList =
    useLiveQuery(() => db.pockets.toArray())?.sort((i, j) => {
      return i.name < j.name ? -1 : 1;
    }) ?? [];

  // add or update Pocket
  const addUpdatePocket = async (pocket: Pocket) => {
    const checkDuplicateName = !!pocketList.find(
      (i) => i.id !== pocket.id && i.name == startCase(pocket.name)
    );

    if (checkDuplicateName) return toast.error("Pocket Name should be unique");

    const isUpdate = !!pocket.id;
    const payload = { ...pocket, name: startCase(pocket.name) };

    toast.promise(
      isUpdate ? db.pockets.put(payload) : db.pockets.add(payload),
      {
        loading: `${isUpdate ? "Updating" : "Adding"} Your Pocket`,
        success: `Pocket ${isUpdate ? "Updated" : "Added"}`,
        error: `Error ${isUpdate ? "updating" : "adding"} a pocket`,
      }
    );
  };

  // delete Pocket
  const toggleActive = async (pocket: Pocket) => {
    await db.pockets.put({
      ...pocket,
      isActive: !pocket.isActive,
    });
  };

  return {
    addUpdatePocket,
    toggleActive,
    pocketList,
  };
};
