import { automationApi } from "@/apis/automation";
import { deviceApi } from "@/apis/device";
import { parseResponseError } from "@/apis/error";
import {
  Automation,
  AutomationAction,
  AutomationActionDeviceStateEnum,
  AutomationCondition,
  AutomationConditionConditionOperatorEnum,
  AutomationConditionConditionTypeEnum,
} from "@/apis/openapi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { randomIntFromInterval } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dispatch, FC, Fragment, SetStateAction, useState } from "react";
import { CONDITION_OPERATOR_TO_LABEL } from "./constants";

const AutomationCondition: FC<{
  condition: AutomationCondition;
  setConditions: Dispatch<SetStateAction<AutomationCondition[]>>;
}> = ({ condition, setConditions }) => {
  const { data: dataDevices } = useQuery({
    queryKey: ["devices"],
    queryFn: () => deviceApi.getDevices(),
  });

  if (condition.condition_type === AutomationConditionConditionTypeEnum.Cron) {
    const cron_expression = condition.cron_expression!.split(" ");

    return (
      <Card>
        <CardContent className="flex gap-2 text-center pt-4">
          <div className="flex flex-col gap-2 w-16">
            <Input
              value={cron_expression[0]}
              onChange={(e) =>
                setConditions((conditions) =>
                  conditions.map((c) =>
                    c.id === condition.id
                      ? {
                          ...c,
                          cron_expression: `${e.target.value} ${cron_expression[1]} ${cron_expression[2]} ${cron_expression[3]} ${cron_expression[4]}`,
                        }
                      : c,
                  ),
                )
              }
            />
            <p className="text-sm text-muted-foreground text-center">Minute</p>
          </div>
          <div className="flex flex-col gap-2 w-16">
            <Input
              className="w-16"
              value={cron_expression[1]}
              onChange={(e) =>
                setConditions((conditions) =>
                  conditions.map((c) =>
                    c.id === condition.id
                      ? {
                          ...c,
                          cron_expression: `${cron_expression[0]} ${e.target.value} ${cron_expression[2]} ${cron_expression[3]} ${cron_expression[4]}`,
                        }
                      : c,
                  ),
                )
              }
            />
            <p className="text-sm text-muted-foreground">Hour</p>
          </div>
          <div className="flex flex-col gap-2 w-16">
            <Input
              className="w-16"
              value={cron_expression[2]}
              onChange={(e) =>
                setConditions((conditions) =>
                  conditions.map((c) =>
                    c.id === condition.id
                      ? {
                          ...c,
                          cron_expression: `${cron_expression[0]} ${cron_expression[1]} ${e.target.value} ${cron_expression[3]} ${cron_expression[4]}`,
                        }
                      : c,
                  ),
                )
              }
            />
            <p className="text-sm text-muted-foreground">Day (Month)</p>
          </div>
          <div className="flex flex-col gap-2 w-16">
            <Input
              className="w-16"
              value={cron_expression[3]}
              onChange={(e) =>
                setConditions((conditions) =>
                  conditions.map((c) =>
                    c.id === condition.id
                      ? {
                          ...c,
                          cron_expression: `${cron_expression[0]} ${cron_expression[1]} ${cron_expression[2]} ${e.target.value} ${cron_expression[4]}`,
                        }
                      : c,
                  ),
                )
              }
            />
            <p className="text-sm text-muted-foreground">Month</p>
          </div>
          <div className="flex flex-col gap-2 w-16">
            <Input
              className="w-16"
              value={cron_expression[4]}
              onChange={(e) =>
                setConditions((conditions) =>
                  conditions.map((c) =>
                    c.id === condition.id
                      ? {
                          ...c,
                          cron_expression: `${cron_expression[0]} ${cron_expression[1]} ${cron_expression[2]} ${cron_expression[3]} ${e.target.value}`,
                        }
                      : c,
                  ),
                )
              }
            />
            <p className="text-sm text-muted-foreground">Day (Week)</p>
          </div>
          <Button
            variant="destructive"
            onClick={() => {
              setConditions((conditions) =>
                conditions.filter((c) => c.id !== condition.id),
              );
            }}
          >
            Delete
          </Button>
        </CardContent>
      </Card>
    );
  }

  const selectedDevice = dataDevices?.devices.find(
    (device) => device.id === condition.device_id,
  );

  return (
    <Card>
      <CardContent className="flex gap-2 text-center pt-4">
        <div className="flex flex-col gap-2 w-48">
          <Select
            value={String(condition.device_id)}
            onValueChange={(value) => {
              setConditions((conditions) =>
                conditions.map((c) =>
                  c.id === condition.id
                    ? { ...c, device_id: Number(value) }
                    : c,
                ),
              );
            }}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Device" />
            </SelectTrigger>
            <SelectContent>
              {dataDevices?.devices.map((device) => (
                <SelectItem key={device.id} value={String(device.id)}>
                  {device.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground text-center">Device</p>
        </div>
        <div className="flex flex-col gap-2 w-44">
          <Select
            value={condition.device_property || undefined}
            onValueChange={(value) => {
              setConditions((conditions) =>
                conditions.map((c) =>
                  c.id === condition.id ? { ...c, device_property: value } : c,
                ),
              );
            }}
            required
            disabled={!selectedDevice}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Property" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(selectedDevice?.current_extra_data || {}).map(
                (state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">Property</p>
        </div>
        <div className="flex flex-col gap-2 w-24">
          <Select
            value={condition.condition_operator || undefined}
            onValueChange={(value) => {
              setConditions((conditions) =>
                conditions.map((c) =>
                  c.id === condition.id
                    ? {
                        ...c,
                        condition_operator:
                          value as AutomationConditionConditionOperatorEnum,
                      }
                    : c,
                ),
              );
            }}
            required
            disabled={!selectedDevice}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Operator" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(AutomationConditionConditionOperatorEnum).map(
                (state) => (
                  <SelectItem key={state} value={state}>
                    {CONDITION_OPERATOR_TO_LABEL[state]}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">Operator</p>
        </div>
        <div className="flex flex-col gap-2 w-24">
          <Input
            type="number"
            value={condition.condition_value ?? ""}
            onChange={(e) => {
              setConditions((conditions) =>
                conditions.map((c) =>
                  c.id === condition.id
                    ? { ...c, condition_value: Number(e.target.value) }
                    : c,
                ),
              );
            }}
            required
            disabled={!selectedDevice}
          />
          <p className="text-sm text-muted-foreground">Value</p>
        </div>
        <Button
          variant="destructive"
          onClick={() => {
            setConditions((conditions) =>
              conditions.filter((c) => c.id !== condition.id),
            );
          }}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

const AutomationActionEdit: FC<{
  automation: Automation;
  action: Omit<AutomationAction, "id"> | null;
  setAction: Dispatch<SetStateAction<Omit<AutomationAction, "id"> | null>>;
}> = ({ automation, action, setAction }) => {
  const { data: dataDevices } = useQuery({
    queryKey: ["devices"],
    queryFn: () => deviceApi.getDevices(),
  });

  return (
    <Card>
      <CardContent className="flex gap-2 text-center pt-4">
        <div className="flex flex-col gap-2 w-48">
          <Select
            value={String(action?.device_id || "")}
            onValueChange={(value) => {
              setAction((action) => ({
                automation_id: automation.id,
                device_extra_data: null,
                device_state: AutomationActionDeviceStateEnum.Off,
                device_value: null,
                ...action,
                device_id: Number(value),
              }));
            }}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Device" />
            </SelectTrigger>
            <SelectContent>
              {dataDevices?.devices.map((device) => (
                <SelectItem key={device.id} value={String(device.id)}>
                  {device.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground text-center">Device</p>
        </div>
        <div className="flex flex-col gap-2 w-44">
          <Select
            value={action?.device_state || undefined}
            onValueChange={(value) => {
              setAction((action) => ({
                ...action!,
                device_state: value as AutomationActionDeviceStateEnum,
              }));
            }}
            disabled={!action}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(AutomationActionDeviceStateEnum).map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">State</p>
        </div>
        <div className="flex flex-col gap-2 w-24">
          <Input
            type="number"
            value={action?.device_value ?? ""}
            onChange={(e) => {
              setAction((action) => ({
                ...action!,
                device_id: Number(action?.device_id),
                device_value: Number(e.target.value),
              }));
            }}
            required
            disabled={!action}
          />
          <p className="text-sm text-muted-foreground">Value</p>
        </div>
      </CardContent>
    </Card>
  );
};

export const AutomationEditor: FC<{
  automation: Automation;
}> = ({ automation }) => {
  const [conditions, setConditions] = useState(automation.conditions || []);
  const [action, setAction] = useState<Omit<AutomationAction, "id"> | null>(
    automation.actions?.[0] || null,
  );

  const [openAdd, setOpenAdd] = useState(false);

  const queryClient = useQueryClient();

  const replaceAutomationConditionsMutation = useMutation({
    mutationFn: automationApi.replaceAutomationConditions,
    onSuccess: () => {
      toast({
        title: "Automation updated",
        description: "Automation conditions have been updated successfully.",
      });
      queryClient.invalidateQueries({
        queryKey: ["automation", automation.id],
      });
    },
    onError: (error) => {
      parseResponseError(error).then((error) => {
        toast({
          title: "Automation update failed",
          description: error.message,
          variant: "destructive",
        });
      });
    },
  });

  const replaceAutomationActionMutation = useMutation({
    mutationFn: automationApi.replaceAutomationAction,
    onSuccess: () => {
      toast({
        title: "Automation updated",
        description: "Automation action has been updated successfully.",
      });
      queryClient.invalidateQueries({
        queryKey: ["automation", automation.id],
      });
    },
    onError: (error) => {
      parseResponseError(error).then((error) => {
        toast({
          title: "Automation update failed",
          description: error.message,
          variant: "destructive",
        });
      });
    },
  });

  const updateConditions = () => {
    replaceAutomationConditionsMutation.mutate({
      automationId: automation.id,
      conditions,
    });
  };

  const updateAction = () => {
    if (!action) return;
    replaceAutomationActionMutation.mutate({
      automationId: automation.id,
      action: action,
    });
  };

  return (
    <div>
      <h3 className="text-lg font-bold">Conditions</h3>
      <div className="flex flex-col gap-4 items-start py-4">
        {conditions.map((condition, index) => (
          <Fragment key={condition.id}>
            <AutomationCondition
              condition={condition}
              setConditions={setConditions}
            />
            {index !== conditions.length - 1 && (
              <Badge variant="secondary" className="uppercase">
                {automation.logical_operator}
              </Badge>
            )}
          </Fragment>
        ))}
        <Popover open={openAdd} onOpenChange={setOpenAdd}>
          <PopoverTrigger asChild>
            <Button
              variant="link"
              disabled={
                conditions.filter(
                  (condition) =>
                    condition.condition_type ===
                    AutomationConditionConditionTypeEnum.Cron,
                ).length > 0
              }
            >
              Add condition
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-36">
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => {
                setConditions([
                  ...conditions,
                  {
                    id: randomIntFromInterval(100, 200),
                    condition_type: AutomationConditionConditionTypeEnum.Cron,
                    automation_id: automation.id,
                    cron_expression: "* * * * *",
                    device_id: null,
                    condition_operator:
                      AutomationConditionConditionOperatorEnum.Eq,
                    device_property: null,
                    condition_value: null,
                  },
                ]);
                setOpenAdd(false);
              }}
              disabled={
                conditions.filter(
                  (condition) =>
                    condition.condition_type ===
                    AutomationConditionConditionTypeEnum.Device,
                ).length > 0
              }
            >
              Cron Job
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => {
                setConditions([
                  ...conditions,
                  {
                    id: randomIntFromInterval(100, 200),
                    condition_type: AutomationConditionConditionTypeEnum.Device,
                    automation_id: automation.id,
                    cron_expression: null,
                    device_id: null,
                    condition_operator:
                      AutomationConditionConditionOperatorEnum.Eq,
                    device_property: null,
                    condition_value: null,
                  },
                ]);
                setOpenAdd(false);
              }}
            >
              Device Data
            </Button>
          </PopoverContent>
        </Popover>
        <Button
          disabled={
            replaceAutomationConditionsMutation.isPending || !conditions.length
          }
          onClick={updateConditions}
        >
          Save
        </Button>
      </div>
      <h3 className="text-lg font-bold">Action</h3>
      <div className="flex flex-col gap-4 items-start py-4">
        <AutomationActionEdit
          automation={automation}
          action={action}
          setAction={setAction}
        />
        <Button
          disabled={replaceAutomationActionMutation.isPending || !action}
          onClick={updateAction}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
