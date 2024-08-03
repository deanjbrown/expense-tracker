import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/**
 * 
 * TODO => We should proably move the button and everything to Expenses also. . . .
 * 
 */
interface DatePickerWithRangeProps {
  className?: string;
  dateRange: DateRange | undefined;
  setDateRange: (date: DateRange | undefined) => void;
  onFilterExpensesClicked: () => void;
}

function DatePickerWithRange(props: DatePickerWithRangeProps) {
  return (
    <>
      <div className="flex m-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="dateRangePicker"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal bg-gray-300 hover:bg-gray-300",
                !props.dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {props.dateRange?.from ? (
                props.dateRange.to ? (
                  <>
                    {format(props.dateRange.from, "LLL dd, y")} -{" "}
                    {format(props.dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(props.dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={addDays(new Date(), -30)}
              selected={props.dateRange}
              onSelect={props.setDateRange}
              min={2}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <Button
          className="ml-2"
          onClick={() => {
            props.onFilterExpensesClicked();
          }}
        >
          Filter Expenses
        </Button>
      </div>
    </>
  );
}

export default DatePickerWithRange;
