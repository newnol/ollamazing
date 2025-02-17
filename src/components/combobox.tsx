"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import * as React from "react";

export type ComboBoxItemType = {
  value: string;
  label: string;
};

type ComboboxProps = {
  value?: string;
  onSelect: (value: string | undefined) => void;
  items: ComboBoxItemType[];
  searchPlaceholder?: string;
  noResultsMsg?: string;
  selectItemMsg?: string;
  className?: string;
  unselect?: boolean;
  unselectMsg?: string;
  disabled?: boolean;
};

const popOverStyles = {
  width: "var(--radix-popover-trigger-width)",
};

export function Combobox({
  value,
  onSelect,
  items,
  searchPlaceholder,
  noResultsMsg,
  selectItemMsg,
  className,
  unselect = false,
  unselectMsg,
  disabled = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const [currentSearch, setCurrentSearch] = React.useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) => item.label.toLowerCase().includes(currentSearch.toLowerCase()));
  }, [items, currentSearch]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger disabled={disabled} asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between font-normal", className)}
        >
          {value ? items.find((item) => item.value === value)?.label : selectItemMsg}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={popOverStyles}
        className="popover-content-width-same-as-its-trigger p-0"
      >
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            onValueChange={(e) => setCurrentSearch(e)}
          />
          <ScrollArea className="max-h-[220px] overflow-auto">
            <CommandEmpty>{noResultsMsg}</CommandEmpty>
            <CommandGroup>
              {unselect && (
                <CommandItem
                  key="unselect"
                  value=""
                  onSelect={() => {
                    onSelect(undefined);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn("mr-2 h-4 w-4", value === "" ? "opacity-100" : "opacity-0")}
                  />
                  {unselectMsg}
                </CommandItem>
              )}
              {filteredItems.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.label}
                  onSelect={() => {
                    onSelect(item.value);
                    setOpen(false);
                    setCurrentSearch("");
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
