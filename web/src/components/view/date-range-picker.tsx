"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export function CalendarDateRangePicker({
  className,
  dateRange,
  setDateRange,
}: {
  className?: string;
  dateRange: DateRange | undefined;
  setDateRange: (dateRange: DateRange | undefined) => void;
}) {
  // set default date range to last 7 days
  useEffect(() => {
    if (!dateRange) {
      setDateRange({
        from: addDays(new Date(), -7),
        to: new Date(),
      });
    }
  }, [dateRange, setDateRange]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
