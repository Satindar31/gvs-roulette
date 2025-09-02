"use client";

import * as React from "react";
import { Check, ChevronDownIcon, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import type { Session } from "next-auth";
import { toast } from "sonner";

const frameworks = [
  {
    value: 12,
    label: 12,
  },
  {
    value: 11,
    label: 11,
  },
  // {
  //   value: 10,
  //   label: 10,
  // },
  // {
  //   value: 9,
  //   label: 9,
  // },
  // {
  //   value: 8,
  //   label: 8,
  // },
];

export function OnboardingForm({ session }: { session: Session }) {
  const [open, setOpen] = React.useState(false);
  const [gradeOpen, setGradeOpen] = React.useState(false);

  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const [name, setName] = React.useState("");

  const [grade, setGrade] = React.useState("");

  const finalYear = new Date().getFullYear() - 15; // Assuming the user is at least 17 years old
  // Get 31 december of finalYear and make it a new variable
  const endMonth = new Date(finalYear, 11, 31);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    toast.loading("Submitting...");
    event.preventDefault();
    // Handle form submission logic here
    fetch("/api/onboarding", {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({
        dob: date,
        name: name,
        grade: grade,
        email: session.user?.email,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Redirect to the next page or show success message
          toast.success("Form submitted successfully!");
          window.location.href = "/app/home"; // Redirect to home after successful submission
        } else {
          // Handle error response
          console.error("Error submitting form:", response.status);
          toast.error("Failed to submit form, please try again.");
          if (response.status === 409) {
            console.error("User already exists");
            toast.error("User already exists");
            window.location.href = "/app/home"; // Redirect to home if user already exists
          } else {
            toast.error("Failed to submit form, please try again.");
            console.error("Error submitting form:", response.statusText);
          }
        }
      })
      .catch((error) => {
        // Handle network or other errors
        console.error("Network error:", error);
      });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-row items-center gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date" className="px-1">
          Date of birth
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-48 justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              endMonth={endMonth}
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="name" className="px-1">
          Name
        </Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          required
          className="min-w-md"
        />
      </div>

      <div>
        <Label htmlFor="class" className="px-1 pb-3">
          Class
        </Label>
        <Popover open={gradeOpen} onOpenChange={setGradeOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {grade
                ? frameworks.find((framework) => framework.value === Number(grade))
                    ?.label
                : "Select framework..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search framework..." className="h-9" />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value.toString()}
                      onSelect={(currentValue) => {
                        setGrade(currentValue === grade ? "" : currentValue);
                        setGradeOpen(false);
                      }}
                    >
                      {framework.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          Number(grade) === framework.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <Button
        data-umami-event="Onboarding submit button"
        variant="outline"
        type="submit"
        className="px-1 mt-6 w-1/4"
      >
        Submit
      </Button>
    </form>
  );
}
