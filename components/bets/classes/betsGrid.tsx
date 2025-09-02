import { Button } from "@/components/ui/button";
import { getBetsBySubjectID } from "@/hooks/getBets";
import Link from "next/link";

export default async function SubjectBetsGrid({ id }: { id: string }) {
  const data = await getBetsBySubjectID(Number(id));

  return (
    <div>
      {data.length > 0 ? (
        data.map((bet) => (
          <div key={bet.id} className="grid grid-cols-3 auto-rows-fr">
            <div key={bet.id} className="border rounded-lg m-4 p-4">
              <h3 className="font-bold">{bet.question.text}</h3>
              <p>Subject: {bet.question.subject.name}</p>
            </div>
            <Link href={`/app/bets/subject/${id}/new`}>
              <Button className="m-4 h-24 text-4xl font-semibold cross" variant={"outline"} key={data.length + 1}>
                Place a new bet
              </Button>
            </Link>
          </div>
        ))
      ) : (
        <div className="col-span-4 text-center">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight pt-8 first:mt-0">
            Be the first to place a bet!
          </h2>
          <Link href={`/app/bets/subject/${id}/new`}>
            <Button variant={"outline"}>Place Bet</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
