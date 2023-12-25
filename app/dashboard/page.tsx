"use client";
import { FC } from "react";
import { FormModal } from "./transactions/_components/FormModal";
import { TransactionList } from "./transactions/_components/TransactionList";
import { useTransaction } from "./transactions/_hooks/useTransaction";

const StudentMngmt: FC = () => {
  const {
    closeForm,
    control,
    isOpen,
    isUpdate,
    onClickTransactionCard,
    onOpen,
    onSubmit,
    transactionList,
  } = useTransaction();

  return (
    <div className="flex gap-4 flex-col max-w-3xl mx-2 md:mx-auto">
      <div className="text-large text-center mt-4 mb-1">Transaction</div>
      <FormModal
        isUpdate={isUpdate}
        isOpen={isOpen}
        control={control}
        onOpen={onOpen}
        onClose={closeForm}
        onSubmit={onSubmit}
      />
      <TransactionList
        transactionList={transactionList}
        onClickTransactionCard={onClickTransactionCard}
      />
    </div>
  );
};
export default StudentMngmt;
