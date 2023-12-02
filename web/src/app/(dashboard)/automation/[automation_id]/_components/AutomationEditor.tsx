import { Automation } from "@/apis/openapi";
import { Button } from "@/components/ui/button";
import { FC, useState } from "react";

export const AutomationEditor: FC<{
  automation: Automation;
}> = ({ automation }) => {
  const [conditions, setConditions] = useState(automation.conditions || []);

  return (
    <div>
      <h3 className="text-lg font-bold">Conditions</h3>
      <div className="flex flex-col gap-4 items-start py-4">
        <Button>Add condition</Button>
      </div>
      <h3 className="text-lg font-bold">Action</h3>
    </div>
  );
};
