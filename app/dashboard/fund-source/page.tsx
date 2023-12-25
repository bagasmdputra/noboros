"use client";

import { FC } from "react";

import { FormModal } from "./_components/FormModal";
import { FundSourceList } from "./_components/FundSourceList";
import { useFundSource } from "./_hooks/useFundSource";

const FundSourcePage: FC = () => {
  const {
    closeForm,
    control,
    isOpen,
    isUpdate,
    onClickFundSourceCard,
    onOpen,
    onSubmit,
    fundSourceList,
  } = useFundSource();

  return (
    <div className="flex gap-4 flex-col max-w-md mx-2 sm:mx-auto">
      <div className="text-large text-center mt-4 mb-1 ">Source of Fund</div>
      <FormModal
        isUpdate={isUpdate}
        isOpen={isOpen}
        control={control}
        onOpen={onOpen}
        onClose={closeForm}
        onSubmit={onSubmit}
      />
      <FundSourceList
        fundSourceList={fundSourceList}
        onClickFundSourceCard={onClickFundSourceCard}
      />
    </div>
  );
};

export default FundSourcePage;
