import React from "react";
import { Progress } from "@nextui-org/react";

export default function BudgetProgress(props: {
  currentExpense: number;
  budgetLimit: number;
}) {
  return (
    <Progress
      label="Monthly expenses"
      size="lg"
      value={props.currentExpense}
      maxValue={props.budgetLimit}
      color="warning"
      formatOptions={{ style: "currency", currency: "IDR" }}
      showValueLabel={true}
      className="w-full"
    />
  );
}
