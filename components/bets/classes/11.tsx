"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SubjectForm11({
  subjects,
}: {
  subjects: { name: string; id: number }[];
}) {


  return (
    <form className="max-w-md mx-auto mt-8 p-8 rounded flex flex-col gap-6 justify-center items-center">
      <h3
        className="scroll-m-20 text-2xl font-semibold tracking-tight"
      >
        Choose a subject to gamble on:
      </h3>
      <div className="flex gap-4">
        {subjects.map((subject) => (
          <Button
            key={subject.id}
            type="button"
            onClick={() => (location.href = `/app/bets/subject/${subject.id}`)}
            variant={"link"}
          >
            {subject.name}
          </Button>
        ))}
      </div>
    </form>
  );
}
