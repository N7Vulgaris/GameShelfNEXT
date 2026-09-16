"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "./button";
import { Label } from "./label";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";

interface MultiSelectProps {
  id: string;
  label: string;
  options: readonly string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  required?: boolean;
}

export function MultiSelect({
  id,
  label,
  options,
  selected,
  onChange,
  required = false,
}: MultiSelectProps) {
  const availableOptions = [
    ...options,
    ...selected.filter((value) => !options.includes(value)),
  ];

  function toggleOption(option: string, checked: boolean) {
    onChange(
      checked
        ? [...selected, option]
        : selected.filter((value) => value !== option),
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-y-2">
      <Label htmlFor={id}>{label}</Label>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={(props) => (
            <Button
              {...props}
              id={id}
              type="button"
              variant="outline"
              className="w-full max-w-full min-w-0 justify-between gap-2 overflow-hidden font-normal"
              aria-required={required}
            >
              <span className="min-w-0 flex-1 truncate text-left">
                {selected.length
                  ? selected.join(", ")
                  : `Select ${label.toLowerCase()}`}
              </span>
              <ChevronDown className="shrink-0" />
            </Button>
          )}
        />
        <DropdownMenuContent className="max-h-64 w-(--anchor-width) max-w-[min(24rem,calc(100vw-2rem))]">
          {availableOptions.map((option) => (
            <DropdownMenuCheckboxItem
              key={option}
              checked={selected.includes(option)}
              onCheckedChange={(checked) => toggleOption(option, checked)}
            >
              {option}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
