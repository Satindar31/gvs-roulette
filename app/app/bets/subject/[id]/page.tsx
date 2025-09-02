import { Suspense } from "react"
import Loading from "./loading"
import SubjectBetsGrid from "@/components/bets/classes/betsGrid"

export default async function SubjectBets({ params }: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <div className="h-screen">
        <h1 className="scroll-m-20 text-center text-7xl font-extrabold tracking-tight text-balance">Place your bets!</h1>

        <Suspense fallback={<Loading />}>
          <SubjectBetsGrid id={id} />
        </Suspense>
    </div>
  )
}