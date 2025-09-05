"use client";

import type React from "react";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type Subject = { id: string; name: string };
type QuestionMap = Record<string, { id: string; label: string }[]>;

const SET_OPTIONS = [
  { id: "1", label: "Set 1" },
  { id: "2", label: "Set 2" },
  //   { id: "C", label: "Set C" },
  //   { id: "D", label: "Set D" },
];

export default function BetForm({
  subjects,
  questionsBySubject,
}: {
  subjects: Subject[];
  questionsBySubject: QuestionMap;
}) {
  const [subjectId, setSubjectId] = useState<string>(subjects[0]?.id ?? "");
  const [questionId, setQuestionId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [specifySet, setSpecifySet] = useState<boolean>(false);
  const [setId, setSetId] = useState<string>("");
  const [submittedMsg, setSubmittedMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Base payout multiplier is 2x; specifying the set doubles it to 4x
  const payoutMultiplier = specifySet ? 4 : 2;
  const numericAmount = Number.parseFloat(amount || "0");
  const potentialReturn = Number.isFinite(numericAmount)
    ? numericAmount * payoutMultiplier
    : 0;

  // Get questions for the selected subject
  const questions = useMemo(
    () => questionsBySubject[subjects[0].name] ?? [],
    [questionsBySubject, subjects]
  );

  function resetMessages() {
    setSubmittedMsg("");
    setErrorMsg("");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    resetMessages();

    if (!subjectId) {
      setErrorMsg("Please select a subject.");
      return;
    }
    if (!questionId) {
      setErrorMsg("Please select a question to bet on.");
      return;
    }
    if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      setErrorMsg("Please enter a valid amount greater than 0.");
      return;
    }
    if (specifySet && !setId) {
      setErrorMsg("Please choose a set or uncheck 'Specify set' to continue.");
      return;
    }

    // Simulate submission (replace with server action or API call)
    const subjectName =
      subjects.find((s) => s.id === subjectId)?.name ?? subjectId;
    const questionLabel =
      questions.find((q) => q.id === questionId)?.label ?? questionId;
    const setLabel = specifySet
      ? SET_OPTIONS.find((s) => s.id === setId)?.label
      : undefined;
console.log(questionId)
    fetch("/api/general/bets", {
      method: "POST",
      body: JSON.stringify({
        subjectId,
        questionId,
        amount: numericAmount,
        specifySet,
        set: setId,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setSubmittedMsg(
            `Bet placed: ${subjectName} • ${questionLabel} • Amount ${numericAmount.toFixed(
              2
            )} • Multiplier ${payoutMultiplier}x${
              setLabel ? " • " + setLabel : ""
            }`
          );
          return res.json();
        } else {
          throw new Error("Failed to place bet. Please try again.");
        }
      })
      .then((data) => {
        console.log("Bet placed successfully:", data);
      })
      .catch((error) => {
        console.error("Error placing bet:", error);
      });

    // Optionally clear form
    // setAmount("")
    // setQuestionId("")
    // setSpecifySet(false)
    // setSetId("")
  }

  return (
    <Card aria-labelledby="bet-form-title">
      <CardHeader>
        <CardTitle id="bet-form-title" className="text-base">
          Betting Details
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit} noValidate>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Select
                value={subjectId}
                onValueChange={(v) => {
                  setSubjectId(v);
                  setQuestionId("");
                }}
              >
                <SelectTrigger id="subject" aria-label="Subject">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="question">Question</Label>
              <Select
                value={questionId}
                onValueChange={(v) => setQuestionId(v)}
                disabled={!subjectId || questions.length === 0}
              >
                <SelectTrigger id="question" aria-label="Question">
                  <SelectValue
                    placeholder={
                      subjectId ? "Select question" : "Select subject first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {questions.map((q) => (
                    <SelectItem key={q.id} value={q.id}>
                      {q.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2 max-w-sm">
            <Label htmlFor="amount">Amount to Bet</Label>
            <Input
              id="amount"
              inputMode="decimal"
              type="number"
              min={0}
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              aria-describedby="amount-help"
            />
            <p id="amount-help" className="text-xs text-muted-foreground">
              Enter your stake. Payout doubles if you specify a set.
            </p>
          </div>

          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="specify-set"
                checked={specifySet}
                onCheckedChange={(v) => {
                  const checked = Boolean(v);
                  setSpecifySet(checked);
                  if (!checked) setSetId("");
                }}
                aria-describedby="set-help"
              />
              <Label htmlFor="specify-set" className="cursor-pointer">
                Specify question paper set for double payout
              </Label>
            </div>

            <div
              className={cn(
                "grid gap-2 max-w-sm transition-opacity",
                specifySet ? "opacity-100" : "opacity-50"
              )}
            >
              <Label htmlFor="set">Question Paper Set</Label>
              <Select
                value={setId}
                onValueChange={setSetId}
                disabled={!specifySet}
              >
                <SelectTrigger id="set" aria-label="Question paper set">
                  <SelectValue placeholder="Choose a set (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {SET_OPTIONS.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p id="set-help" className="text-xs text-muted-foreground">
                Leave unchecked if you don’t want to bet on a specific set.
              </p>
            </div>
          </div>

          <div className="grid gap-1">
            <p className="text-sm">
              Payout multiplier:{" "}
              <span className="font-medium">{payoutMultiplier}x</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Potential return:{" "}
              <span className="font-medium text-foreground">
                {Math.floor(
                  isFinite(numericAmount)
                    ? numericAmount * (specifySet ? 4 : 2)
                    : 0
                )}
              </span>
            </p>
          </div>

          {errorMsg ? (
            <div role="alert" className="text-sm text-destructive">
              {errorMsg}
            </div>
          ) : null}
          {submittedMsg ? (
            <div role="status" className="text-sm text-emerald-600">
              {submittedMsg}
            </div>
          ) : null}
        </CardContent>

        <CardFooter className="justify-end">
          <Button type="submit">Place Bet</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
