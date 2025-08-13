"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  useState,
  FormEvent,
  Suspense,
} from "react";
import { toast } from "sonner";

export default function SubjectForm({ grade }: { grade: number }) {
  const [subjects, setSubjects] = useState<
    Array<{
      id: Key | null | undefined;
      name:
        | string
        | number
        | bigint
        | boolean
        | ReactElement<unknown, string | JSXElementConstructor<unknown>>
        | Iterable<ReactNode>
        | ReactPortal
        | Promise<
            | string
            | number
            | bigint
            | boolean
            | ReactPortal
            | ReactElement<unknown, string | JSXElementConstructor<unknown>>
            | Iterable<ReactNode>
            | null
            | undefined
          >
        | null
        | undefined;
    }>
  >([]);

  const [sSubjects, setSSubjects] = useState<typeof subjects>([]);

  fetch(`http://localhost:3000/api/general/subjects?grade=${grade}`, {})
    .then((response) => response.json())
    .then((subjects) => {
      setSubjects(subjects);
    });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    toast.info(
      "Subjects selected: " +
        sSubjects.map((subject) => subject.name).join(", ")
    );
  }
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="max-w-md mx-auto mt-8 p-8 rounded"
    >
      <Label htmlFor="subject">Choose the subjects you study:</Label>
      <div className="mt-4 mb-6 flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <Suspense fallback={<div>Loading...</div>}>
            {/* add to setSSubjects on click and remove from setSSubjects if clicked again */}
            {subjects.map((subject) => (
              <Button
                onClick={() => {
                  if (sSubjects.includes(subject)) {
                    setSSubjects(sSubjects.filter((s) => s !== subject));
                  } else {
                    setSSubjects([...sSubjects, subject]);
                  }
                }}
                key={subject.id}
                type="button"
                variant={"outline"}
              >
                {subject.name}
              </Button>
            ))}
          </Suspense>
        </div>

        <Button
          disabled={sSubjects.length === 0}
          type="submit"
          variant={"secondary"}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
