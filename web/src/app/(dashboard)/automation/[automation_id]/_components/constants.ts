import { AutomationConditionConditionOperatorEnum } from "@/apis/openapi";

export const CONDITION_OPERATOR_TO_LABEL = {
  [AutomationConditionConditionOperatorEnum.Eq]: "=",
  [AutomationConditionConditionOperatorEnum.Neq]: "!=",
  [AutomationConditionConditionOperatorEnum.Gt]: ">",
  [AutomationConditionConditionOperatorEnum.Gte]: ">=",
  [AutomationConditionConditionOperatorEnum.Lt]: "<",
  [AutomationConditionConditionOperatorEnum.Lte]: "<=",
};
