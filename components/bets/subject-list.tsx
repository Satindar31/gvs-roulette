"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Subject = { id: string; name: string }

export default function SubjectList({ subjects, selected }: { subjects: Subject[]; selected: number }) {
  const [expanded, setExpanded] = useState(true)
  return (
    <Card aria-labelledby="subjects-title">
      <CardHeader className="flex items-center justify-between">
        <CardTitle id="subjects-title" className="text-base">
          Subjects available to bet on
        </CardTitle>
        <button
          type="button"
          className="text-sm text-primary"
          onClick={() => setExpanded((s) => !s)}
          aria-expanded={expanded}
        >
          {expanded ? "Hide" : "Show"}
        </button>
      </CardHeader>
      {expanded && (
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {subjects.map((s) => (
              <Badge
              key={s.id}
              variant="secondary"
              aria-label={s.name}
              className={s.id == String(selected) ? "" : "opacity-50 pointer-events-none"}
              >
              {s.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
