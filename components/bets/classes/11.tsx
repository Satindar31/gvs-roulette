"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export default function SubjectForm11({
  subjects,
}: {
  subjects: { name: string; id: number }[];
}) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <form className="max-w-md mx-auto mt-8 p-8 rounded">
      <label
        htmlFor="subject"
        className="block text-xl font-semibold mb-6 text-gray-800"
      >
        Choose a subject:
      </label>
      <div className="flex gap-4">
        {subjects.map((subject) => (
          <Button
            key={subject.id}
            type="button"
            onClick={() => setSelected(subject.name)}
            variant={"outline"}
          >
            {subject.name}
          </Button>
        ))}
      </div>
      {selected && (
        <div className="mt-8 text-blue-600 font-medium text-center text-base">
          You selected: {selected}
        </div>
      )}
    </form>
  );
}
