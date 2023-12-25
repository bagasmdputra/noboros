"use client";

import { FC } from "react";

import { FormModal } from "./_components/FormModal";
import { PocketList } from "./_components/PocketList";
import { usePocket } from "./_hooks/usePocket";
const PocketPage: FC = () => {
  const {
    closeForm,
    control,
    isOpen,
    isUpdate,
    onClickPocketCard,
    onOpen,
    onSubmit,
    pocketList,
  } = usePocket();

  return (
    <div className="flex gap-4 flex-col max-w-md mx-2 sm:mx-auto">
      <div className="text-large text-center mt-4 mb-1 ">Pocket</div>
      <FormModal
        isUpdate={isUpdate}
        isOpen={isOpen}
        control={control}
        onOpen={onOpen}
        onClose={closeForm}
        onSubmit={onSubmit}
      />
      <PocketList
        pocketList={pocketList}
        onClickPocketCard={onClickPocketCard}
      />
    </div>
  );
};
export default PocketPage;
