"use client";
import { getElement } from "@/components/PocketIcon";
import { usePocketConnection } from "@/hooks/usePocketConnection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BudgetProgress from "./BudgetProgress";

export const BudgetOverview = () => {
  const { pocketList } = usePocketConnection();
  return (
    <div className="flex flex-col items-center m-4">
      <h3 className="text-medium font-bold">Budget Summary</h3>
      <p className="text-small mb-8">This Month</p>

      <div className="flex flex-col gap-4 w-full">
        {pocketList.map((item) => (
          <div key={item.id} className="flex flex-col w-[90vw] gap-3">
            <div className="flex flex-row gap-4">
              <FontAwesomeIcon
                icon={getElement(item.icon)}
                size="2x"
                color="fff"
              />
              <p>{item.name}</p>
            </div>
            <BudgetProgress currentExpense={100} budgetLimit={500} />
          </div>
        ))}
      </div>
    </div>
  );
};
