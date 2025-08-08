"use client"

import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  CardSim,
  DollarSign,
  Cross,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export function HomeCommandBox() {
  return (
    // <CommandDialog open={true} onOpenChange={() => {}}>
    //   <DialogTitle>Command Palette</DialogTitle>
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar />
              <span>Date Sheet</span>
            </CommandItem>
            <CommandItem>
              <Smile />
              <span>Roulette</span>
            </CommandItem>
            <CommandItem disabled>
              <Calculator />
              <span>Balance</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Games">
            <CommandItem>
              <CardSim />
              <span>Roulette</span>
            </CommandItem>
            <CommandItem>
              <CardSim />
              <span>Stuff</span>
            </CommandItem>
            <CommandItem>
              <CardSim />
              <span>Stuff</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <CardSim />
              <span>Profile</span>
            </CommandItem>
            <CommandItem>
              <CardSim />
              <span>Settings</span>
            </CommandItem>
            <CommandItem>
              <DollarSign />
              <span>Balance</span>
            </CommandItem>
            <CommandItem>
              <Cross />
              <span>Exit</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    // </CommandDialog>
  );
}
