import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";

interface NewExpenseProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newExpense: Expense) => void;
}

function NewExpense(props: NewExpenseProps) {
  const [expenseName, setExpenseName] = useState<string>("");
  const [expenseAmount, setExpenseAmount] = useState<number>(0);
  const [expenseFrequency, setExpenseFrequency] = useState<string>("");
  const [expenseStartDate, setExpenseStartDate] = useState<Date>();

  // Called when the dialog is closed
  const handleClose = () => {
    setExpenseName("");
    setExpenseAmount(0.0);
    props.onClose();
  };

  // Called when the dialog is submitted
  const onDialogSubmit = () => {
    // If there is no date set, set today's date
    const expenseDate: Date = expenseStartDate ?? new Date();

    const newExpense: Expense = {
      id: Math.random(),
      expenseName: expenseName,
      expenseAmount: expenseAmount,
      expenseFrequency: expenseFrequency,
      expenseDate: expenseDate,
    };
    handleClose();
    props.onSave(newExpense);
  };


  // TODO => We need to make all of the inputs required. The required keyword does not seem to work by itself
  return (
    <>
      <Dialog open={props.isOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle>Add New Expense</DialogTitle>
            <DialogDescription>
              Enter the expenses details and then click save.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expense-name" className="text-right">
                Expense Name
              </Label>
              <Input
                type="text"
                id="expense-name"
                name="expense-name"
                value={expenseName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setExpenseName(e.target.value)
                }
                className="col-span-3 bg-gray-300"
                placeholder="Give your expense a name"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expense-amount" className="text-right">
                Expense Amount
              </Label>
              <Input
                type="number"
                id="expense-amount"
                name="expense-amount"
                value={expenseAmount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setExpenseAmount(Number(e.target.value))
                }
                className="col-span-3 bg-gray-300"
                placeholder="How much did this cost you?"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="frequency" className="text-right">
                Frequency
              </Label>
              <Select
                value={expenseFrequency}
                onValueChange={(value: string) => setExpenseFrequency(value)}
              >
                <SelectTrigger className="col-span-3 bg-gray-300">
                  <SelectValue placeholder="Frequency" />
                </SelectTrigger>
                <SelectContent id="frequency">
                  <SelectItem value="single">Once Off</SelectItem>
                  <SelectItem value="everyxdays">Every X Days</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly </SelectItem>
                  <SelectItem value="foretnightly">Fortnightly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="freqSingleDate" className="text-right">
                {expenseFrequency === "single" && "Expense Date"}
                {expenseFrequency !== "single" && "Start Date"}
              </Label>
              <Popover>
                <PopoverTrigger
                  asChild
                  className="bg-gray-300 hover:bg-gray-300"
                >
                  <Button
                    variant={"outline"}
                    className={cn(
                      "col-span-3 justify-start text-left font-normal",
                      !expenseStartDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {expenseStartDate ? (
                      format(expenseStartDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={expenseStartDate}
                    onSelect={setExpenseStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={onDialogSubmit}>
              Save Expense
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NewExpense;
