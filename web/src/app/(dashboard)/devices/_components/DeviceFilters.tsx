import { api } from "@/apis/api";
import {
  DeviceCurrentStateEnum,
  DeviceDeviceCategoryEnum,
} from "@/apis/openapi";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown, Filter } from "lucide-react";
import { FC, useEffect, useMemo, useState } from "react";
import { DEVICE_CATEGORY_ENUM_TO_LABEL } from "./constants";

const LocationFilter: FC<{
  deviceDescriptionLocationFilter: string;
  setDeviceDescriptionLocationFilter: (location: string) => void;
}> = ({
  deviceDescriptionLocationFilter,
  setDeviceDescriptionLocationFilter,
}) => {
  const { data } = useQuery({
    queryKey: ["devices"],
    queryFn: () => api.getDevices(),
  });
  const deviceLocations = useMemo(() => {
    if (!data) return [];
    return Array.from(
      new Set(
        data.devices
          .map((device) => device.description_location)
          .filter(Boolean),
      ),
    ) as string[];
  }, [data]);

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between font-normal"
        >
          {deviceDescriptionLocationFilter !== "*"
            ? deviceDescriptionLocationFilter
            : "Select location..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search location..." />
          <CommandEmpty>No location found.</CommandEmpty>
          <CommandGroup>
            {deviceLocations.map((location) => (
              <CommandItem
                key={location}
                value={location}
                onSelect={(currentValue) => {
                  setDeviceDescriptionLocationFilter(
                    deviceDescriptionLocationFilter === location
                      ? "*"
                      : location,
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    deviceDescriptionLocationFilter === location
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {location}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export const DeviceFilters: FC<{
  filterDeviceIds: number[] | undefined;
  setFilterDeviceIds: (deviceIds: number[] | undefined) => void;
}> = ({ filterDeviceIds, setFilterDeviceIds }) => {
  const [stateFilter, setStateFilter] = useState<DeviceCurrentStateEnum | "*">(
    "*",
  );
  const [deviceCategoryFilter, setDeviceCategoryFilter] = useState<
    DeviceDeviceCategoryEnum | "*"
  >("*");
  const [deviceDescriptionLocationFilter, setDeviceDescriptionLocationFilter] =
    useState<string>("*");

  const [open, setOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["devices"],
    queryFn: () => api.getDevices(),
  });

  useEffect(() => {
    if (!data?.devices) return;
    if (
      stateFilter === "*" &&
      deviceCategoryFilter === "*" &&
      deviceDescriptionLocationFilter === "*"
    ) {
      setFilterDeviceIds(undefined);
      return;
    }
    let devices = data.devices;
    if (stateFilter !== "*") {
      devices = devices.filter(
        (device) => device.current_state === stateFilter,
      );
    }
    if (deviceCategoryFilter !== "*") {
      devices = devices.filter(
        (device) => device.device_category === deviceCategoryFilter,
      );
    }
    if (deviceDescriptionLocationFilter !== "*") {
      devices = devices.filter(
        (device) =>
          device.description_location === deviceDescriptionLocationFilter,
      );
    }
    if (devices.length === 0) {
      setFilterDeviceIds([0]); // FIXME: Workaround for empty array because there is no device with id 0
      return;
    }
    setFilterDeviceIds(devices.map((device) => device.id));
  }, [
    data?.devices,
    stateFilter,
    deviceCategoryFilter,
    deviceDescriptionLocationFilter,
    setFilterDeviceIds,
  ]);

  const filterSelectedCount = [
    stateFilter !== "*",
    deviceCategoryFilter !== "*",
    deviceDescriptionLocationFilter !== "*",
  ].filter(Boolean).length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters {filterSelectedCount > 0 && `(${filterSelectedCount})`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-sm">State</p>
          <Select value={stateFilter} onValueChange={setStateFilter as any}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Device State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="*">Any</SelectItem>
              <SelectItem value={DeviceCurrentStateEnum.On}>On</SelectItem>
              <SelectItem value={DeviceCurrentStateEnum.Off}>Off</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-sm">Category</p>
          <Select
            value={deviceCategoryFilter}
            onValueChange={setDeviceCategoryFilter as any}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Device Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="*">Any</SelectItem>
              {Object.values(DeviceDeviceCategoryEnum).map((category) => (
                <SelectItem key={category} value={category}>
                  {DEVICE_CATEGORY_ENUM_TO_LABEL[category]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-sm">Location</p>
          <LocationFilter
            deviceDescriptionLocationFilter={deviceDescriptionLocationFilter}
            setDeviceDescriptionLocationFilter={
              setDeviceDescriptionLocationFilter
            }
          />
        </div>
        <Button
          variant="ghost"
          onClick={() => {
            setFilterDeviceIds(undefined);
            setStateFilter("*");
            setDeviceCategoryFilter("*");
            setDeviceDescriptionLocationFilter("*");
          }}
        >
          Clear filters
        </Button>
      </PopoverContent>
    </Popover>
  );
};
